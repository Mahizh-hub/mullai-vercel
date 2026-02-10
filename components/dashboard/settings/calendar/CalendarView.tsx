"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { CalendarEvent, ViewType, EventType } from "./types";
import { getDaysInMonth, isSameDay } from "./data";

// Helper functions (same as before or imported)
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const addDaysHelper = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const isSameDayHelper = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

type Props = {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
};

export default function CalendarView({ events, onDateClick, onEventClick }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>("month");
  
  // --- Navigation Handlers ---
  // --- Navigation Handlers ---
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // --- Render Helpers ---

  const renderHeader = () => {
    let title = "";
    if (view === "month") {
      title = `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (view === "year") {
      title = `${currentDate.getFullYear()}`;
    }

    return (
      <div className="flex items-center justify-between mb-4 bg-pink-100 rounded-xl p-2 w-full">
         <Button 
           variant="ghost" 
           size="icon" 
           onClick={handlePrev} 
           className="h-9 w-9 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-sm"
         >
           <ChevronLeft className="h-5 w-5" />
         </Button>
         
         <h2 
           className={cn(
             "text-xl font-bold text-gray-900 transition-colors flex-1 text-center select-none",
             view === 'month' ? "cursor-pointer hover:opacity-70" : "cursor-default"
           )}
           onClick={() => view === 'month' && setView('year')}
         >
           {title}
         </h2>
         
         <Button 
           variant="ghost" 
           size="icon" 
           onClick={handleNext} 
           className="h-9 w-9 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-sm"
         >
           <ChevronRight className="h-5 w-5" />
         </Button>
      </div>
    );
  };

  const getEventStyle = (type: EventType) => {
      switch(type) {
          case 'holiday': return 'bg-pink-100 text-pink-700 border-pink-200';
          case 'meeting': return 'bg-blue-100 text-blue-700 border-blue-200';
          case 'function': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
          default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
  }

  // --- Views ---

  // 1. Month View
  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <div className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
          {DAY_NAMES.map((day) => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 bg-white">
           {days.map((day, idx) => {
             const dayEvents = events.filter(e => isSameDayHelper(e.startDate, day));
             const isCurrentMonth = day.getMonth() === currentDate.getMonth();
             const isTodayDate = isSameDayHelper(day, new Date());
             
             return (
               <div 
                  key={idx} 
                  className={cn(
                    "min-h-[80px] border-b border-r border-gray-100 p-1 cursor-pointer transition-colors hover:bg-gray-50",
                    !isCurrentMonth && "bg-gray-50/50 text-gray-400",
                    isTodayDate && "bg-pink-50/30"
                  )}
                  onClick={() => onDateClick(day)}
               >
                 <div className="flex justify-between items-start mb-0.5">
                    <span className={cn(
                        "text-xs font-medium h-6 w-6 flex items-center justify-center rounded-full",
                        isTodayDate ? "bg-pink-500 text-white" : "text-gray-700"
                    )}>
                        {day.getDate()}
                    </span>
                 </div>
                 <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map(event => (
                        <div 
                          key={event.id}
                          onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(event);
                          }}
                          className={cn(
                              "text-[10px] px-1 py-0.5 rounded border truncate font-medium",
                              getEventStyle(event.type)
                          )}
                        >
                           {event.title}
                        </div>
                    ))}
                    {dayEvents.length > 3 && (
                        <div className="text-[10px] text-gray-400 pl-1">
                            +{dayEvents.length - 3} more
                        </div>
                    )}
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    )
  };



  // 4. Year View
  const renderYearView = () => {
    const months = Array.from({length: 12}).map((_, i) => i);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {months.map(monthIdx => {
             const monthDate = new Date(currentDate.getFullYear(), monthIdx, 1);
             const days = getDaysInMonth(monthDate);
             
             return (
                 <div key={monthIdx} className="border border-gray-100 rounded-lg bg-white p-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                     setCurrentDate(monthDate);
                     setView('month');
                 }}>
                     <h3 className="text-center font-bold text-gray-800 mb-2">{MONTH_NAMES[monthIdx]}</h3>
                     <div className="grid grid-cols-7 text-xs gap-y-1">
                         {DAY_NAMES.map(d => <div key={d} className="text-center text-gray-400 font-medium pb-1">{d[0]}</div>)}
                         {days.map((day, dIdx) => {
                             const isCurrentMonth = day.getMonth() === monthIdx;
                             if (!isCurrentMonth) return <div key={dIdx} />;
                             
                             const hasEvents = events.some(e => isSameDayHelper(e.startDate, day));
                             const isTodayDate = isSameDayHelper(day, new Date());
                             
                             return (
                                 <div key={dIdx} className="flex justify-center">
                                     <div className={cn(
                                         "h-6 w-6 flex items-center justify-center rounded-full text-[10px]",
                                         isTodayDate ? "bg-pink-500 text-white font-bold" : "text-gray-600",
                                         hasEvents && !isTodayDate && "bg-blue-100 text-blue-600 font-bold",
                                     )}>
                                         {day.getDate()}
                                     </div>
                                 </div>
                             )
                         })}
                     </div>
                 </div>
             )
         })}
      </div>
    )
  };

  return (
    <div className="space-y-4">
       {renderHeader()}
       
       <div className="animate-in fade-in zoom-in-95 duration-200">
           {view === 'month' && renderMonthView()}
           {view === 'year' && renderYearView()}
       </div>
    </div>
  );
}
