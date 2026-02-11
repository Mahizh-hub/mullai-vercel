"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { mockClasses, mockTeachers } from "@/components/dashboard/settings/data";

export default function TeacherMappingForm() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  
  // Derived state to show/hide the mapping section
  const showMapping = selectedClass && selectedSection;

  // Mock subjects for the form demo (in a real app, this would come from the selected class's subject setup)
  const subjects = [
    { id: "s1", name: "English" },
    { id: "s2", name: "Maths" },
    { id: "s3", name: "Science · Physics · Theory" },
    { id: "s4", name: "Science · Physics · Practical" },
    { id: "s5", name: "Social Science" },
    { id: "s6", name: "Yoga" },
    { id: "s7", name: "GK" },
    { id: "s8", name: "P E T" },
    { id: "s9", name: "Language" },
    { id: "s10", name: "Computer Science" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="classSelect">Class <span className="text-destructive">*</span></Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger id="classSelect" className="w-full">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {mockClasses.map((cls) => (
                <SelectItem key={cls.id} value={cls.name}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sectionSelect">Section <span className="text-destructive">*</span></Label>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger id="sectionSelect" className="w-full">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              {/* Show sections based on selected class, or generic list if none selected (simplified for demo) */}
              {["Section A", "Section B", "Section C"].map((sec) => (
                <SelectItem key={sec} value={sec}>
                  {sec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {showMapping && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <h6 className="font-semibold text-lg">Subjects</h6>
             <h6 className="font-semibold text-lg hidden md:block">Subject Teachers</h6>
          </div>

          <div className="space-y-4">
             {/* Class Teacher Field */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <Label className="md:col-span-1">Class Teacher <span className="text-destructive">*</span></Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Search teacher" />
                    </SelectTrigger>
                    <SelectContent>
                        {mockTeachers.map(t => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>

             {/* Subject Fields */}
             {subjects.map((subject) => (
                <div key={subject.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                     <Label className="md:col-span-1 font-normal">{subject.name}</Label>
                     <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Search teacher" />
                        </SelectTrigger>
                        <SelectContent>
                            {mockTeachers.map(t => (
                                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
             ))}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline" className="px-8" asChild>
                <Link href="/dashboard/settings/teacher-mapping">Back</Link>
            </Button>
            <Button className="px-8">Save & Assign</Button>
          </div>
        </div>
      )}
    </div>
  );
}
