"use client";

import { Search, SortAsc, ListFilter, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  keyword: string;
  setKeyword: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  direction: "asc" | "desc";
  setDirection: (v: "asc" | "desc") => void;
  size: number;
  setSize: (v: number) => void;
}

export default function Filters({
  keyword,
  setKeyword,
  sortBy,
  setSortBy,
  direction,
  setDirection,
  size,
  setSize,
}: Props) {
  return (
    <div className="w-full">
      {/* MAIN CONTAINER */}
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end transition-all duration-300">

        {/* 🔍 SEARCH */}
        <div className="flex-1 min-w-[240px] group">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1 flex items-center gap-1.5 group-focus-within:text-blue-500 transition-colors">
            <Search size={12} /> Search Records
          </Label>

          <div className="relative">
            <Input
              className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="Find by name or email..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={16}
            />
          </div>
        </div>

        {/* DIVIDER (DESKTOP ONLY) */}
        <div className="h-10 w-px bg-slate-100 hidden md:block" />

        {/* SORT BY */}
        <div className="w-full sm:w-[160px]">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1 flex items-center gap-1.5">
            <ListFilter size={12} /> Sort By
          </Label>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all">
              <SelectValue placeholder="Field" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="firstName">First Name</SelectItem>
              <SelectItem value="lastName">Last Name</SelectItem>
              <SelectItem value="email">Email Address</SelectItem>
              <SelectItem value="category">Department</SelectItem>
              <SelectItem value="createdAt">Registration Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* DIRECTION */}
        <div className="w-full sm:w-[130px]">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1 flex items-center gap-1.5">
            <SortAsc size={12} /> Direction
          </Label>

          <Select
            value={direction}
            onValueChange={(v) => setDirection(v as "asc" | "desc")}
          >
            <SelectTrigger className="h-10 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all">
              <SelectValue placeholder="Order" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PAGE SIZE */}
        <div className="w-full sm:w-[90px]">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1 flex items-center gap-1.5">
            <LayoutGrid size={12} /> Size
          </Label>

          <Select
            value={size.toString()}
            onValueChange={(v) => setSize(Number(v))}
          >
            <SelectTrigger className="h-10 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </div>
  );
}
