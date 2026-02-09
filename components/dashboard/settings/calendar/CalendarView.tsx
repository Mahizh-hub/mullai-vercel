"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (view === "week") newDate.setDate(newDate.getDate() - 7);
    else if (view === "day") newDate.setDate(newDate.getDate() - 1);
    else if (view === "year") newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (view === "week") newDate.setDate(newDate.getDate() + 7);
    else if (view === "day") newDate.setDate(newDate.getDate() + 1);
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
    } else if (view === "week") {
      const start = getStartOfWeek(currentDate);
      const end = addDaysHelper(start, 6);
      title = `${start.getDate()} ${MONTH_NAMES[start.getMonth()]} - ${end.getDate()} ${MONTH_NAMES[end.getMonth()]} ${end.getFullYear()}`;
       if(start.getFullYear() !== end.getFullYear()) {
             title = `${start.getDate()} ${MONTH_NAMES[start.getMonth()]} ${start.getFullYear()} - ${end.getDate()} ${MONTH_NAMES[end.getMonth()]} ${end.getFullYear()}`;
        }
    } else if (view === "day") {
      title = `${currentDate.getDate()} ${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (view === "year") {
      title = `${currentDate.getFullYear()}`;
    }

    return (
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
           <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
           <div className="flex items-center rounded-md border border-gray-200 bg-white ml-4">
              <Button variant="ghost" size="icon" onClick={handlePrev} className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleToday} className="h-8 px-2 font-medium">
                Today
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <Select value={view} onValueChange={(v) => setView(v as ViewType)}>
            <SelectTrigger size="sm" className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
            <div key={day} className="py-2 text-center text-sm font-semibold text-gray-500">
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
                    "min-h-[100px] border-b border-r border-gray-100 p-2 cursor-pointer transition-colors hover:bg-gray-50",
                    !isCurrentMonth && "bg-gray-50/50 text-gray-400",
                    isTodayDate && "bg-pink-50/30"
                  )}
                  onClick={() => onDateClick(day)}
               >
                 <div className="flex justify-between items-start mb-1">
                    <span className={cn(
                        "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                        isTodayDate ? "bg-pink-500 text-white" : "text-gray-700"
                    )}>
                        {day.getDate()}
                    </span>
                 </div>
                 <div className="space-y-1">
                    {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(event);
                          }}
                          className={cn(
                              "text-xs px-1.5 py-0.5 rounded border truncate font-medium",
                              getEventStyle(event.type)
                          )}
                        >
                           {event.title}
                        </div>
                    ))}
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    )
  };

  // 2. Week View
  const renderWeekView = () => {
    const start = getStartOfWeek(currentDate);
    const days = Array.from({ length: 7 }).map((_, i) => addDaysHelper(start, i));
    
    return (
       <div className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-[600px]">
          {/* Header */}
          <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
             {days.map((day, i) => {
                 const isTodayDate = isSameDayHelper(day, new Date());
                 return (
                    <div key={i} className="py-2 text-center border-r border-gray-100 last:border-r-0">
                       <div className="text-xs text-gray-500 uppercase font-semibold">{DAY_NAMES[day.getDay()]}</div>
                       <div className={cn(
                           "text-lg font-bold mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full",
                           isTodayDate ? "bg-pink-500 text-white" : "text-gray-900"
                       )}>
                           {day.getDate()}
                       </div>
                    </div>
                 )
             })}
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-7 flex-1 overflow-y-auto">
              {days.map((day, i) => {
                   const dayEvents = events.filter(e => isSameDayHelper(e.startDate, day));
                   return (
                       <div 
                         key={i} 
                         className="border-r border-gray-100 last:border-r-0 p-2 min-h-full hover:bg-gray-50 cursor-pointer"
                         onClick={() => onDateClick(day)}
                       >
                           <div className="space-y-2 mt-2">
                               {dayEvents.map(event => (
                                   <div 
                                      key={event.id}
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          onEventClick(event);
                                      }}
                                      className={cn(
                                          "text-xs p-2 rounded border font-medium shadow-sm transition-transform hover:scale-[1.02]",
                                          getEventStyle(event.type)
                                      )}
                                   >
                                      <div className="flex items-center gap-1 mb-1 opacity-75">
                                          <Clock className="w-3 h-3"/>
                                          {event.startDate.getHours()}:{String(event.startDate.getMinutes()).padStart(2, '0')}
                                      </div>
                                      <div className="truncate font-bold">{event.title}</div>
                                      {event.location && <div className="truncate opacity-75 mt-1">{event.location}</div>}
                                   </div>
                               ))}
                           </div>
                       </div>
                   )
              })}
          </div>
       </div>
    )
  };

  // 3. Day View
  const renderDayView = () => {
      const dayEvents = events.filter(e => isSameDayHelper(e.startDate, currentDate));
      const hours = Array.from({ length: 24 }).map((_, i) => i);
      
      return (
          <div className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-[600px]">
             <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-center">
                 <div className="text-center">
                     <h3 className="text-lg font-semibold text-gray-900">{DAY_NAMES[currentDate.getDay()]}</h3>
                     <div className={cn(
                            "text-3xl font-bold mt-1 inline-flex h-12 w-12 items-center justify-center rounded-full",
                            isSameDayHelper(currentDate, new Date()) ? "bg-pink-500 text-white" : "text-gray-900"
                       )}>
                           {currentDate.getDate()}
                     </div>
                 </div>
             </div>
             
             <div className="flex-1 overflow-y-auto relative bg-white">
                {hours.map(hour => (
                   <div key={hour} className="grid grid-cols-12 h-20 border-b border-gray-100">
                      <div className="col-span-1 text-xs text-gray-400 text-right pr-2 pt-2 border-r border-gray-100 bg-gray-50/30">
                          {hour === 0 ? '12 AM' : hour > 12 ? `${hour-12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                      </div>
                      <div className="col-span-11 relative group" onClick={() => {
                          const dateWithTime = new Date(currentDate);
                          dateWithTime.setHours(hour);
                          onDateClick(dateWithTime);
                      }}>
                           {/* Render events that start in this hour */}
                           {dayEvents.filter(e => e.startDate.getHours() === hour).map(event => (
                               <div 
                                  key={event.id}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      onEventClick(event);
                                  }}
                                  className={cn(
                                      "absolute left-2 right-2 top-2 bottom-2 rounded border px-3 py-2 z-10 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all",
                                      getEventStyle(event.type)
                                  )}
                               >
                                   <div className="font-bold flex justify-between">
                                       <span>{event.title}</span>
                                       <span className="opacity-75 font-normal text-xs flex items-center gap-1">
                                           <Clock className="w-3 h-3"/>
                                           {event.startDate.getHours()}:{String(event.startDate.getMinutes()).padStart(2, '0')} - 
                                           {event.endDate.getHours()}:{String(event.endDate.getMinutes()).padStart(2, '0')}
                                       </span>
                                   </div>
                                    {event.location && <div className="text-xs mt-1 opacity-90">{event.location}</div>}
                               </div>
                           ))}
                           <div className="hidden group-hover:flex items-center justify-center h-full w-full bg-gray-50/50 text-xs text-gray-400 font-medium pointer-events-none">
                               Click to add event
                           </div>
                      </div>
                   </div>
                ))}
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
           {view === 'week' && renderWeekView()}
           {view === 'day' && renderDayView()}
           {view === 'year' && renderYearView()}
       </div>
    </div>
  );
}
