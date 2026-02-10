"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Slider } from "@/components/ui/slider";
import ExamPatternModal from "./ExamPatternModal";

// Schema for validation
const examSetupSchema = z.object({
  classFrom: z.number().min(1).max(12),
  classTo: z.number().min(1).max(12),
  patternName: z.string().min(1, "Pattern name is required"),
  exams: z.array(
    z.object({
      name: z.string().min(1, "Exam name is required"),
    })
  ).min(1, "At least one exam is required"),
});

type ExamSetupFormValues = z.infer<typeof examSetupSchema>;

// Initial mock patterns
const initialPatterns = [
  { id: "1", name: "Primary Exam Pattern" },
  { id: "2", name: "Middle School Exam Pattern" },
  { id: "3", name: "Secondary Exam Pattern" },
  { id: "4", name: "Senior Secondary Exam Pattern" },
  { id: "5", name: "Board Examination Pattern" },
];

export default function ExamSetupForm() {
    const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
    const [patterns, setPatterns] = useState(initialPatterns);
    
    // Slider state
    const [sliderValue, setSliderValue] = useState([1, 5]);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ExamSetupFormValues>({
        resolver: zodResolver(examSetupSchema),
        defaultValues: {
            classFrom: 1,
            classTo: 5,
            patternName: "",
            exams: [{ name: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "exams",
    });

    const onSubmit = (data: ExamSetupFormValues) => {
        console.log("Form Submitted:", data);
        // Implement submission logic here
    };

    const watchPatternName = watch("patternName");

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value);
        setValue("classFrom", value[0]);
        setValue("classTo", value[1]);
    };

    // Modal Handlers
    const handleAddPattern = (name: string) => {
        const newPattern = { id: Date.now().toString(), name };
        setPatterns([...patterns, newPattern]);
    };

    const handleDeletePattern = (id: string) => {
        setPatterns(patterns.filter(p => p.id !== id));
        // If current selected pattern is deleted, reset the field
        const currentPattern = patterns.find(p => p.id === id);
        if (currentPattern && watchPatternName === currentPattern.name) {
            setValue("patternName", "");
        }
    };

    return (
        <div className="">
            {/* Class Range Section */}
            <div className="mb-6">
                <Label className="block mb-2 text-base">Select Class Range <span className="text-destructive">*</span></Label>
                <div className="pt-6 pb-2 px-2">
                    <Slider
                        defaultValue={[1, 5]}
                        max={12}
                        min={1}
                        step={1}
                        value={sliderValue}
                        onValueChange={handleSliderChange}
                        className="w-full **:data-[slot=slider-range]:bg-pink-600 **:data-[slot=slider-thumb]:border-pink-600"
                    />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground px-2">
                    <span>Class {sliderValue[0]}</span>
                    <span>Class {sliderValue[1]}</span>
                </div>
            </div>

            {/* Pattern Selection */}
            <div className="mb-4">
                <Label className="block mb-2">
                    Exam Pattern Name <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2 items-center">
                    <div className="flex-1">
                        <Controller
                            control={control}
                            name="patternName"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Exam Pattern" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {patterns.map((pattern) => (
                                            <SelectItem key={pattern.id} value={pattern.name}>
                                                {pattern.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.patternName && (
                            <p className="text-destructive text-sm mt-1">{errors.patternName.message}</p>
                        )}
                    </div>
                    <div className="shrink-0">
                        <Button
                            type="button"
                            variant="outline"
                            className="border-pink-500 text-pink-500 hover:text-pink-600 hover:bg-pink-50 whitespace-nowrap"
                            onClick={() => setIsPatternModalOpen(true)}
                        >
                            View List
                        </Button>
                    </div>
                </div>
            </div>

            {/* Dynamic Exams List - Only show if pattern is selected */}
            {watchPatternName && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 mb-6">
                    <div className="mb-2">
                        <Label className="font-semibold text-sm mb-1 ml-1 text-gray-600">
                            Exam Types & Names
                        </Label>
                        <p className="text-sm text-gray-500 ml-1">Add exams applicable for the selected exam pattern.</p>
                    </div>

                    <div className="space-y-3 ml-1 pl-1">
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                                <div className="md:col-span-9">
                                    <Input
                                        placeholder="e.g. Unit Test 1"
                                        className="h-10"
                                        {...register(`exams.${index}.name` as const)}
                                    />
                                    {errors.exams?.[index]?.name && (
                                        <p className="text-destructive text-sm mt-1">{errors.exams[index]?.name?.message}</p>
                                    )}
                                </div>
                                <div className="md:col-span-3 flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 shrink-0"
                                        onClick={() => append({ name: "" })}
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 h-10 w-10 shrink-0"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4 mt-6">
                 <Button onClick={handleSubmit(onSubmit)} className="bg-pink-500 hover:bg-pink-600 px-8">
                    Save Setup
                </Button>
            </div>

            <ExamPatternModal 
                open={isPatternModalOpen} 
                onOpenChange={setIsPatternModalOpen}
                patterns={patterns}
                onAdd={handleAddPattern}
                onDelete={handleDeletePattern}
            />
        </div>
    );
}
