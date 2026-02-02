"use client";

import { useMemo, useState } from "react";
import { Eye, Trash2, Pencil } from "lucide-react";
import { TeacherMappingItem } from "../types";
import { DataTable, DataTableColumn } from "../../DataTable";
import PageHeader from "../../PageHeader";
import { Button } from "@/components/ui/button";
import TeacherMappingDetailsModal from "./TeacherMappingDetailsModal";

interface TeacherMappingListProps {
  mappings: TeacherMappingItem[];
}

export default function TeacherMappingList({ mappings }: TeacherMappingListProps) {
  const [selectedMapping, setSelectedMapping] = useState<TeacherMappingItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (mapping: TeacherMappingItem) => {
    setSelectedMapping(mapping);
    setIsModalOpen(true);
  };

  const columns: DataTableColumn<TeacherMappingItem>[] = useMemo(
    () => [
      {
        key: "class",
        header: "Class",
      },
      {
        key: "section",
        header: "Sections",
      },
      {
        key: "group",
        header: "Group",
      },
      {
        key: "classTeacher",
        header: "Class Teacher",
      },
      {
        key: "totalSubjects",
        header: "Total Subjects",
      },
      {
        key: "subjectTeachers",
        header: "Subject Teachers",
      },
      {
        key: "actions" as keyof TeacherMappingItem, // specialized key for actions
        header: "Action",
        align: "right",
        cell: (row) => (
          <div className="flex items-center justify-end gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                className="p-1 hover:bg-gray-100 rounded h-auto w-auto"
                onClick={() => handleView(row)}
            >
              <Eye className="size-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="p-1 hover:bg-gray-100 rounded h-auto w-auto">
               <Pencil className="size-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="p-1 hover:bg-gray-100 rounded h-auto w-auto">
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="card-base">
       <PageHeader
        title="Subject Teacher Mapping List"
        subtitle="Manage teacher assignments for subjects"
        actionHref="/dashboard/settings/teacher-mapping/create"
        actionLabel="Teacher Mapping"
        className="mb-6"
      />
      <DataTable
        data={mappings}
        columns={columns}
        rowKeyAction={(row) => row.id}
      />
      <TeacherMappingDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mapping={selectedMapping}
      />
    </div>
  );
}
