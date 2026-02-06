"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { FeePatternFormData, FeePattern } from "../types";
import WizardTabs from "../WizardTabs";
import PageHeader from "../../PageHeader";
import FeePatternListModal from "./FeePatternListModal";

const tabs = [
  { id: "fees-structure", label: "Fees Structure" },
  { id: "link-class", label: "Link Class/ Grade" },
];

const FEE_TYPES = [
  "Annual Fees",
  "Admission",
  "Tuition – Term 1",
  "Tuition – Term 2",
  "Tuition – Term 3",
  "Transport",
  "Books & Stationery",
  "Lab Fee",
  "Lab Fee - Physics",
  "Lab Fee - Biology",
];

export default function FeesSetupForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [viewingPattern, setViewingPattern] = useState<FeePattern | null>(null);

  const { register, control, handleSubmit, watch, getValues, setValue } =
    useForm<FeePatternFormData>({
      defaultValues: {
        patterns: [
          {
            id: Date.now().toString(),
            name: "",
            components: [{ id: Date.now().toString(), name: "", amount: 0 }],
          },
        ],
      },
    });

  const {
    fields: patternFields,
    append: appendPattern,
    remove: removePattern,
  } = useFieldArray({
    control,
    name: "patterns",
  });

  const watchPatterns = watch("patterns");

  const onSubmit = (data: FeePatternFormData) => {
    console.log("Form Data:", data);
    console.log("Class:", selectedClass);
    console.log("Sections:", selectedSections);
    // Submit logic here
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedSections([]);
  };

  const toggleSection = (section: string) => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter((s) => s !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const handleViewList = (index: number) => {
    const pattern = getValues(`patterns.${index}`);
    setViewingPattern(pattern);
  };

  // Mock data for sections
  const getSectionsForClass = (cls: string) => {
    if (cls === "5") return ["A", "B", "C", "D", "E"];
    if (cls === "6") return ["A", "B", "C"];
    if (cls === "7") return ["A", "B"];
    if (cls === "11") return ["A · CS", "B · Biology"];
    return [];
  };

  const sections = getSectionsForClass(selectedClass);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <WizardTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="px-3 pb-3">
          {/* Tab 1: Fees Structure */}
          {activeTab === 0 && (
            <div className="space-y-8">
              <PageHeader
                title="Fees Structure"
                subtitle="Create and manage fee components and term-wise amounts."
              />

              {patternFields.map((patternField, patternIndex) => (
                <FeePatternBlock
                  key={patternField.id}
                  patternIndex={patternIndex}
                  control={control}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  onRemove={() => removePattern(patternIndex)}
                  onViewList={() => handleViewList(patternIndex)}
                  canRemove={patternFields.length > 1}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendPattern({
                    id: Date.now().toString(),
                    name: "",
                    components: [
                      { id: Date.now().toString(), name: "", amount: 0 },
                    ],
                  })
                }
                className="w-full border-dashed py-5 text-primary border-primary/20 bg-primary/5 hover:bg-primary/10"
              >
                <Plus className="size-4 mr-2" />
                Add Another Fee Pattern
              </Button>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setActiveTab(1)}
                >
                    Save & Continue
                </Button>
              </div>
            </div>
          )}

          {/* Tab 2: Link Class/Grade */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <PageHeader
                title="Link Class / Grade"
                subtitle="Link the fee structure to classes & Sections."
              />

              {/* Summary Table */}
              <div className="space-y-6">
                {watchPatterns.map((pattern, idx) => {
                   const total = pattern.components.reduce((sum, comp) => sum + (Number(comp.amount) || 0), 0);
                   return (
                    <div key={idx} className="border rounded-md overflow-hidden">
                        <div className="bg-gray-100 px-4 py-2 font-semibold text-sm border-b flex justify-between">
                            <span>{pattern.name || `Pattern ${idx + 1}`}</span>
                            <span>Total: {total}</span>
                        </div>
                        <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                {pattern.components.map((comp, cIdx) => (
                                <th key={cIdx} className="px-4 py-2 whitespace-nowrap">
                                    {comp.name || "-"}
                                </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-t bg-white">
                                {pattern.components.map((comp, cIdx) => (
                                <td key={cIdx} className="px-4 py-2 font-medium">
                                    {comp.amount || 0}
                                </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                )})}
              </div>

              <div className="form-section mt-6">
                <div className="space-y-3 mb-6">
                  <Label>
                    Select Class <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={selectedClass}
                    onValueChange={handleClassChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Class 5</SelectItem>
                      <SelectItem value="6">Class 6</SelectItem>
                      <SelectItem value="7">Class 7</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedClass && (
                  <div className="space-y-3">
                    <Label>
                      Select Section(s) <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-3 flex-wrap">
                      {sections.map((section) => (
                        <button
                          key={section}
                          type="button"
                          onClick={() => toggleSection(section)}
                          className={`px-6 py-2 rounded-full border transition-colors ${
                            selectedSections.includes(section)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-transparent text-primary border-primary hover:bg-primary/10"
                          }`}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
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
                  Save & Assign
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>

      <FeePatternListModal
        isOpen={!!viewingPattern}
        onOpenChange={(open) => !open && setViewingPattern(null)}
        pattern={viewingPattern}
      />
    </>
  );
}

// Sub-component for individual pattern block
type FeePatternBlockProps = {
  patternIndex: number;
  control: any;
  register: any;
  setValue: any;
  watch: any;
  onRemove: () => void;
  onViewList: () => void;
  canRemove: boolean;
};

function FeePatternBlock({
  patternIndex,
  control,
  register,
  setValue,
  watch,
  onRemove,
  onViewList,
  canRemove,
}: FeePatternBlockProps) {
  const {
    fields: componentFields,
    append: appendComponent,
    remove: removeComponent,
  } = useFieldArray({
    control,
    name: `patterns.${patternIndex}.components`,
  });

  // Calculate total for this pattern
  const components = watch(`patterns.${patternIndex}.components`);
  const patternTotal = components?.reduce(
    (sum: number, comp: any) => sum + (Number(comp.amount) || 0),
    0
  );

  return (
    <div className="relative pb-2 border-b border-gray-200 last:border-0 mb-6">
      <div className="mb-4">
        <Label className="block mb-2">
            Fees Pattern Name <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-4 items-center">
            <Input
                {...register(`patterns.${patternIndex}.name`)}
                placeholder="e.g. Annual Fees"
                className="flex-1"
            />
            <div className="flex gap-2 shrink-0">
                <Button
                type="button"
                variant="outline"
                size="default" 
                className="border-pink-600 text-pink-600 hover:bg-pink-600/5 hover:text-pink-600" 
                onClick={onViewList}
                >
                View List
                </Button>
                {canRemove && (
                    <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={onRemove}
                    >
                    <Trash2 className="size-4" />
                    </Button>
                )}
            </div>
        </div>
      </div>

      <div className="mb-2">
        <h6 className="font-semibold text-sm mb-1 ml-1 text-gray-600">
          Fee Components & Amounts
        </h6>
      </div>

      <div className="space-y-3 ml-1 pl-1">
        {componentFields.map((field, compIndex) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            <div className="md:col-span-5">
              <Select
                value={watch(`patterns.${patternIndex}.components.${compIndex}.name`)}
                onValueChange={(val) => 
                     setValue(`patterns.${patternIndex}.components.${compIndex}.name`, val)
                }
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Fee Type" />
                  </SelectTrigger>
                  <SelectContent>
                      {FEE_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-4">
              <Input
                type="number"
                {...register(
                  `patterns.${patternIndex}.components.${compIndex}.amount`
                )}
                placeholder="Amount"
              />
            </div>
            <div className="md:col-span-3 flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-4" // Matches ClassSectionForm styling
                onClick={() =>
                  appendComponent({
                    id: Date.now().toString(),
                    name: "",
                    amount: 0,
                  })
                }
              >
                <Plus className="size-4" />
              </Button>
              {componentFields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="px-4" // Matches ClassSectionForm styling
                  onClick={() => removeComponent(compIndex)}
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 mb-4 pt-2">
            <div className="md:col-span-5 relative ml-1 pl-1">
                <Input
                    value="TOTAL"
                    disabled
                    className="font-semibold bg-gray-50"
                  />
            </div>
            <div className="md:col-span-4">
                  <Input
                    value={patternTotal}
                    disabled
                    className="font-semibold bg-gray-50"
                  />
            </div>
      </div>
      
    </div>
  );
}
