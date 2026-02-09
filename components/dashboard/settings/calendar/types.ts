export type EventType = 'meeting' | 'holiday' | 'function';

export type CalendarEvent = {
  id: string;
  title: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location?: string; // Optional, required for 'meeting' and 'function'
  description?: string;
};

export type ViewType = 'day' | 'week' | 'month' | 'year';

export interface CalendarState {
  currentDate: Date;
  view: ViewType;
  events: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  isModalOpen: boolean;
  selectedDateContext: Date | null; // For when clicking empty slot
}
