"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalStep from "./steps/PersonalStep";
import ContactStep from "./steps/ContactStep";
import ParentsStep from "./steps/ParentInfoStep";

export type StudentFormValues = {
  branch: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  joinDate: string;
  class: string;
  section: string;
  group: string;
  languageGroup: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  idProof: string;
  tdRefNumber: string;
  photo?: File;

  address: {
    door: string;
    line1?: string;
    line2: string;
    landmark?: string;
    city: string;
    state?: string;
    pin: string;
    country?: string;
    email: string;
  };

  parents: {
    father: ParentInfo;
    mother: ParentInfo;
    guardian: ParentInfo;
  };
};

type ParentInfo = {
  name: string;
  phone: string;
  allowAppAccess: boolean;
  degreeOrClass: string;
  course: string;
  institution: string;
  passedOutYear: string;
  occupation: string;
  annualIncome: string;
};

const steps = ["Personal", "Contact", "Parents Information"] as const;

export default function CreateStudentForm() {
  const [step, setStep] = useState(0);

  const form = useForm<StudentFormValues>({
    mode: "onBlur",
    defaultValues: {
      parents: {
        father: {
          name: "",
          phone: "",
          allowAppAccess: false,
          degreeOrClass: "",
          course: "",
          institution: "",
          passedOutYear: "",
          occupation: "",
          annualIncome: "",
        },
        mother: {
          name: "",
          phone: "",
          allowAppAccess: false,
          degreeOrClass: "",
          course: "",
          institution: "",
          passedOutYear: "",
          occupation: "",
          annualIncome: "",
        },
        guardian: {
          name: "",
          phone: "",
          allowAppAccess: false,
          degreeOrClass: "",
          course: "",
          institution: "",
          passedOutYear: "",
          occupation: "",
          annualIncome: "",
        },
      },
      address: {
        door: "",
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        state: "",
        pin: "",
        country: "",
        email: "",
      },
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: StudentFormValues) => {
    console.log("Create Student Payload", data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-6 pb-6 space-y-8"
      >
        {/*Step Tabs*/}
        <div className="grid grid-cols-3 overflow-hidden rounded-t-md">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`text-center py-3 flex items-center justify-center text-sm font-semibold ${
                i === step ? "bg-pink-500 text-white" : "bg-pink-200/50 text-gray-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {step === 0 && <PersonalStep onNext={next} />}
        {step === 1 && <ContactStep onNext={next} onBack={back} />}
        {step === 2 && <ParentsStep onBack={back} />}
      </form>
    </FormProvider>
  );
}
