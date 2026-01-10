import { Fee } from "./fees-columns";

export const feesData: Fee[] = [
  {
    id: 1,
    name: "Felina Moses",
    phone: "9638527410",
    rollNo: "123456",
    status: "Active",
    className: "10",
    section: "B",
    total: 30700,
    paid: 22000,
    due: 8700,
    avatar: "/users/user53.jpg",

    academicYear: "2022–2023",
    dob: "00/00/0000",
    address: "1/21, Gandhi Street, Chennai - 600001",

    history: [
      {
        id: 1,
        exam: "First Mid Term",
        date: "12 Mar 2023",
        transactionId: "TXN123456",
        mode: "Credit Card",
        amount: 10000,
        status: "Paid",
      },
      {
        id: 2,
        exam: "Quarterly Exam",
        date: "15 Jun 2023",
        transactionId: "TXN123457",
        mode: "Net Banking",
        amount: 8000,
        status: "Paid",
      },
      {
        id: 3,
        exam: "Second Mid Term",
        date: "10 Sep 2023",
        transactionId: "TXN123458",
        mode: "UPI",
        amount: 7000,
        status: "Pending",
      },
    ],
  },
];
