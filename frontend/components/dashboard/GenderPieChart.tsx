"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { CountDto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Users2 } from "lucide-react";

// Professional, high-contrast palette
const COLORS = ["#3b82f6", "#f472b6", "#a855f7"];

export default function GenderPieChart({ data }: { data: CountDto[] }) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm h-[350px] flex flex-col group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Demographics
          </h3>
          <p className="text-2xl font-bold text-slate-900">Gender Identity</p>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Users2 size={20} />
        </div>
      </div>

      <div className="flex-1 w-full relative">
        {/* Center Label for Donut Chart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-900">{total}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            Total
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius={70} // Creates the Donut hole
              outerRadius={90}
              paddingAngle={5} // Adds gaps between segments
              stroke="none"
              animationDuration={1500}
            >
              {data.map((entry, i) => (
                <Cell 
                  key={`cell-${i}`} 
                  fill={COLORS[i % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity outline-none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Inline Legend */}
      <div className="flex justify-center gap-4 mt-2">
        {data.map((entry, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: COLORS[i % COLORS.length] }} 
            />
            <span className="text-xs font-semibold text-slate-600">
              {entry.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 shadow-xl rounded-xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
          {data.label}
        </p>
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: payload[0].payload.fill }} 
          />
          <p className="text-sm font-bold text-slate-900">
            {data.count} <span className="text-slate-500 font-medium">Students</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};