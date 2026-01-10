export type FeeRow = {
  id: number;
  name: string;
  phone: string;
  rollNumber: string;
  className: string;
  section: string;
  status: "active" | "inactive";
  total: number;
  paid: number;
  due: number;
  avatar?: string;
};

export type CreateFeesFormValues = {
  rollNo: string;
  studentName?: string;
  className?: string;
  section?: string;
  academicYear?: string;

  paymentDate: string;
  paymentType: string;
  paymentMode: string;

  tuitionTerm1?: string;
  tuitionTerm2?: string;
  tuitionTerm3?: string;
  books?: string;
  transport?: string;
  extracurricular?: string;
  others?: string;
  subtotal?: string;
  totalPayment?: string;
};
