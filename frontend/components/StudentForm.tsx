"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, CheckCircle2, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { GENDERS, CATEGORIES } from "@/lib/constants";
import { Gender, Category } from "@/lib/types";
import { toast } from "sonner";
// Shadcn Components
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  refresh: () => void;
}

export default function StudentForm({ refresh }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "MALE" as Gender,
    address: "",
    institute: "",
    category: "CS" as Category,
    profileImageUrl: "",
  });

  const submit = async () => {
    setLoading(true);
    try {
      await api.post("/students", form);
      toast.success("Student registered successfully ");
      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "MALE",
        address: "",
        institute: "",
        category: "CS",
        profileImageUrl: "",
      });
      refresh();
    } catch (error) {
      const err = error as any;
      const message =
        err?.response?.data?.message ||
        "Failed to register student. Please try again.";
      toast.error(message);
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <UserPlus size={24} />
            </div>
            <div>
              <CardTitle className="text-2xl">New Registration</CardTitle>
              <CardDescription>Fill in the details to enroll a new student.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Section */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Ayush"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Chaurasiya"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>

            {/* Contact Section */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="ayush@university.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91 8826230716"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              />
            </div>

            {/* Academic Section */}
            <div className="space-y-2">
              <Label>Category / Department</Label>
              <Select
                value={form.category}
                onValueChange={(val) => setForm({ ...form, category: val as Category })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={form.gender}
                onValueChange={(val) => setForm({ ...form, gender: val as Gender })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Profile Image */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="profileImageUrl">Profile Image URL</Label>
              <Input
                id="profileImageUrl"
                placeholder="https://example.com/profile.jpg"
                value={form.profileImageUrl}
                onChange={(e) =>
                  setForm({ ...form, profileImageUrl: e.target.value })
                }
              />
            </div>
            {form.profileImageUrl && (
              <div className="flex justify-center mt-3">
                <img
                  src={form.profileImageUrl}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}

            {/* Detailed Info */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="institute">Institute Name</Label>
              <Input
                id="institute"
                placeholder="Global Institute of Technology"
                value={form.institute}
                onChange={(e) => setForm({ ...form, institute: e.target.value })}
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="address">Permanent Address</Label>
              <Input
                id="address"
                placeholder="Street, City, State, Zip"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </div>

          <Button
            onClick={submit}
            className="w-full h-12 text-lg font-semibold gap-2 transition-all active:scale-95"
            disabled={loading || !form.firstName || !form.email}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <><CheckCircle2 size={20} /> Complete Registration</>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}