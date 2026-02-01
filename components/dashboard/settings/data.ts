import { ClassSection, Teacher, SettingsMenuItem, SubjectListItem } from "./types";

export const settingsMenuItems: SettingsMenuItem[] = [
  {
    id: "class-section",
    label: "Class & Section setup",
    href: "/dashboard/settings",
    icon: "ClassSectionIcon",
  },
  {
    id: "subjects",
    label: "Subjects Setup",
    href: "/dashboard/settings/subjects",
    icon: "SubjectsSetupIcon",
  },
  {
    id: "teacher-mapping",
    label: "Teacher Mapping",
    href: "/dashboard/settings/teacher-mapping",
    icon: "TeacherMapIcon",
  },
  {
    id: "fees",
    label: "Fees Setup",
    href: "/dashboard/settings/fees",
    icon: "FeesIcon",
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/dashboard/settings/calendar",
    icon: "CalenderIcon",
  },
  {
    id: "exam",
    label: "Exam Setup",
    href: "/dashboard/settings/exam",
    icon: "ExamSetupIcon",
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

// Subject Setup Mock Data
export const mockSubjectsList: SubjectListItem[] = [
  {
    id: "1",
    class: "1",
    sections: "A, B, C, D",
    group: "-",
    commonSubjects: 5,
    electiveSubjects: 0,
    languageChoices: 2,
  },
  {
    id: "2",
    class: "10",
    sections: "A, B, C, D, E",
    group: "-",
    commonSubjects: 6,
    electiveSubjects: 0,
    languageChoices: 2,
  },
  {
    id: "3",
    class: "11",
    sections: "A, B, C, D, E",
    group: "Computer Science",
    commonSubjects: 5,
    electiveSubjects: 6,
    languageChoices: 2,
  },
  {
    id: "4",
    class: "11",
    sections: "F, G",
    group: "Commerce",
    commonSubjects: 5,
    electiveSubjects: 4,
    languageChoices: 2,
  },
  {
    id: "5",
    class: "11",
    sections: "H, I",
    group: "Bio Maths",
    commonSubjects: 5,
    electiveSubjects: 4,
    languageChoices: 2,
  },
  {
    id: "6",
    class: "12",
    sections: "A, B, C",
    group: "Computer Science",
    commonSubjects: 5,
    electiveSubjects: 6,
    languageChoices: 2,
  },
];

export const mockClasses = [
  { id: "1", name: "Class 1", sections: ["A", "B", "C", "D"] },
  { id: "10", name: "Class 10", sections: ["A", "B", "C", "D", "E"] },
  { id: "11", name: "Class 11", sections: ["A", "B", "C", "D", "E", "F", "G", "H", "I"] },
  { id: "12", name: "Class 12", sections: ["A", "B", "C"] },
];

export const mockCommonSubjects = [
  { id: "1", name: "Maths", color: "blue" as const },
  { id: "2", name: "Science", color: "purple" as const },
  { id: "3", name: "English", color: "pink" as const },
];

// Grouped subjects (displayed together in a container)
export const mockGroupedSubjects = [
  {
    id: "1",
    subjects: [
      { label: "Computer Science", color: "green" as const },
      { label: "CS Lab", color: "green-light" as const },
    ],
  },
];

export const mockElectiveGroups = [
  {
    id: "1",
    name: "Computer Science",
    subjects: ["Physics", "Chemistry", "Computer Science", "Maths"],
  },
  {
    id: "2",
    name: "Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics", "Commerce"],
  },
  {
    id: "3",
    name: "Bio Maths",
    subjects: ["Physics", "Chemistry", "Biology", "Maths"],
  },
];

export const mockTeacherMappings: import("./types").TeacherMappingItem[] = [
  {
    id: "1",
    class: "10",
    section: "A",
    group: "Computer Science",
    classTeacher: "Sumathi John",
    totalSubjects: 8,
    subjectTeachers: 8,
  },
  {
    id: "2",
    class: "10",
    section: "D",
    group: "Commerce",
    classTeacher: "Sumathi John",
    totalSubjects: 8,
    subjectTeachers: 8,
  },
];
