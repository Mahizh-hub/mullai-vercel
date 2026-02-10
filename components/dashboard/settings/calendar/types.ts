export type EventType = 'meeting' | 'holiday' | 'function';

export type CalendarEvent = {
  id: string;
  title: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  description?: string; // Optional, available for all event types
};

export type ViewType = 'month' | 'year';

export interface CalendarState {
  currentDate: Date;
  view: ViewType;
  events: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  isModalOpen: boolean;
  selectedDateContext: Date | null; // For when clicking empty slot
}
