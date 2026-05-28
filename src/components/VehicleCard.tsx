"use client";

import IVozilo from "@/interfaces/VoziloInterface";
import Button from "@/components/Button";
import { Star } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import useCarImage from "@/hooks/useCarImage";

interface VehicleCardProps {
  vozilo: IVozilo;
  dostupno?: boolean;
}

export default function VehicleCard({ vozilo, dostupno = true }: VehicleCardProps) {
  const { osnovniPodaci, specifikacije, cena, ocena } = vozilo;
  const { format } = useCurrency();
  const image = useCarImage(osnovniPodaci.marka, osnovniPodaci.model, osnovniPodaci.godinaProizvodnje);

  return (
    <div className="bg-[#121721] rounded-xl overflow-hidden border border-white/10 flex flex-col">
      <div className="relative h-40 w-full bg-[#1a2035]">
        {image ? (
          <img
            src={image}
            alt={`${osnovniPodaci.marka} ${osnovniPodaci.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
            {osnovniPodaci.marka} {osnovniPodaci.model}
          </div>
        )}
        <span
          className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${
            dostupno
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {dostupno ? "Dostupno" : "Nije dostupno"}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-white font-semibold text-sm leading-tight">
              {osnovniPodaci.marka} {osnovniPodaci.model}
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">{specifikacije.tip}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-blue-400 font-bold text-sm">{format(cena)}</span>
            <span className="text-gray-500 text-xs"> /dan</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center gap-1">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <span className="text-gray-300 text-xs">{ocena}</span>
          </div>
        </div>
        <Button
          className="flex items-center gap-1.5 px-3 py-1 text-xs justify-center"
          onClick={() => { window.location.href = `/vozila/${vozilo.id}`; }}
        >
          Pogledaj
        </Button>
      </div>
    </div>
  );
}
