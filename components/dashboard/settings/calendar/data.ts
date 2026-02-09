import { CalendarEvent, EventType } from "./types";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Sync",
    type: "meeting",
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
    location: "Conference Room A",
  },
  {
    id: "2",
    title: "Diwali Holiday",
    type: "holiday",
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 0, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 23, 59),
  },
  {
    id: "3",
    title: "Annual Day Function",
    type: "function",
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 18, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 21, 0),
    location: "Main Auditorium",
  },
  {
      id: "4",
      title: "Project Review",
      type: "meeting",
      startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 14, 0),
      endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 15, 0),
      location: "Zoom",
  }
];

export const eventColors: Record<EventType, string> = {
  holiday: "bg-pink-500 border-pink-600 text-white",
  meeting: "bg-blue-500 border-blue-600 text-white",
  function: "bg-yellow-500 border-yellow-600 text-white",
};

export const eventTextColors: Record<EventType, string> = {
    holiday: "text-pink-500",
    meeting: "text-blue-500",
    function: "text-yellow-500",
};


// Helper functions for date manipulation
export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days: Date[] = [];
  
  // Add previous month's days to fill the grid start
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }
  
  // Add current month's days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  // Add next month's days to fill the grid end (up to 42 cells total for 6 rows)
  const remainingSlots = 42 - days.length;
  for (let i = 1; i <= remainingSlots; i++) {
    days.push(new Date(year, month + 1, i));
  }
  
  return days;
};

export const getWeekDays = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day; // Adjust when day is Sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0,0,0,0);

    const days = [];
    for(let i=0; i<7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        days.push(d);
    }
    return days;
}

export const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
