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
