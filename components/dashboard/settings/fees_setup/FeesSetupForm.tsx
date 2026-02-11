"use client";

import { useState } from "react";
import { useForm, useFieldArray, Control, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
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
import { FeePatternFormData } from "@/components/dashboard/settings/types";
import WizardTabs from "@/components/dashboard/settings/WizardTabs";
import PageHeader from "@/components/layout/PageHeader";
import FeePatternListModal from "./FeePatternListModal";

const tabs = [
  { id: "fees-structure", label: "Fees Structure" },
  { id: "link-class", label: "Link Class/ Grade" },
];

export default function FeesSetupForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  
  // State for dynamic fee types
  const [availableFeeTypes, setAvailableFeeTypes] = useState<string[]>([]);
  const [isViewListOpen, setIsViewListOpen] = useState(false);

  const { register, control, handleSubmit, watch, getValues, setValue } =
    useForm<FeePatternFormData>({
      defaultValues: {
        patterns: [
          {
            id: Date.now().toString(),
            name: "", // Initialize empty
            components: [{ id: Date.now().toString(), name: "", amount: 0 }],
          },
        ],
      },
    });

  const {
    fields: patternFields,
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

  const handleAddFeeType = (newType: string) => {
    if (newType && !availableFeeTypes.includes(newType)) {
        setAvailableFeeTypes([...availableFeeTypes, newType]);
    }
  };

  const handleDeleteFeeType = (typeToDelete: string) => {
    setAvailableFeeTypes(availableFeeTypes.filter(type => type !== typeToDelete));
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

              {/* We only render one pattern block now */}
              {patternFields.length > 0 && (
                <FeePatternBlock
                  key={patternFields[0].id}
                  patternIndex={0}
                  control={control}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  activeFeeTypes={availableFeeTypes}
                  onAddFeeType={handleAddFeeType}
                  onViewList={() => setIsViewListOpen(true)}
                />
              )}

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
                   const total = pattern.components.reduce((sum, comp: { amount: number }) => sum + (Number(comp.amount) || 0), 0);
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
                                <th key={cIdx} className="px-4 py-2 whitespace-nowrap border border-gray-100">
                                    {comp.name || "-"}
                                </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-t bg-white">
                                {pattern.components.map((comp, cIdx) => (
                                <td key={cIdx} className="px-4 py-2 font-medium border border-gray-100">
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

              <div className="form-section mt-3">
                <div className="space-y-3">
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
                          className={`px-4 text-sm py-1 rounded-full border transition-colors ${
                            selectedSections.includes(section)
                              ? "bg-pink-600 text-primary-foreground border-pink-600"
                              : "bg-transparent text-pink-600 border-pink-600 hover:bg-pink-600/10"
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
        isOpen={isViewListOpen}
        onOpenChange={setIsViewListOpen}
        feeTypes={availableFeeTypes}
        onDelete={handleDeleteFeeType}
      />
    </>
  );
}

// Sub-component for individual pattern block
type FeePatternBlockProps = {
  patternIndex: number;
  control: Control<FeePatternFormData>;
  register: UseFormRegister<FeePatternFormData>;
  setValue: UseFormSetValue<FeePatternFormData>;
  watch: UseFormWatch<FeePatternFormData>;
  activeFeeTypes: string[];
  onAddFeeType: (type: string) => void;
  onViewList: () => void;
};

function FeePatternBlock({
  patternIndex,
  control,
  register,
  setValue,
  watch,
  activeFeeTypes,
  onAddFeeType,
  onViewList,
}: FeePatternBlockProps) {
  const [newFeeTypeName, setNewFeeTypeName] = useState("");
  
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
    (sum: number, comp: { amount: number }) => sum + (Number(comp.amount) || 0),
    0
  );

  const handleAddClick = () => {
    if (newFeeTypeName.trim()) {
        onAddFeeType(newFeeTypeName.trim());
        setNewFeeTypeName(""); // Clear input
    }
  };

  return (
    <div className="relative pb-2 mb-6">
      
      {/* Fee Pattern Name Input */}
      <div className="mb-6">
        <Label className="block mb-2">
            Fee Pattern Name <span className="text-destructive">*</span>
        </Label>
        <Input
            {...register(`patterns.${patternIndex}.name`, { required: true })}
            placeholder="Enter fee pattern name (e.g. Term 1 Fees)"
            className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label className="block mb-2">
            Fee Component Name <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2 items-center">
            <div className="flex-1 flex gap-2 items-center">
                <Input
                    value={newFeeTypeName}
                    onChange={(e) => setNewFeeTypeName(e.target.value)}
                    placeholder="Enter new fee component name"
                    className="flex-1 max-w-md"
                />
                 <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddClick}
                    disabled={!newFeeTypeName.trim()}
                >
                    <Plus className="size-4" />
                </Button>
            </div>
           
            <div className="flex-1 gap-2 shrink-0">
                <Button
                type="button"
                variant="outline"
                size="default" 
                className="border-pink-600 text-pink-600 hover:bg-pink-600/5 hover:text-pink-600" 
                onClick={onViewList}
                >
                View List
                </Button>
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
                disabled={activeFeeTypes.length === 0}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={activeFeeTypes.length === 0 ? "Add fee type above first" : "Select Fee Type"} />
                  </SelectTrigger>
                  <SelectContent>
                      {activeFeeTypes.map(type => (
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
                size="icon"
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
                  size="icon"
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
