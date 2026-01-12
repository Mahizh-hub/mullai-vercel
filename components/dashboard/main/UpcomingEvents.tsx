"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Clock, MapPin } from "lucide-react";

// Swiper styles (make sure these are imported globally once)
// import "swiper/css";
// import "swiper/css/pagination";

type Event = {
  title: string;
  date: string;
  time: string;
  location: string;
};

const events: Event[] = [
  {
    title: "Science Fair",
    date: "October 25, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Auditorium",
  },
  {
    title: "Science Fair",
    date: "October 25, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Auditorium",
  },
  {
    title: "Science Fair",
    date: "October 25, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Auditorium",
  },
  {
    title: "Science Fair",
    date: "October 25, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Auditorium",
  },
];

export default function UpcomingEvents() {
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
        {events.map((event, index) => (
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
        ))}
      </Swiper>
    </div>
  );
}
