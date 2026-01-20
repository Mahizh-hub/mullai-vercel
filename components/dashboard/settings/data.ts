import { ClassSection, Teacher, SettingsMenuItem } from "./types";

export const settingsMenuItems: SettingsMenuItem[] = [
  {
    id: "class-section",
    label: "Class & Section setup",
    href: "/dashboard/settings",
    icon: "graduation-cap",
  },
  {
    id: "subjects",
    label: "Subjects Setup",
    href: "/dashboard/settings/subjects",
    icon: "book-open",
  },
  {
    id: "teacher-mapping",
    label: "Teacher Mapping",
    href: "/dashboard/settings/teacher-mapping",
    icon: "user-cog",
  },
  {
    id: "fees",
    label: "Fees Setup",
    href: "/dashboard/settings/fees",
    icon: "dollar-sign",
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/dashboard/settings/calendar",
    icon: "calendar",
  },
  {
    id: "exam",
    label: "Exam Setup",
    href: "/dashboard/settings/exam",
    icon: "clipboard-check",
  },
];

export const mockClassSections: ClassSection[] = [
  {
    id: "1",
    class: "1",
    total: "A - F",
    sections: "A, B, C, D, E, F, G, H, I, J, K, L",
  },
  {
    id: "2",
    class: "2",
    total: "A - F",
    sections: "A, B, C, D, E, F",
  },
  {
    id: "3",
    class: "3",
    total: "A - D",
    sections: "A, B, C, D",
  },
  {
    id: "4",
    class: "4",
    total: "A - F",
    sections: "A, B, C, D, E, F",
  },
  {
    id: "5",
    class: "5",
    total: "A - E",
    sections: "A, B, C, D, E",
  },
  {
    id: "6",
    class: "6",
    total: "A - F",
    sections: "A, B, C, D, E, F",
  },
  {
    id: "7",
    class: "7",
    total: "A - D",
    sections: "A, B, C, D",
  },
  {
    id: "8",
    class: "8",
    total: "A - E",
    sections: "A, B, C, D, E",
  },
  {
    id: "9",
    class: "9",
    total: "A - F",
    sections: "A, B, C, D, E, F",
  },
  {
    id: "10",
    class: "10",
    total: "A - F",
    sections: "A, B, C, D, E, F",
  },
  {
    id: "11",
    class: "11",
    total: "A - C",
    sections: "A, B, C",
  },
  {
    id: "12",
    class: "12",
    total: "A - C",
    sections: "A, B, C",
  },
];

export const mockTeachers: Teacher[] = [
  { id: "1", name: "Rajesh Kanna" },
  { id: "2", name: "Lalitha Banu" },
  { id: "3", name: "Suresh Kumar" },
  { id: "4", name: "Priya Sharma" },
  { id: "5", name: "Arun Prakash" },
  { id: "6", name: "Deepa Krishnan" },
  { id: "7", name: "Venkat Raman" },
  { id: "8", name: "Anitha Murugan" },
];
