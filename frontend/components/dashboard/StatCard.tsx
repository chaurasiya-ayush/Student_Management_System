"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
  trend?: string;
  description?: string;
}

export default function StatCard({ title, value, icon, trend, description }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-slate-200/60 bg-white/80 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-all group">
        {/* Subtle background decoration */}
        <div className="absolute -right-2 -top-2 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
           {icon}
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {value}
              </h2>
              {trend && (
                <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  <ArrowUpRight size={10} strokeWidth={3} />
                  {trend}
                </span>
              )}
            </div>
          </div>

          {icon && (
            <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-100 group-hover:border-blue-500">
              {icon}
            </div>
          )}
        </div>

        {description && (
          <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
             <TrendingUp size={12} className="text-blue-500" />
             {description}
          </p>
        )}

        {/* Bottom progress-like bar for visual polish */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-blue-500 opacity-20 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </Card>
    </motion.div>
  );
}