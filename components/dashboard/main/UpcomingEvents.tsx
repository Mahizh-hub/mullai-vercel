"use client";

import { useCalendar } from "@/components/dashboard/settings/calendar/CalendarContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Clock, MapPin } from "lucide-react";

// Swiper styles (make sure these are imported globally once)
// import "swiper/css";
// import "swiper/css/pagination";

import { CalendarEvent } from "@/components/dashboard/settings/calendar/types";

type Event = {
  title: string;
  date: string;
  time: string;
  location: string;
};



type Props = {
  events?: CalendarEvent[];
};

export default function UpcomingEvents({ events: propEvents }: Props) {
  const { events: contextEvents } = useCalendar();
  const calendarEvents = propEvents || contextEvents;
  // Transform calendar events to display format if provided, otherwise use default
  const displayEvents: Event[] = calendarEvents
    ? calendarEvents
        .filter((e) => e.startDate >= new Date(new Date().setHours(0, 0, 0, 0))) // Filter for future events including today
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .map((e) => ({
          title: e.title,
          date: e.startDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          time: `${e.startDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })} - ${e.endDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}`,
          location: e.location || "No location",
        }))
    : [];

  return (
    <div className="card-widget">
      {/* Header */}
      <div className="mb-4 flex-center-between">
        <h5 className="font-semibold text-lg">Upcoming Events</h5>
        <div>
          <div className="swiper-pagination-upcoming-events swiper-pagination-clickable" />
        </div>
      </div>

      {/* Slider */}
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        pagination={{
          el: ".swiper-pagination-upcoming-events",
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {displayEvents.length === 0 ? (
           <SwiperSlide>
             <div className="rounded-md bg-gray-50 p-3 text-center text-gray-500">
               No upcoming events
             </div>
           </SwiperSlide>
        ) : (
          displayEvents.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-md bg-gray-50 p-3">
                <div className="flex-center-between">
                  <span className="font-medium">{event.title}</span>
                  <span className="text-sm text-gray-500">{event.date}</span>
                </div>

                <div className="mt-2 flex gap-5 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
