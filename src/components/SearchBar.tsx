"use client";

import { Search } from "lucide-react";

const SORT_OPTIONS = [
  { value: "", label: "Sortiraj: Cena" },
  { value: "cena-asc", label: "Cena: rastuće" },
  { value: "cena-desc", label: "Cena: opadajuće" },
  { value: "ocena-desc", label: "Ocena: najviša" },
  { value: "godina-desc", label: "Najnovije" },
];

interface SearchBarProps {
  query: string;
  sort: string;
  count: number;
  onQuery: (v: string) => void;
  onSort: (v: string) => void;
}

export default function SearchBar({ query, sort, count, onQuery, onSort }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Pretražite vozila..."
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            className="w-full bg-[#0d1117] border border-white/10 text-white text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="bg-[#0d1117] border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <p className="text-gray-500 text-xs">Pronađeno {count} vozila</p>
    </div>
  );
}
