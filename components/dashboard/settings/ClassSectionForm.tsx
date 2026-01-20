"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import WizardTabs from "./WizardTabs";
import { ClassSectionFormData, Teacher, TeacherAssignment } from "./types";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "../PageHeader";

type Props = {
  teachers: Teacher[];
};

const tabs = [
  { id: "class-grade", label: "Class/Grade" },
  { id: "assign-teacher", label: "Assign Class Teacher" },
];

export default function ClassSectionForm({ teachers }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);

  const { register, control, handleSubmit, watch } =
    useForm<ClassSectionFormData>({
      defaultValues: {
        classes: [
          {
            id: "1",
            name: "",
            sections: [{ id: "1", name: "" }],
          },
        ],
      },
    });

  const { fields: classFields, append: appendClass, remove: removeClass } = useFieldArray({
    control,
    name: "classes",
  });

  const onSubmit = (data: ClassSectionFormData) => {
    console.log("Form Data:", data);
    console.log("Teacher Assignments:", assignments);
  };

  const handleAssign = (classId: string, sectionId: string, teacherId: string) => {
    const existing = assignments.find(
      (a) => a.classId === classId && a.sectionId === sectionId
    );

    if (existing) {
      alert("Teacher already assigned for this section");
      return;
    }

    setAssignments([...assignments, { classId, sectionId, teacherId }]);
  };

  const isAssigned = (classId: string, sectionId: string) => {
    return assignments.some(
      (a) => a.classId === classId && a.sectionId === sectionId
    );
  };

  const formValues = watch();
  const selectedClassData = formValues.classes.find((c) => c.name === selectedClass);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <WizardTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="px-3 pb-3">
        {/* Tab 1: Class/Grade Setup */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <PageHeader title="Class / Grade Setup" subtitle="Add and manage class or grade levels." />
            <div className="space-y-3">
              <Label>
                Classes / Grade <span className="text-destructive">*</span>
              </Label>

              {classFields.map((classField, classIndex) => (
                <ClassInputGroup
                  key={classField.id}
                  classIndex={classIndex}
                  control={control}
                  register={register}
                  canRemove={classFields.length > 1}
                  onRemove={() => removeClass(classIndex)}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendClass({
                    id: Date.now().toString(),
                    name: "",
                    sections: [{ id: Date.now().toString(), name: "" }],
                  })
                }
                className="w-fit"
              >
                <Plus className="size-4 mr-2" />
                Add Another Class
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setActiveTab(1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Tab 2: Assign Teacher */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Assign Teacher</h4>
              <p className="text-sm text-muted-foreground">
                Assign teachers to classes and sections.
              </p>
            </div>

            <div className="form-section"
>
              <div className="space-y-3">
                <Label>
                  Class/Grade <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {formValues.classes.map((cls) =>
                      cls.name ? (
                        <SelectItem key={cls.id} value={cls.name}>
                          {cls.name}
                        </SelectItem>
                      ) : null
                    )}
                  </SelectContent>
                </Select>
              </div>

              {selectedClassData && selectedClassData.sections.length > 0 && (
                <div className="space-y-3">
                  {selectedClassData.sections.map((section) =>
                    section.name ? (
                      <TeacherAssignmentRow
                        key={section.id}
                        section={section}
                        teachers={teachers}
                        isAssigned={isAssigned(selectedClassData.id, section.id)}
                        onAssign={(teacherId) =>
                          handleAssign(selectedClassData.id, section.id, teacherId)
                        }
                      />
                    ) : null
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab(0)}
              >
                Back
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

// Sub-components
type ClassInputGroupProps = {
  classIndex: number;
  control: any;
  register: any;
  canRemove: boolean;
  onRemove: () => void;
};

function ClassInputGroup({
  classIndex,
  control,
  register,
  canRemove,
  onRemove,
}: ClassInputGroupProps) {
  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: `classes.${classIndex}.sections`,
  });

  return (
    <div className="space-y-3 pb-4 border-b border-gray-200 last:border-0">
      <div className="flex gap-2">
        <Input
          {...register(`classes.${classIndex}.name`)}
          placeholder="Enter Class / Grade"
          className="flex-1"
        />
        {canRemove && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemove}
            className="px-4"
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      <div className="ml-8 space-y-2 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200">
        {sectionFields.map((sectionField, sectionIndex) => (
          <div key={sectionField.id} className="flex gap-2 items-center pl-5 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-200" />
            <Input
              {...register(`classes.${classIndex}.sections.${sectionIndex}.name`)}
              placeholder="Enter Section (A, B, C)"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendSection({
                  id: Date.now().toString(),
                  name: "",
                })
              }
              className="px-4"
            >
              <Plus className="size-4" />
            </Button>
            {sectionFields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeSection(sectionIndex)}
                className="px-4"
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type TeacherAssignmentRowProps = {
  section: { id: string; name: string };
  teachers: Teacher[];
  isAssigned: boolean;
  onAssign: (teacherId: string) => void;
};

function TeacherAssignmentRow({
  section,
  teachers,
  isAssigned,
  onAssign,
}: TeacherAssignmentRowProps) {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const handleAssignClick = () => {
    if (!selectedTeacher) {
      alert("Please select a teacher");
      return;
    }
    onAssign(selectedTeacher);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
      <div className="md:col-span-3">
        <Input
          value={section.name}
          disabled
          className="bg-pink-600 text-white placeholder:text-white disabled:opacity-100"
        />
      </div>

      <div className="md:col-span-3">
        <Select value={selectedTeacher} onValueChange={setSelectedTeacher} disabled={isAssigned}>
          <SelectTrigger>
            <SelectValue placeholder="Assign Teacher" />
          </SelectTrigger>
          <SelectContent>
            {teachers.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-3">
        <Button
          type="button"
          size="xl"
          onClick={handleAssignClick}
          disabled={isAssigned}
          className="w-full"
        >
          {isAssigned ? "ASSIGNED" : "ASSIGN"}
        </Button>
      </div>
    </div>
  );
}
