// Core types for the school management system

export type UserRole = "admin" | "campus_admin";
export type StaffRole = "teacher" | "staff";
export type Gender = "male" | "female" | "other";
export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
export type IdProofType =
  | "aadhar"
  | "pan"
  | "voter_id"
  | "passport"
  | "driving_license";
export type AdmissionStatus =
  | "pending"
  | "in_review"
  | "approved"
  | "enrolled"
  | "rejected";
export type MarkingType = "marks" | "grades" | "cgpa";

export interface Address {
  doorNo: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface Campus {
  id: string;
  name: string;
  board: string;
  phone: string;
  email: string;
  logo?: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: Gender;
  bloodGroup: BloodGroup;
  idProofType: IdProofType;
  idReferenceNo: string;
  photo?: string;
}

export interface ContactDetails {
  address: Address;
  phone: string;
  email: string;
}

export interface ProfessionalDetails {
  designation: string;
  employeeId: string;
  joiningDate: Date;
  leavingDate?: Date;
  campusId?: string;
  education: string;
  course: string;
  institution: string;
  passedOutYear: number;
  role: UserRole | StaffRole;
}

export interface User {
  id: string;
  personalDetails: PersonalDetails;
  contactDetails: ContactDetails;
  professionalDetails: ProfessionalDetails;
  role: UserRole;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  personalDetails: PersonalDetails;
  contactDetails: ContactDetails;
  professionalDetails: ProfessionalDetails;
  campusId: string;
  subjects?: string[];
  classes?: string[];
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  id: string;
  personalDetails: PersonalDetails;
  contactDetails: ContactDetails;
  professionalDetails: ProfessionalDetails;
  campusId: string;
  department?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface ParentGuardianDetails {
  name: string;
  phone: string;
  allowAppAccess: boolean;
  education: string;
  course: string;
  institution: string;
  passedOutYear: number;
  occupation: string;
  annualIncome: number;
}

export interface Student {
  id: string;
  campusId: string;
  rollNumber: string;
  joinDate: Date;
  class: string;
  section: string;
  stream?: string;
  personalDetails: Omit<PersonalDetails, "phone">;
  contactDetails: Omit<ContactDetails, "phone">;
  father?: ParentGuardianDetails;
  mother?: ParentGuardianDetails;
  guardian?: ParentGuardianDetails;
  status: "active" | "inactive" | "graduated" | "transferred";
  createdAt: Date;
  updatedAt: Date;
}

export interface TimetablePeriod {
  id: string;
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
  startTime: string;
  endTime: string;
  subject: string;
  teacherId?: string;
}

export interface Timetable {
  id: string;
  campusId: string;
  name: string;
  periods: TimetablePeriod[];
  assignedClasses: { class: string; section: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamSubject {
  date: Date;
  day: string;
  subject: string;
  markingType: MarkingType;
  totalMarks?: number;
  passPercentage?: number;
}

export interface Exam {
  id: string;
  campusId: string;
  class: string;
  section: string;
  term: string;
  subjects: ExamSubject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Admission {
  id: string;
  campusId: string;
  class: string;
  section: string;
  admissionType: "new" | "transfer";
  academicYear: string;
  studentData: Omit<Student, "id" | "createdAt" | "updatedAt" | "status">;
  status: AdmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: "holiday" | "event" | "announcement";
  campusId?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalStaff: number;
  totalCampuses: number;
  studentGrowth: number;
  attendanceRate: number;
}
