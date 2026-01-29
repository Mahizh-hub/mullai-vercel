"use client";

import { useState } from "react";
import WizardTabs from "./WizardTabs";
import PageHeader from "../PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import {
  mockClasses,
  mockCommonSubjects,
  mockGroupedSubjects,
  mockElectiveGroups,
} from "./data";
import SubjectPill, { GroupedSubjects } from "./SubjectPill";
import GroupCard from "./GroupCard";

const SubdivisionItem = ({
  subdivision,
  subjectId,
  subjectType,
  onAdd,
  onRemove,
  onChange,
}: {
  subdivision: Subdivision;
  subjectId: string;
  subjectType: "common" | "elective";
  onAdd: (subjectId: string, parentId: string) => void;
  onRemove: (subjectId: string, subId: string) => void;
  onChange: (subjectId: string, subId: string, newName: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={subdivision.name}
          onChange={(e) => onChange(subjectId, subdivision.id, e.target.value)}
          placeholder="Subdivision"
          className="flex-1"
        />
        {subjectType === "elective" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAdd(subjectId, subdivision.id)}
          >
            <Plus className="size-4" />
          </Button>
        )}
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onRemove(subjectId, subdivision.id)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      {subdivision.subdivisions.length > 0 && (
        <div className="ml-8 space-y-2 border-l-2 border-gray-200 pl-4">
          {subdivision.subdivisions.map((sub) => (
            <SubdivisionItem
              key={sub.id}
              subdivision={sub}
              subjectId={subjectId}
              subjectType={subjectType}
              onAdd={onAdd}
              onRemove={onRemove}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const tabs = [
  { id: "create-subjects", label: "Create Class Subjects" },
  { id: "configure-electives", label: "Configure Electives" },
  { id: "assign-sections", label: "Assign to Sections" },
];

type Subdivision = {
  id: string;
  name: string;
  subdivisions: Subdivision[];
};

type SubjectEntry = {
  id: string;
  name: string;
  type: "common" | "elective";
  subdivisions: Subdivision[];
};

type ElectiveGroupEntry = {
  id: string;
  name: string;
  subjects: string[];
};

export default function SubjectSetupForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");

  // Tab 1 state: Create Class Subjects
  const [subjects, setSubjects] = useState<SubjectEntry[]>([]);

  // Tab 2 state: Configure Electives
  const [electiveGroups, setElectiveGroups] = useState<ElectiveGroupEntry[]>([
    { id: "1", name: "", subjects: [""] },
  ]);

  // Tab 3 state: Section Assignments
  const [sectionAssignments, setSectionAssignments] = useState<
    Record<string, string>
  >({});

  const selectedClassData = mockClasses.find((c) => c.id === selectedClass);

  // Tab 1: Add Subject
  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: "",
        type: "common",
        subdivisions: [],
      },
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleSubjectChange = (
    id: string,
    field: keyof SubjectEntry,
    value: string | Subdivision[],
  ) => {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const addSubdivisionToTree = (
    subdivisions: Subdivision[],
    parentId: string,
    newSub: Subdivision,
  ): Subdivision[] => {
    return subdivisions.map((sub) => {
      if (sub.id === parentId) {
        return { ...sub, subdivisions: [...sub.subdivisions, newSub] };
      }
      if (sub.subdivisions.length > 0) {
        return {
          ...sub,
          subdivisions: addSubdivisionToTree(
            sub.subdivisions,
            parentId,
            newSub,
          ),
        };
      }
      return sub;
    });
  };

  const removeSubdivisionFromTree = (
    subdivisions: Subdivision[],
    targetId: string,
  ): Subdivision[] => {
    return subdivisions
      .filter((sub) => sub.id !== targetId)
      .map((sub) => ({
        ...sub,
        subdivisions: removeSubdivisionFromTree(sub.subdivisions, targetId),
      }));
  };

  const updateSubdivisionNameRecursive = (
    subdivisions: Subdivision[],
    targetId: string,
    newName: string,
  ): Subdivision[] => {
    return subdivisions.map((sub) => {
      if (sub.id === targetId) return { ...sub, name: newName };
      return {
        ...sub,
        subdivisions: updateSubdivisionNameRecursive(
          sub.subdivisions,
          targetId,
          newName,
        ),
      };
    });
  };

  const handleAddSubdivision = (subjectId: string, parentId?: string) => {
    const newSub: Subdivision = {
      id: Date.now().toString(),
      name: "",
      subdivisions: [],
    };

    setSubjects(
      subjects.map((s) => {
        if (s.id !== subjectId) return s;
        if (!parentId) {
          // Add to root level
          return { ...s, subdivisions: [...s.subdivisions, newSub] };
        }
        // Add to nested level
        return {
          ...s,
          subdivisions: addSubdivisionToTree(
            s.subdivisions,
            parentId,
            newSub,
          ),
        };
      }),
    );
  };

  const handleRemoveSubdivision = (subjectId: string, subId: string) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              subdivisions: removeSubdivisionFromTree(s.subdivisions, subId),
            }
          : s,
      ),
    );
  };

  const handleSubdivisionNameChange = (
    subjectId: string,
    subId: string,
    newName: string,
  ) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              subdivisions: updateSubdivisionNameRecursive(
                s.subdivisions,
                subId,
                newName,
              ),
            }
          : s,
      ),
    );
  };

  // Tab 2: Elective Groups
  const handleAddGroup = () => {
    setElectiveGroups([
      ...electiveGroups,
      { id: Date.now().toString(), name: "", subjects: [""] },
    ]);
  };

  const handleRemoveGroup = (id: string) => {
    setElectiveGroups(electiveGroups.filter((g) => g.id !== id));
  };

  const handleGroupNameChange = (id: string, name: string) => {
    setElectiveGroups(
      electiveGroups.map((g) => (g.id === id ? { ...g, name } : g)),
    );
  };

  const handleAddSubjectToGroup = (groupId: string) => {
    setElectiveGroups(
      electiveGroups.map((g) =>
        g.id === groupId ? { ...g, subjects: [...g.subjects, ""] } : g,
      ),
    );
  };

  const handleRemoveSubjectFromGroup = (groupId: string) => {
    setElectiveGroups(
      electiveGroups.map((g) =>
        g.id === groupId && g.subjects.length > 1
          ? { ...g, subjects: g.subjects.slice(0, -1) }
          : g,
      ),
    );
  };

  const handleGroupSubjectChange = (
    groupId: string,
    index: number,
    value: string,
  ) => {
    setElectiveGroups(
      electiveGroups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              subjects: g.subjects.map((s, i) => (i === index ? value : s)),
            }
          : g,
      ),
    );
  };

  // Tab 3: Section Assignment
  const handleSectionToggle = (section: string, groupId: string) => {
    setSectionAssignments((prev) => {
      if (prev[section] === groupId) {
        // Unassign
        const { [section]: _, ...rest } = prev;
        return rest;
      }
      // Assign to this group
      return { ...prev, [section]: groupId };
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", {
      classId: selectedClass,
      subjects,
      electiveGroups,
      sectionAssignments,
    });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <WizardTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="px-3 pb-3">
        {/* Tab 1: Create Class Subjects */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <PageHeader
              title="Create Class Subjects"
              subtitle="Add and manage subjects for each class or grade."
            />

            <div className="space-y-4">
              <div>
                <Label>
                  Class / Grade <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject List */}
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        value={subject.name}
                        onChange={(e) =>
                          handleSubjectChange(
                            subject.id,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="Ex. Science"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveSubject(subject.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>

                    {/* Common/Elective toggle */}
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`type-${subject.id}`}
                          value="common"
                          checked={subject.type === "common"}
                          onChange={() =>
                            handleSubjectChange(subject.id, "type", "common")
                          }
                          className="accent-pink-500"
                        />
                        <span className="text-sm">Common</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`type-${subject.id}`}
                          value="elective"
                          checked={subject.type === "elective"}
                          onChange={() =>
                            handleSubjectChange(subject.id, "type", "elective")
                          }
                          className="accent-pink-500"
                        />
                        <span className="text-sm">Elective</span>
                      </label>
                    </div>

                    {/* Recursive Subdivisions */}
                    {subject.subdivisions.length > 0 && (
                      <div className="ml-6 space-y-2 border-l-2 border-gray-200 pl-4">
                        {subject.subdivisions.map((sub) => (
                          <SubdivisionItem
                            key={sub.id}
                            subdivision={sub}
                            subjectId={subject.id}
                            subjectType={subject.type}
                            onAdd={(sId, pId) => handleAddSubdivision(sId, pId)}
                            onRemove={handleRemoveSubdivision}
                            onChange={handleSubdivisionNameChange}
                          />
                        ))}
                      </div>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddSubdivision(subject.id)}
                    >
                      <Plus className="size-4 mr-1" />
                      Create a Subdivision
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add Subject Button */}
              {selectedClass && (
                <Button
                  type="button"
                  onClick={handleAddSubject}
                  className="w-full"
                >
                  <Plus className="size-4 mr-2" />
                  Create Subject
                </Button>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" onClick={() => setActiveTab(1)}>
                Save & Continue
              </Button>
            </div>
          </div>
        )}

        {/* Tab 2: Configure Electives & Groups */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <PageHeader
              title="Configure Electives & Groups"
              subtitle="Set up elective subjects and groups like +1 and +2."
            />

            <div className="space-y-4">
              <div>
                <Label>Select Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Common Subjects Pills */}
              <div>
                <h4 className="text-base font-semibold mb-2">
                  Common Subjects
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {mockCommonSubjects.map((subject) => (
                    <SubjectPill
                      key={subject.id}
                      label={subject.name}
                      color={subject.color}
                    />
                  ))}
                  {mockGroupedSubjects.map((group) => (
                    <GroupedSubjects key={group.id} subjects={group.subjects} />
                  ))}
                </div>
              </div>

              {/* Elective Groups */}
              <div>
                <h4 className="text-base font-semibold mb-2">
                  Elective Subjects
                </h4>
                <div className="space-y-4">
                  {electiveGroups.map((group, groupIndex) => (
                    <div key={group.id} className="card-nested">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="text-sm font-semibold">
                          Elective Subject(s) Category {groupIndex + 1}
                        </h5>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveGroup(group.id)}
                        >
                          Delete Table
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-[500px] w-full text-sm rounded-md overflow-hidden table-fixed">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="text-left p-2 w-[150px]">
                                Group Name
                              </th>
                              <th className="text-left p-2">Subjects</th>
                              <th className="text-right p-2 w-[100px]">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 align-top w-[150px]">
                                <Input
                                  value={group.name}
                                  onChange={(e) =>
                                    handleGroupNameChange(
                                      group.id,
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Group name"
                                />
                              </td>
                              <td className="p-2 align-top">
                                <div className="space-y-2">
                                  {group.subjects.map((subject, subIndex) => (
                                    <Input
                                      key={subIndex}
                                      value={subject}
                                      onChange={(e) =>
                                        handleGroupSubjectChange(
                                          group.id,
                                          subIndex,
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Select subject"
                                    />
                                  ))}
                                </div>
                              </td>
                              <td className="p-2 w-[100px]">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      handleAddSubjectToGroup(group.id)
                                    }
                                    title="Add Subject"
                                  >
                                    <Plus className="size-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      handleRemoveSubjectFromGroup(group.id)
                                    }
                                    title="Delete Subject"
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddGroup}
                  className="mt-4"
                >
                  <Plus className="size-4 mr-2" />
                  Create Category Group
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab(0)}
              >
                Back
              </Button>
              <Button type="button" onClick={() => setActiveTab(2)}>
                Save & Continue
              </Button>
            </div>
          </div>
        )}

        {/* Tab 3: Assign to Sections */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <PageHeader
              title="Assign Subjects to Sections"
              subtitle="Assign subjects to the required class sections."
            />

            <div className="space-y-4">
              <div>
                <Label>Select Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Common Subjects Pills */}
              <div>
                <h4 className="text-base font-semibold mb-2">
                  Common Subjects
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {mockCommonSubjects.map((subject) => (
                    <SubjectPill
                      key={subject.id}
                      label={subject.name}
                      color={subject.color}
                    />
                  ))}
                  {mockGroupedSubjects.map((group) => (
                    <GroupedSubjects key={group.id} subjects={group.subjects} />
                  ))}
                </div>
              </div>

              {/* Group Cards with Section Assignment */}
              <div>
                <h4 className="text-base font-semibold mb-2">
                  Configure Elective Subjects to the particular Sections
                </h4>
                <div className="space-y-4">
                  {mockElectiveGroups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      sections={selectedClassData?.sections || []}
                      sectionAssignments={sectionAssignments}
                      onSectionToggle={handleSectionToggle}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab(1)}
              >
                Back
              </Button>
              <Button type="submit">Save & Continue</Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
