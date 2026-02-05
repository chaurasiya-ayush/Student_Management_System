"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { CountDto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Landmark } from "lucide-react";

export default function InstituteBarChart({ data }: { data: CountDto[] }) {
  // Sort data to show highest at the top for better readability
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm h-[350px] flex flex-col group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Distribution
          </h3>
          <p className="text-2xl font-bold text-slate-900">Institute-wise</p>
        </div>
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <Landmark size={20} />
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            barSize={20}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#059669" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              horizontal={false} 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
            />

            <XAxis 
              type="number" 
              hide 
            />

            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              width={100}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="count"
              fill="url(#barGradient)"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? "url(#barGradient)" : "#10b981"}
                  fillOpacity={index === 0 ? 1 : 0.6}
                  className="transition-all duration-300 hover:fill-opacity-100"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 shadow-xl rounded-xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <p className="text-sm font-bold text-slate-900">
            {payload[0].value} <span className="text-slate-500 font-medium">Students</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};