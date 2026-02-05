"use client";

import { useState } from "react";
import { Save, User, Mail, Phone, MapPin, School } from "lucide-react";
import api from "@/lib/api";
import { Student, StudentPatchRequest } from "@/lib/types";
import { GENDERS } from "@/lib/constants";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area"; // Optional: Shadcn ScrollArea

interface Props {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditStudentModal({
  student,
  isOpen,
  onClose,
  onUpdated,
}: Props) {
  const [form, setForm] = useState<StudentPatchRequest>({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phoneNumber: student.phoneNumber,
    address: student.address,
    institute: student.institute,
    profileImageUrl: student.profileImageUrl,
    gender: student.gender,
    category: student.category,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof StudentPatchRequest, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const payload: Partial<StudentPatchRequest> = {};
      
      (Object.keys(form) as (keyof StudentPatchRequest)[]).forEach((key) => {
        if (form[key] !== (student as any)[key]) {
          (payload as any)[key] = form[key];
        }
      });

      if (Object.keys(payload).length > 0) {
        await api.patch(`/students/${student.id}`, payload);
        toast.success("Student updated successfully ✅");
        onUpdated();
      }
      onClose();
    } catch (error: any) {
      const message = error?.response?.data?.message || "Update failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* w-[95vw] ensures modal doesn't hit screen edges on small mobile.
        sm:max-w-[550px] caps the width on PC.
      */}
      <DialogContent className="w-[95vw] sm:max-w-[550px] p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <User className="text-primary" /> Edit Profile
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable area for small screens */}
        <ScrollArea className="max-h-[70vh] sm:max-h-none overflow-y-auto px-6 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
            {/* Name Fields */}
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={form.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={form.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            {/* Email - Full width on all devices */}
            <div className="space-y-2 sm:col-span-2">
              <Label className="flex items-center gap-2">
                <Mail size={14} /> Email Address
              </Label>
              <Input
                type="email"
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone size={14} /> Phone
              </Label>
              <Input
                value={form.phoneNumber || ""}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select 
                value={form.gender} 
                onValueChange={(val) => handleChange("gender", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Institute */}
            <div className="space-y-2 sm:col-span-2">
              <Label className="flex items-center gap-2">
                <School size={14} /> Institute
              </Label>
              <Input
                value={form.institute || ""}
                onChange={(e) => handleChange("institute", e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="space-y-2 sm:col-span-2">
              <Label className="flex items-center gap-2">
                <MapPin size={14} /> Address
              </Label>
              <Input
                value={form.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-2 flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading} className="w-full sm:w-auto gap-2">
            {loading ? "Saving..." : <><Save size={16} /> Save Changes</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}