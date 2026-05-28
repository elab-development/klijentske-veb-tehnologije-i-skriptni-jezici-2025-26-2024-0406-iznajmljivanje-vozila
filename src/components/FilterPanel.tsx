"use client";

import vehicles from "@/models/data";

const TIPOVI = ["Svi", ...new Set(vehicles.map((v) => v.specifikacije.tip))];
const MARKE = [...new Set(vehicles.map((v) => v.osnovniPodaci.marka))];
const MAX_CENA = Math.max(...vehicles.map((v) => v.cena));

interface FilterPanelProps {
  maxCena: number;
  tip: string | null;
  marke: string[];
  onMaxCena: (v: number) => void;
  onTip: (v: string) => void;
  onMarka: (marka: string, checked: boolean) => void;
}

export default function FilterPanel({
  maxCena,
  tip,
  marke,
  onMaxCena,
  onTip,
  onMarka,
}: FilterPanelProps) {
  return (
    <aside className="w-56 shrink-0 flex flex-col gap-6">
      <h2 className="text-white font-semibold text-sm">Filteri</h2>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400 text-xs">Cena po danu</span>
          <span className="text-white text-xs font-medium">€{maxCena}</span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_CENA}
          value={maxCena}
          onChange={(e) => onMaxCena(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="text-gray-500 text-[10px]">€0</span>
          <span className="text-gray-500 text-[10px]">€{MAX_CENA}</span>
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-xs mb-2">Tip vozila</p>
        <div className="flex flex-wrap gap-1.5">
          {TIPOVI.map((t) => (
            <button
              key={t}
              onClick={() => onTip(t)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                tip === t
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-gray-400 text-xs mb-2">Marka</p>
        <div className="flex flex-col gap-2">
          {MARKE.map((m) => {
            const checked = marke.includes(m);
            return (
              <label
                key={m}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => onMarka(m, e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                    checked
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white/5 border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4l3 3 5-6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-gray-400 text-xs group-hover:text-white transition-colors">
                  {m}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
