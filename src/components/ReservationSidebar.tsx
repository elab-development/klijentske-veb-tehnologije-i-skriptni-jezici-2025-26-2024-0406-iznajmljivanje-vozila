"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import IVozilo from "@/interfaces/VoziloInterface";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useReservation } from "@/context/ReservationContext";

const LOKACIJE = ["Beograd centar", "Novi Sad", "Niš", "Kragujevac", "Subotica"];
const OSIGURANJE = 25;

function toDateInput(date: Date) {
  return date.toISOString().split("T")[0];
}

function parseDateInput(s: string): Date {
  return new Date(s + "T12:00:00");
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ReservationSidebar({ vozilo }: { vozilo: IVozilo }) {
  const router = useRouter();
  const { create } = useReservation();
  const [userId] = useLocalStorage<number | null>("auth_userId", null);

  const today = new Date();
  const plus5 = new Date(today);
  plus5.setDate(today.getDate() + 5);

  const [lokacija, setLokacija] = useState(LOKACIJE[0]);
  const [datumPocetka, setDatumPocetka] = useState(toDateInput(today));
  const [datumKraja, setDatumKraja] = useState(toDateInput(plus5));

  const dana = useMemo(() => {
    const start = parseDateInput(datumPocetka);
    const end = parseDateInput(datumKraja);
    return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  }, [datumPocetka, datumKraja]);

  const osnovnaCena = vozilo.cena * dana;
  const ukupno = osnovnaCena + OSIGURANJE;

  const { osnovniPodaci: op, specifikacije: sp } = vozilo;

  const potvrdi = () => {
    if (!userId) {
      router.push("/prijava");
      return;
    }
    create(
      {
        voziloId: vozilo.id,
        korisnikId: userId,
        datumPocetka: parseDateInput(datumPocetka),
        datumKraja: parseDateInput(datumKraja),
        lokacija,
      },
      vozilo.cena
    );
    router.push("/rezervacije");
  };

  return (
    <div className="w-72 shrink-0 sticky top-6">
      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 flex flex-col gap-5">

        <div>
          <h1 className="text-white font-bold text-xl">{op.marka} {op.model}</h1>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold">{vozilo.ocena}</span>
            <span className="text-gray-500 text-xs">({vozilo.brojOcena} recenzija)</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            {sp.tip} • {cap(sp.menjac)} • {op.godinaProizvodnje}
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-white font-bold text-2xl">€{vozilo.cena}</span>
          <span className="text-gray-500 text-sm">/dan</span>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex flex-col gap-4">
          <p className="text-white text-xs font-semibold">Rezervišite ovo vozilo</p>

          <div>
            <label className="text-gray-500 text-[10px] block mb-1">Lokacija preuzimanja</label>
            <select
              value={lokacija}
              onChange={(e) => setLokacija(e.target.value)}
              className="w-full bg-[#0d1117] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {LOKACIJE.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex-1">
              <label className="text-gray-500 text-[10px] block mb-1">Datum preuzimanja</label>
              <input
                type="date"
                value={datumPocetka}
                onChange={(e) => setDatumPocetka(e.target.value)}
                className="w-full bg-[#0d1117] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 scheme-dark"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-500 text-[10px] block mb-1">Datum vraćanja</label>
              <input
                type="date"
                value={datumKraja}
                onChange={(e) => setDatumKraja(e.target.value)}
                className="w-full bg-[#0d1117] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 scheme-dark"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-gray-500 text-[10px] mb-0.5">Obračun cene:</p>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">{dana} dana x €{vozilo.cena}</span>
            <span className="text-white">€{osnovnaCena}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Osiguranje</span>
            <span className="text-white">€{OSIGURANJE}</span>
          </div>
          <div className="flex justify-between text-xs font-semibold mt-1">
            <span className="text-white">Ukupno:</span>
            <span className="text-blue-400">€{ukupno}</span>
          </div>
        </div>

        <button
          onClick={potvrdi}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors cursor-pointer"
        >
          Potvrdi rezervaciju
        </button>

      </div>
    </div>
  );
}
