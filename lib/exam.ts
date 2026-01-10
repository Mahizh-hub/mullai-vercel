export type ExamRow = {
  id: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  session: "Morning" | "Afternoon";
  subject: string;
  markingType: "Marks" | "Grade";
  total: number | "";
  passPercentage: number | "";
};
