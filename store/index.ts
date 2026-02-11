"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Campus,
  User,
  Teacher,
  Staff,
  Student,
  Timetable,
  Exam,
  Admission,
  Event,
  UserRole,
} from "@/types";

interface AppState {
  // Current user context
  currentUser: User | null;
  currentUserRole: UserRole;
  selectedCampusId: string | null;

  // Data stores
  campuses: Campus[];
  users: User[];
  teachers: Teacher[];
  staff: Staff[];
  students: Student[];
  timetables: Timetable[];
  exams: Exam[];
  admissions: Admission[];
  events: Event[];

  // Actions
  setCurrentUser: (user: User | null) => void;
  setCurrentUserRole: (role: UserRole) => void;
  setSelectedCampus: (campusId: string | null) => void;

  // Campus
  addCampus: (campus: Campus) => void;
  updateCampus: (id: string, campus: Partial<Campus>) => void;
  deleteCampus: (id: string) => void;

  // User
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Teacher
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Staff
  addStaff: (staff: Staff) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;

  // Student
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Timetable
  addTimetable: (timetable: Timetable) => void;
  updateTimetable: (id: string, timetable: Partial<Timetable>) => void;
  deleteTimetable: (id: string) => void;

  // Exam
  addExam: (exam: Exam) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;

  // Admission
  addAdmission: (admission: Admission) => void;
  updateAdmission: (id: string, admission: Partial<Admission>) => void;
  deleteAdmission: (id: string) => void;
  convertAdmissionToStudent: (admissionId: string) => void;

  // Event
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

const sampleCampuses: Campus[] = [
  {
    id: "1",
    name: "Main Campus",
    board: "CBSE",
    phone: "+91 9876543210",
    email: "main@eduadmin.com",
    address: {
      doorNo: "123",
      line1: "Education Street",
      line2: "Academic Zone",
      city: "Chennai",
      state: "Tamil Nadu",
      pinCode: "600001",
      country: "India",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "North Campus",
    board: "ICSE",
    phone: "+91 9876543211",
    email: "north@eduadmin.com",
    address: {
      doorNo: "456",
      line1: "Knowledge Avenue",
      city: "Chennai",
      state: "Tamil Nadu",
      pinCode: "600002",
      country: "India",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Annual Sports Day",
    description: "Annual inter-house sports competition",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    type: "event",
  },
  {
    id: "2",
    title: "Republic Day",
    description: "National holiday - School closed",
    date: new Date("2025-01-26"),
    type: "holiday",
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    description: "Quarterly PTM for all classes",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    type: "event",
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      currentUserRole: "admin",
      selectedCampusId: null,

      campuses: sampleCampuses,
      users: [],
      teachers: [],
      staff: [],
      students: [],
      timetables: [],
      exams: [],
      admissions: [],
      events: sampleEvents,

      setCurrentUser: (user) => set({ currentUser: user }),
      setCurrentUserRole: (role) => set({ currentUserRole: role }),
      setSelectedCampus: (campusId) => set({ selectedCampusId: campusId }),

      addCampus: (campus) =>
        set((state) => ({ campuses: [...state.campuses, campus] })),
      updateCampus: (id, updates) =>
        set((state) => ({
          campuses: state.campuses.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c,
          ),
        })),
      deleteCampus: (id) =>
        set((state) => ({
          campuses: state.campuses.filter((c) => c.id !== id),
        })),

      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...updates, updatedAt: new Date() } : u,
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({ users: state.users.filter((u) => u.id !== id) })),

      addTeacher: (teacher) =>
        set((state) => ({ teachers: [...state.teachers, teacher] })),
      updateTeacher: (id, updates) =>
        set((state) => ({
          teachers: state.teachers.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t,
          ),
        })),
      deleteTeacher: (id) =>
        set((state) => ({
          teachers: state.teachers.filter((t) => t.id !== id),
        })),

      addStaff: (staff) => set((state) => ({ staff: [...state.staff, staff] })),
      updateStaff: (id, updates) =>
        set((state) => ({
          staff: state.staff.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s,
          ),
        })),
      deleteStaff: (id) =>
        set((state) => ({ staff: state.staff.filter((s) => s.id !== id) })),

      addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] })),
      updateStudent: (id, updates) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s,
          ),
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),

      addTimetable: (timetable) =>
        set((state) => ({ timetables: [...state.timetables, timetable] })),
      updateTimetable: (id, updates) =>
        set((state) => ({
          timetables: state.timetables.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t,
          ),
        })),
      deleteTimetable: (id) =>
        set((state) => ({
          timetables: state.timetables.filter((t) => t.id !== id),
        })),

      addExam: (exam) => set((state) => ({ exams: [...state.exams, exam] })),
      updateExam: (id, updates) =>
        set((state) => ({
          exams: state.exams.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: new Date() } : e,
          ),
        })),
      deleteExam: (id) =>
        set((state) => ({ exams: state.exams.filter((e) => e.id !== id) })),

      addAdmission: (admission) =>
        set((state) => ({ admissions: [...state.admissions, admission] })),
      updateAdmission: (id, updates) =>
        set((state) => ({
          admissions: state.admissions.map((a) =>
            a.id === id ? { ...a, ...updates, updatedAt: new Date() } : a,
          ),
        })),
      deleteAdmission: (id) =>
        set((state) => ({
          admissions: state.admissions.filter((a) => a.id !== id),
        })),
      convertAdmissionToStudent: (admissionId) => {
        const state = get();
        const admission = state.admissions.find((a) => a.id === admissionId);
        if (admission && admission.status === "approved") {
          const newStudent: Student = {
            id: crypto.randomUUID(),
            ...admission.studentData,
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set({
            students: [...state.students, newStudent],
            admissions: state.admissions.map((a) =>
              a.id === admissionId
                ? { ...a, status: "enrolled" as const, updatedAt: new Date() }
                : a,
            ),
          });
        }
      },

      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...updates } : e,
          ),
        })),
      deleteEvent: (id) =>
        set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
    }),
    {
      name: "edu-admin-storage",
      partialize: (state) => ({
        campuses: state.campuses,
        users: state.users,
        teachers: state.teachers,
        staff: state.staff,
        students: state.students,
        timetables: state.timetables,
        exams: state.exams,
        admissions: state.admissions,
        events: state.events,
        currentUserRole: state.currentUserRole,
        selectedCampusId: state.selectedCampusId,
      }),
    },
  ),
);
