"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Mail, Phone, MapPin, Trash2, Edit3, User, School } from "lucide-react";
import api from "@/lib/api";
import { Student } from "@/lib/types";

// Shadcn Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import EditStudentModal from "./EditStudentModal";

interface Props {
  students: Student[];
  refresh: () => void;
}

export default function StudentGrid({ students, refresh }: Props) {
  const [selectedForEdit, setSelectedForEdit] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  const deleteStudent = async (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      await api.delete(`/students/${id}`);
      setViewingStudent(null);
      refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <motion.div
          key={student.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
          onClick={() => setViewingStudent(student)}
        >
          <Card className="relative overflow-hidden border-slate-200 transition-all hover:shadow-xl hover:border-primary/20">
            <div className={`h-2 w-full ${student.gender === 'MALE' ? 'bg-blue-500' : 'bg-pink-500'}`} />
            
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage src={student.profileImageUrl} />
                <AvatarFallback className="bg-slate-100">
                  <User size={20} className="text-slate-400" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold truncate text-slate-900">
                  {student.firstName} {student.lastName}
                </h3>
                <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                  {student.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail size={14} className="text-slate-400" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <School size={14} className="text-slate-400" />
                <span className="truncate">{student.institute || "No Institute"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* DETAILED VIEW DIALOG */}
      <Dialog open={!!viewingStudent} onOpenChange={() => setViewingStudent(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {viewingStudent && (
            <>
              <DialogHeader className="items-center text-center">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarImage src={viewingStudent.profileImageUrl} />
                  <AvatarFallback className="text-2xl"><User size={40}/></AvatarFallback>
                </Avatar>
                <DialogTitle className="text-2xl font-bold">
                  {viewingStudent.firstName} {viewingStudent.lastName}
                </DialogTitle>
                <DialogDescription>Student ID: #{viewingStudent.id}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Mail className="text-primary" size={18} />
                  <div className="text-sm">
                    <p className="font-medium">Email</p>
                    <p className="text-slate-500">{viewingStudent.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <Phone className="text-primary" size={18} />
                  <div className="text-sm">
                    <p className="font-medium">Phone</p>
                    <p className="text-slate-500">{viewingStudent.phoneNumber || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <MapPin className="text-primary" size={18} />
                  <div className="text-sm">
                    <p className="font-medium">Address</p>
                    <p className="text-slate-500 text-xs">{viewingStudent.address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex sm:justify-between gap-2">
                <Button 
                  variant="destructive" 
                  className="gap-2" 
                  onClick={() => deleteStudent(viewingStudent.id)}
                >
                  <Trash2 size={16} /> Delete
                </Button>
                <Button 
                  className="gap-2 bg-blue-600 hover:bg-blue-700" 
                  onClick={() => {
                    setSelectedForEdit(viewingStudent);
                    setViewingStudent(null);
                  }}
                >
                  <Edit3 size={16} /> Edit Student
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      {selectedForEdit && (
        <EditStudentModal
          isOpen={!!selectedForEdit}
          student={selectedForEdit}
          onClose={() => setSelectedForEdit(null)}
          onUpdated={refresh}
        />
      )}
    </div>
  );
}