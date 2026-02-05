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
import { Layers } from "lucide-react";

// A vibrant, professional palette for different categories
const COLORS = ["#3b82f6", "#8b5cf6", "#6366f1", "#06b6d4", "#2dd4bf"];

export default function CategoryBarChart({ data }: { data: CountDto[] }) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm h-[350px] flex flex-col group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Segmentation
          </h3>
          <p className="text-2xl font-bold text-slate-900">Departments</p>
        </div>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
          <Layers size={20} />
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
            />
            
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              content={<CustomTooltip />} 
            />

            <Bar 
              dataKey="count" 
              radius={[6, 6, 0, 0]} 
              barSize={40}
              animationBegin={200}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  fillOpacity={0.8}
                  className="hover:fill-opacity-100 transition-all duration-300"
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
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: payload[0].fill }} 
          />
          <p className="text-sm font-bold text-slate-900">
            {payload[0].value} <span className="text-slate-500 font-medium">Students</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};