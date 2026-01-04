"use client";

import {
  EmployeeFormValues,
  employeeSchema,
} from "@/lib/validations/employee.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalStep from "./steps/PersonalStep";
import ContactStep from "./steps/ContactStep";
import EmployeeInfoStep from "./steps/EmployeeInfostep";

const steps = ["Personal", "Contact", "Employee Information"] as const;

export default function CreateEmployeeForm() {
  const [step, setStep] = useState(0);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    mode: "onBlur",
    defaultValues: {
      emergencyContacts: [
        {
          name: "",
          relation: "",
          phone: "",
        },
      ],
      education: [
        {
          degree: "",
          course: "",
          institution: "",
          year: "",
        },
      ],
      roles: [],
      address: {
        door: "",
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        state: "",
        pin: "",
        country: "",
      },
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Create Employee Payload", data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-6 pb-6 space-y-8"
      >
        {/*Step Tabs*/}
        <div className="grid grid-cols-3 rounded-md overflow-hidden">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`text-center py-3 flex items-center justify-center text-sm font-semibold ${i === step ? "bg-pink-500 text-white" : "bg-pink-200 text-white"}`}
            >
              {label}
            </div>
          ))}
        </div>

        {step === 0 && <PersonalStep onNext={next} />}
        {step === 1 && <ContactStep onNext={next} onBack={back} />}
        {step === 2 && <EmployeeInfoStep onBack={back} />}
      </form>
    </FormProvider>
  );
}
