"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
Mail, School, Trash2, Edit3,
Phone, MapPin, Info, MousePointer2
} from "lucide-react";
import api from "@/lib/api";
import { Student } from "@/lib/types";

// Shadcn & Custom Components
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import EditStudentModal from "./EditStudentModal";
import { Button } from "./ui/button";
import { toast } from "sonner";
interface Props {
students: Student[];
refresh: () => void;
}

export default function StudentGrid({ students, refresh }: Props) {
const [selectedForEdit, setSelectedForEdit] = useState<Student | null>(null);
const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

const getAvatarUrl = (first: string, last: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${first} ${last}&backgroundColor=f1f5f9,e2e8f0,cbd5e1&fontSize=40&fontWeight=600`;

const deleteStudent = async (id: number) => {
    const confirmed = window.confirm("Delete this student record?");
    if (confirmed) {
         toast.success("Student deleted successfully 🎉");
        await api.delete(`/students/${id}`);
        setViewingStudent(null);
        refresh();
    }
};

return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {students.map((student) => (
            <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onClick={() => setViewingStudent(student)}
                className="relative group cursor-pointer"
            >
                <Card className="overflow-hidden border-slate-200/50 bg-white transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/5 group-hover:border-blue-200">
                    {/* Interactive Hover Overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300 z-10 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-blue-600 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MousePointer2 size={14} />
                            View Profile
                        </motion.div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 rounded-2xl border-2 border-slate-50 group-hover:border-blue-100 transition-colors">
                                <AvatarImage src={getAvatarUrl(student.firstName, student.lastName)} />
                                <AvatarFallback className="bg-slate-100">{student.firstName[0]}</AvatarFallback>
                            </Avatar>

                            <div className="space-y-1 flex-1">
                                <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none px-2 py-0 text-[10px] uppercase font-bold tracking-wider">
                                    {student.category}
                                </Badge>
                                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                                    {student.firstName} {student.lastName}
                                </h3>
                                <p className="text-sm text-slate-400 font-medium truncate italic">
                                    {student.institute}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 text-slate-500">
                                <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-sm truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500">
                                <div className="text-slate-300 group-hover:text-emerald-400 transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span className="text-sm">{student.phoneNumber || "No contact"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Subtle Footer */}
                    <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #{student.id}</span>
                        <Info size={14} className="text-slate-300" />
                    </div>
                </Card>
            </motion.div>
        ))}

        {/* THE DIALOG REMAINS SIMILAR BUT WITH REFINED STYLING */}
        <Dialog open={!!viewingStudent} onOpenChange={() => setViewingStudent(null)}>
            <DialogContent className="max-w-md p-0 overflow-hidden rounded-[2rem] border-none">
                {viewingStudent && (
                    <div className="flex flex-col">
                        <div className="bg-slate-900 p-10 text-white relative">
                            <div className="absolute top-4 right-4 opacity-20"><School size={80} /></div>
                            <div className="relative z-10 flex flex-col items-center">
                                <Avatar className="h-28 w-28 border-4 border-white/10 shadow-2xl mb-4">
                                    <AvatarImage src={getAvatarUrl(viewingStudent.firstName, viewingStudent.lastName)} />
                                    <AvatarFallback>{viewingStudent.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <DialogTitle className="text-3xl font-extrabold tracking-tight">
                                    {viewingStudent.firstName} {viewingStudent.lastName}
                                </DialogTitle>
                                <Badge className="mt-2 bg-blue-500 hover:bg-blue-500 uppercase text-[10px]">{viewingStudent.category}</Badge>
                            </div>
                        </div>

                        <div className="p-8 bg-white space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <DetailRow icon={<Mail />} label="Email Address" value={viewingStudent.email} color="blue" />
                                <DetailRow icon={<Phone />} label="Phone Number" value={viewingStudent.phoneNumber} color="emerald" />
                                <DetailRow icon={<School />} label="Institution" value={viewingStudent.institute} color="orange" />
                                <DetailRow icon={<MapPin />} label="Address" value={viewingStudent.address} color="purple" isMultiLine />
                            </div>
                        </div>

                        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                            <Button
                                variant="ghost"
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                onClick={() => deleteStudent(viewingStudent.id)}
                            >
                                <Trash2 size={18} />
                            </Button>
                            <Button
                                className="flex-1 bg-slate-900 hover:bg-black text-white rounded-xl h-12 font-bold shadow-lg"
                                onClick={() => { setSelectedForEdit(viewingStudent); setViewingStudent(null); }}
                            >
                                <Edit3 size={18} className="mr-2" /> Edit Profile
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>

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

// Reusable Detail Component for the Modal
function DetailRow({ icon, label, value, color, isMultiLine = false }: any) {
const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
};

return (
    <div className="flex items-start gap-4 group">
        <div className={`mt-1 p-2 rounded-xl transition-transform group-hover:scale-110 ${colorMap[color]}`}>
            {cloneIcon(icon, 18)}
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className={`text-sm text-slate-700 font-semibold ${isMultiLine ? "leading-relaxed" : ""}`}>
                {value || "Not provided"}
            </p>
        </div>
    </div>
);
}

function cloneIcon(icon: any, size: number) {
return { ...icon, props: { ...icon.props, size } };
}