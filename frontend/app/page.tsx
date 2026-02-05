"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; 
import {
  Users,
  UserPlus,
  GraduationCap,
  LayoutDashboard,
  Cpu,
  Zap,
  Wrench,
  HardHat,
  Menu, // New icon for mobile toggle
} from "lucide-react";

import api from "@/lib/api";
import { Student, PageResponse } from "@/lib/types";

// Shadcn
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Ensure these are installed

// Custom Components
import Filters from "@/components/Filter";
import StudentForm from "@/components/StudentForm";
import Pagination from "@/components/Pagination";
import StudentGrid from "@/components/StudentGrid";
import DashboardPage from "@/app/dashboard/page";

type TabType = "dashboard" | "all" | "add";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filters
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const fetchStudents = useCallback(async () => {
    try {
      let endpoint = "/students/search";
      let params: any = { page, size, sortBy, direction };

      if (selectedCategory) {
        endpoint = `/students/category/${selectedCategory}`;
      } else {
        params.keyword = keyword;
      }

      const res = await api.get<PageResponse<Student>>(endpoint, { params });
      setStudents(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  }, [page, size, keyword, selectedCategory, sortBy, direction]);

  useEffect(() => {
    if (activeTab === "all") {
      fetchStudents();
    }
  }, [fetchStudents, activeTab]);

  const handleCategory = (cat: string) => {
    setActiveTab("all");
    setSelectedCategory(cat);
    setKeyword("");
    setPage(0);
    setIsMobileMenuOpen(false); // Close menu on mobile after selection
  };

  // Reusable Navigation Content
  const SidebarContent = () => (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <GraduationCap className="text-white" />
        </div>
        <h2 className="text-xl font-bold">EduStream</h2>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-xs text-slate-400 px-2 mt-4 uppercase tracking-wider">Main</p>
        <Button
          variant={activeTab === "dashboard" ? "secondary" : "ghost"}
          onClick={() => { setActiveTab("dashboard"); setIsMobileMenuOpen(false); }}
          className="justify-start gap-3"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Button>
        <Button
          variant={activeTab === "all" ? "secondary" : "ghost"}
          onClick={() => {
            setActiveTab("all");
            setSelectedCategory(null);
            setKeyword("");
            setIsMobileMenuOpen(false);
          }}
          className="justify-start gap-3"
        >
          <Users size={18} /> Full Data
        </Button>
        <Button
          variant={activeTab === "add" ? "secondary" : "ghost"}
          onClick={() => { setActiveTab("add"); setIsMobileMenuOpen(false); }}
          className="justify-start gap-3"
        >
          <UserPlus size={18} /> Add Student
        </Button>

        <Separator className="my-4" />
        <p className="text-xs text-slate-400 px-2 uppercase tracking-wider">Departments</p>
        <Button variant="ghost" onClick={() => handleCategory("CS")} className="justify-start gap-3">
          <Cpu size={16} /> CS
        </Button>
        <Button variant="ghost" onClick={() => handleCategory("IT")} className="justify-start gap-3">
          <Cpu size={16} /> IT
        </Button>
        <Button variant="ghost" onClick={() => handleCategory("ELECTRICAL")} className="justify-start gap-3">
          <Zap size={16} /> Electrical
        </Button>
        <Button variant="ghost" onClick={() => handleCategory("MECHANICAL")} className="justify-start gap-3">
          <Wrench size={16} /> Mechanical
        </Button>
        <Button variant="ghost" onClick={() => handleCategory("CIVIL")} className="justify-start gap-3">
          <HardHat size={16} /> Civil
        </Button>
      </nav>

      <div className="bg-slate-900 text-white rounded-xl p-4 mt-auto">
        <p className="text-xs text-slate-400">Loaded Records</p>
        <p className="text-2xl font-bold">{students.length}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 border-r bg-white p-6 flex-col">
        <SidebarContent />
      </aside>

      {/* MAIN SECTION */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* MOBILE MENU TRIGGER */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-6">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
            
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 capitalize truncate max-w-[150px] md:max-w-none">
              {activeTab === "dashboard"
                ? "Dashboard"
                : activeTab === "all"
                ? selectedCategory || keyword || "Full Data"
                : "Add Student"}
            </h1>
          </div>

          {activeTab === "all" && (
            <div className="flex items-center">
                <Filters
                  keyword={keyword}
                  setKeyword={(v) => {
                    setKeyword(v);
                    setSelectedCategory(null);
                  }}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  direction={direction}
                  setDirection={setDirection}
                  size={size}
                  setSize={setSize}
                />
            </div>
          )}
        </header>

        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <DashboardPage />
              </motion.div>
            )}

            {activeTab === "all" && (
              <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {students.length > 0 ? (
                  <>
                    <StudentGrid students={students} refresh={fetchStudents} />
                    <div className="mt-8 flex justify-center">
                        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 md:py-20 text-center">
                    <div className="w-48 h-48 md:w-80 md:h-80">
                      <DotLottieReact
                        src="https://lottie.host/7f1a31ae-715f-4ed4-8fdb-f0030e1ac8ac/6r310UrBBL.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    <p className="text-slate-500 font-medium mt-4">No students found.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "add" && (
              <motion.div key="add" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="max-w-2xl mx-auto">
                    <StudentForm
                    refresh={() => {
                        fetchStudents();
                        setActiveTab("all");
                    }}
                    />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}