"use client";

import { useState } from "react";
import vehicles from "@/models/data";
import Button from "./Button";

const GRADOVI = ["Beograd centar", "Novi Sad", "Niš", "Kragujevac", "Subotica"];
const TIPOVI = [
  "Svi tipovi",
  ...new Set(vehicles.map((v) => v.specifikacije.tip)),
];

export default function Hero() {
  const [lokacija, setLokacija] = useState("Beograd centar");
  const [datumOd, setDatumOd] = useState("2025-01-20");
  const [datumDo, setDatumDo] = useState("2025-01-25");
  const [tip, setTip] = useState("Svi tipovi");

  return (
    <section className=" bg-linear-90 from-[#121721] via-[#0A346C] to-[#0352B8]  pt-14 pb-14">
      <div className="w-[85%] mx-auto">
        <h1 className="text-white font-bold text-5xl leading-tight max-w-2xl">
          Pronadjite savrseno vozilo
          <br />
          za svako putovanje
        </h1>

        <p className="text-gray-400 text-sm mt-4">
          Jednostavan najam vozila. Odaberite model, lokaciju i termin.
        </p>

        <div className="flex gap-3 mt-7">
          <Button
            onClick={() => (window.location.href = "/vozila")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md transition-colors"
          >
            Pregledaj vozila
          </Button>
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "#funkcionalnosti")}
            className="px-5 py-2.5 border border-blue-500 text-blue-400 hover:bg-blue-500/10 text-sm font-medium rounded-md transition-colors"
          >
            Saznaj vise
          </Button>
        </div>

        <div className="mt-10 bg-[#0d1117] rounded-xl flex items-stretch divide-x divide-white/10">
          <label className="flex-1 flex flex-col px-5 py-4 cursor-pointer hover:bg-white/5 transition-colors rounded-l-xl">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
              Lokacija preuzimanja
            </span>
            <select
              value={lokacija}
              onChange={(e) => setLokacija(e.target.value)}
              className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer appearance-none"
            >
              {GRADOVI.map((g) => (
                <option key={g} value={g} className="bg-[#0d1117]">
                  {g}
                </option>
              ))}
            </select>
          </label>

          <div className="flex-1 flex flex-col px-5 py-4 hover:bg-white/5 transition-colors">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
              Datum preuzimanja
            </span>
            <input
              type="date"
              value={datumOd}
              onChange={(e) => setDatumOd(e.target.value)}
              className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer [color-scheme:dark] w-full"
            />
          </div>

          <div className="flex-1 flex flex-col px-5 py-4 hover:bg-white/5 transition-colors">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
              Datum vracanja
            </span>
            <input
              type="date"
              value={datumDo}
              onChange={(e) => setDatumDo(e.target.value)}
              className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer [color-scheme:dark] w-full"
            />
          </div>

          <label className="flex-1 flex flex-col px-5 py-4 cursor-pointer hover:bg-white/5 transition-colors">
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
              Tip vozila
            </span>
            <select
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer appearance-none"
            >
              {TIPOVI.map((t) => (
                <option key={t} value={t} className="bg-[#0d1117]">
                  {t}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center px-4">
            <Button
              onClick={() =>
                (window.location.href = `/vozila?lokacija=${lokacija}&od=${datumOd}&do=${datumDo}&tip=${tip === "Svi tipovi" ? "" : tip}`)
              }
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
