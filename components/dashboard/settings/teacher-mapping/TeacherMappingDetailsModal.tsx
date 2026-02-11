"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TeacherMappingItem } from "@/components/dashboard/settings/types";

interface TeacherMappingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mapping: TeacherMappingItem | null;
}

export default function TeacherMappingDetailsModal({
  isOpen,
  onClose,
  mapping,
}: TeacherMappingDetailsModalProps) {
  if (!mapping) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl p-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Subject–Teacher Mapping Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="bg-white rounded-lg">
            {/* Header Info Section */}
            <div className="bg-gray-50/50 rounded-xl p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between border-b pb-6 mb-6 gap-4">
                <div className="space-y-6 flex-1">
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Class & Section</span>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {mapping.class} <span className="text-gray-400">&quot;{mapping.section}&quot;</span>
                    </h3>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Group</span>
                    <h3 className="text-2xl font-semibold text-gray-900">{mapping.group}</h3>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Class Teacher</span>
                    <h3 className="text-2xl font-semibold text-gray-900">{mapping.classTeacher}</h3>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-[85px] h-[85px] rounded-full overflow-hidden mx-auto mb-2 border-2 border-white shadow-sm">
                    {/* Placeholder for user image - using generic avatar if asset not found */}
                    <Image 
                      src="/teacher.svg" 
                      alt={mapping.classTeacher}
                      width={85}
                      height={85}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-primary font-medium">{mapping.classTeacher}</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="flex flex-wrap items-center gap-8 md:gap-16">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full">
                     <Image src="/books.svg" alt="Subjects" width={24} height={24} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Total Subjects</span>
                    <span className="text-xl font-semibold text-gray-700">{mapping.totalSubjects}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-full">
                     <Image src="/teacher.svg" alt="Teachers" width={24} height={24} className="w-6 h-6" />
                   </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Total Teacher</span>
                    <span className="text-xl font-semibold text-gray-700">{mapping.subjectTeachers}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Table Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Subjects & Teachers</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-gray-100">
                    {/* Mock rows recreating the design structure - 2 columns per row */}
                    {/* Row 1 */}
                    <tr>
                      <td className="p-4 text-gray-900 font-medium w-1/4">Class Teacher</td>
                      <td className="p-4 text-right w-1/4">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-gray-900">S. Ramesh</span>
                           <Image src="/teacher.svg" alt="Teacher" width={32} height={32} className="rounded-full" />
                        </div>
                      </td>
                      <td className="p-4 text-gray-900 font-medium border-l w-1/4">English</td>
                      <td className="p-4 text-right w-1/4">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-gray-900">Anitha Devi</span>
                          <Image src="/teacher.svg" alt="Teacher" width={32} height={32} className="rounded-full" />
                        </div>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr>
                      <td className="p-4 text-gray-900 font-medium">Maths</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-gray-900">Karthik Raj</span>
                          <Image src="/teacher.svg" alt="Teacher" width={32} height={32} className="rounded-full" />
                        </div>
                      </td>
                      <td className="p-4 text-gray-900 font-medium border-l">Social Science</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-gray-900">Meena Kumari</span>
                          <Image src="/teacher.svg" alt="Teacher" width={32} height={32} className="rounded-full" />
                        </div>
                      </td>
                    </tr>
                     {/* Row 3 */}
                    <tr>
                      <td className="p-4 text-gray-900 font-medium">Science · Physics (Theory)</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-gray-900">Vijay Anand</span>
                           <Image src="/teacher.svg" alt="Teacher" width={32} height={32} className="rounded-full" />
                        </div>
                      </td>
                      <td className="p-4 text-gray-900 font-medium border-l">Science · Physics (Practical)</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <span className="text-gray-900">Prakash Kumar</span>
                           <Image src="/teacher.svg" alt="Teacher" width={32} height={32} className="rounded-full" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <Button variant="destructive" onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">
            Close
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90">
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
