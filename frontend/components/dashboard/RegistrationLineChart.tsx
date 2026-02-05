"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { MonthlyTrend } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const MONTHS = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function RegistrationLineChart({ data }: { data: MonthlyTrend[] }) {
  const formatted = data.map((d) => ({
    month: MONTHS[d.month],
    count: d.count,
  }));

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm h-[350px] flex flex-col group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Registration Trend
          </h3>
          <p className="text-2xl font-bold text-slate-900">Student Influx</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
          <TrendingUp size={14} />
          <span>Real-time</span>
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formatted} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
            />
            
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCount)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// Custom Tooltip with Glassmorphism
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 shadow-xl rounded-xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-sm font-bold text-slate-900">
            {payload[0].value} <span className="text-slate-500 font-medium">Students</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};