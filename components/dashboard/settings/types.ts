// Settings types

export type SettingsMenuItem = {
  id: string;
  label: string;
  href: string;
  icon: string; // Icon name instead of component
};

export type ClassSection = {
  id: string;
  class: string;
  total: string;
  sections: string;
};

export type Teacher = {
  id: string;
  name: string;
};

export type ClassSectionFormData = {
  classes: ClassData[];
};

export type ClassData = {
  id: string;
  name: string;
  sections: SectionData[];
};

export type SectionData = {
  id: string;
  name: string;
  teacherId?: string;
};

export type TeacherAssignment = {
  classId: string;
  sectionId: string;
  teacherId: string;
};

// Subject Setup Types
export type SubjectListItem = {
  id: string;
  class: string;
  sections: string;
  group: string;
  commonSubjects: number;
  electiveSubjects: number;
  languageChoices: number;
};

export type Subject = {
  id: string;
  name: string;
  type: "common" | "elective";
  subdivisions?: Subject[];
};

export type ElectiveGroup = {
  id: string;
  name: string;
  subjects: string[];
};

export type SectionAssignment = {
  groupId: string;
  sectionIds: string[];
};

export type SubjectFormData = {
  classId: string;
  subjects: Subject[];
  electiveGroups: ElectiveGroup[];
  sectionAssignments: SectionAssignment[];
};

// Teacher Mapping Types
export type TeacherMappingItem = {
  id: string;
  class: string;
  section: string;
  group: string;
  classTeacher: string;
  totalSubjects: number;
  subjectTeachers: number;
};

export type TeacherMappingFormData = {
  classId: string;
  sectionId: string;
  classTeacherId: string;
  subjects: {
    subjectId: string;
    teacherId: string;
  }[];
};

// Fees Setup Types
export type FeeComponent = {
  id: string;
  name: string; // e.g., "Tuition - Term 1"
  amount: number;
};

export type FeePattern = {
  id: string;
  name: string; // e.g., "Annual Fees"
  components: FeeComponent[];
};

export type FeeStructure = {
  id: string;
  class: string;
  section: string; // "A" or "A, B, C"
  group: string; // "CS" or "-"
  patternName: string;
  breakdown: FeeComponent[];
  total: number;
};

export type FeePatternFormData = {
  patterns: FeePattern[];
};

// Exam Setup Types
export type ExamType = {
  id: string;
  name: string;
};

export type ExamPattern = {
  id: string;
  classRange: string;
  patternName: string; // e.g., "Primary", "Secondary"
  examTypes: ExamType[]; // e.g., "Unit Test 1", "Term 1"
};
