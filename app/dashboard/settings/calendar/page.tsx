"use client";

import { useState } from "react";
import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb";
import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar";
import PageHeader from "@/components/dashboard/PageHeader";
import { settingsMenuItems } from "@/components/dashboard/settings/data";
import CalendarView from "@/components/dashboard/settings/calendar/CalendarView";
import UpcomingEvents from "@/components/dashboard/main/UpcomingEvents";
import EventModal from "@/components/dashboard/settings/calendar/EventModal";
import { CalendarEvent } from "@/components/dashboard/settings/calendar/types";
import { useCalendar } from "@/components/dashboard/settings/calendar/CalendarContext";

export default function CalendarSettings() {
  const { events, addEvent, updateEvent, deleteEvent } = useCalendar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDateContext, setSelectedDateContext] = useState<Date | null>(null);

  // Handlers
  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setSelectedDateContext(new Date());
    setIsModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedEvent(null);
    setSelectedDateContext(date);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDateContext(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: any) => {
    if (eventData.id) {
      // Update
      updateEvent({ ...eventData });
    } else {
      // Create
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9), // Simple ID gen
      };
      addEvent(newEvent);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xl font-bold">Settings</div>
        <DynamicBreadcrumb />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <SettingsSidebar menuItems={settingsMenuItems} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <div className="card-base p-6">
            <PageHeader
              title="Calendar"
              subtitle="Manage academic calendar and important dates"
              actionLabel="Add Event"
              onActionClick={handleAddEventClick}
            />

            <CalendarView 
                events={events}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
            />

            <UpcomingEvents 
                events={events}
            />
          </div>
        </div>
      </div>

      <EventModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         onSave={handleSaveEvent}
         onDelete={handleDeleteEvent}
         initialData={selectedEvent}
         selectedDate={selectedDateContext}
      />
    </div>
  );
}
