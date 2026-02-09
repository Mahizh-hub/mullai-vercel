"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarEvent, EventType } from "./types";
import { Trash2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id"> & { id?: string }) => void;
  onDelete: (id: string) => void;
  initialData?: CalendarEvent | null;
  selectedDate?: Date | null;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  selectedDate,
}: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<EventType>("meeting");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setError("");
      if (initialData) {
        setTitle(initialData.title);
        setType(initialData.type);
        setLocation(initialData.location || "");
        setStartDate(formatDate(initialData.startDate));
        setStartTime(formatTime(initialData.startDate));
        setEndDate(formatDate(initialData.endDate));
        setEndTime(formatTime(initialData.endDate));
      } else if (selectedDate) {
        setTitle("");
        setType("meeting");
        setLocation("");
        const dateStr = formatDate(selectedDate);
        setStartDate(dateStr);
        
        const timeStr = formatTime(selectedDate);
        setStartTime(timeStr);
        
        const endDateObj = new Date(selectedDate);
        endDateObj.setHours(endDateObj.getHours() + 1);
        setEndDate(formatDate(endDateObj));
        setEndTime(formatTime(endDateObj));
      } else {
        // Default empty state
        setTitle("");
        setType("meeting");
        setLocation("");
        const today = new Date();
        const dateStr = formatDate(today);
        setStartDate(dateStr);
        setStartTime("09:00");
        setEndDate(dateStr);
        setEndTime("10:00");
      }
    }
  }, [isOpen, initialData, selectedDate]);

  const handleSave = () => {
    if (!title || !startDate || !startTime || !endDate || !endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    if ((type === "meeting" || type === "function") && !location) {
      setError("Location is required for meetings and functions.");
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (endDateTime <= startDateTime) {
      setError("End time must be after start time.");
      return;
    }

    onSave({
      id: initialData?.id,
      title,
      type,
      location: type === "holiday" ? undefined : location,
      startDate: startDateTime,
      endDate: endDateTime,
    });
    onClose();
  };

  const handleDelete = () => {
    if (initialData?.id) {
      onDelete(initialData.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Edit the details of your event below." : "Enter the details for the new event."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={type} onValueChange={(val) => setType(val as EventType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="function">Function</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(type === "meeting" || type === "function") && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <Label htmlFor="location">Event Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="space-y-4">
               <h4 className="font-medium text-sm text-gray-700">From</h4>
               <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="font-medium text-sm text-gray-700">To</h4>
               <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          {initialData && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="mr-auto bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
          <div className="flex gap-2">
             <Button variant="outline" onClick={onClose}>
               Cancel
             </Button>
             <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600 text-white">
               Save changes
             </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
