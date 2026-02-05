"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, TrendingUp, Landmark, Layers, 
  RefreshCcw 
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { CountDto, MonthlyTrend } from "@/lib/types";

import StatCard from "@/components/dashboard/StatCard";
import GenderPieChart from "@/components/dashboard/GenderPieChart";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import InstituteBarChart from "@/components/dashboard/InstituteBarChart";
import RegistrationLineChart from "@/components/dashboard/RegistrationLineChart";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [gender, setGender] = useState<CountDto[]>([]);
  const [category, setCategory] = useState<CountDto[]>([]);
  const [institute, setInstitute] = useState<CountDto[]>([]);
  const [trend, setTrend] = useState<MonthlyTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [t, g, c, i, tr] = await Promise.all([
        api.get("/dashboard/total-students"),
        api.get("/dashboard/gender-count"),
        api.get("/dashboard/category-count"),
        api.get("/dashboard/institute-count"),
        api.get("/dashboard/registration-trend", { params: { year: new Date().getFullYear() } }),
      ]);
      
      setTotal(t.data);
      setGender(g.data);
      setCategory(c.data);
      setInstitute(i.data);
      setTrend(tr.data);
      toast.success("Dashboard synced");
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 space-y-6 md:space-y-8 bg-slate-50/50 min-h-screen"
    >
      {/* HEADER SECTION - Stacked on mobile, row on desktop */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="text-sm text-slate-500">Real-time data from all departments.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchData} 
          disabled={isLoading}
          className="w-full sm:w-auto rounded-xl bg-white shadow-sm border-slate-200"
        >
          <RefreshCcw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* KPI CARDS - 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <StatCard title="Total Students" value={total} icon={<Users className="text-blue-600" />} trend="+12.5%" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Active Depts" value={category.length} icon={<Layers className="text-purple-600" />} />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Partner Inst." value={institute.length} icon={<Landmark className="text-emerald-600" />} />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Growth Trend" value="84%" icon={<TrendingUp className="text-orange-600" />} />
        </motion.div>
      </div>

      {/* SECONDARY CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="w-full overflow-hidden">
          <CategoryBarChart data={category} />
        </motion.div>
        <motion.div variants={item} className="w-full overflow-hidden">
          <InstituteBarChart data={institute} />
        </motion.div>
      </div>

      {/* TREND & GENDER - Trend takes full width on mobile/tablet, 2/3 on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 w-full overflow-hidden">
          <RegistrationLineChart data={trend} />
        </motion.div>
        <motion.div variants={item} className="w-full overflow-hidden">
          <GenderPieChart data={gender} />
        </motion.div>
      </div>
    </motion.div>
  );
}