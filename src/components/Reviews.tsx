import { Star } from "lucide-react";

const RECENZIJE = [
  { ime: "Marko J.", datum: "Jan 2025", ocena: 4, tekst: "Odlično vozilo, savrseno stanje. Preporucujem svima!" },
  { ime: "Ana P.", datum: "Dec 2025", ocena: 4, tekst: "Jako ugodno za duga putovanja. Kvalitet sjajno." },
  { ime: "Stefan M.", datum: "Dec 2023", ocena: 4, tekst: "Brza rezervacija, vozilo odlično!" },
];

export default function Reviews() {
  return (
    <div>
      <h2 className="text-white font-semibold text-base mb-4">Recenzije</h2>
      <div className="grid grid-cols-3 gap-3">
        {RECENZIJE.map((r) => (
          <div key={r.ime} className="bg-[#111827] border border-white/10 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-xs font-semibold">{r.ime}</span>
              <span className="text-gray-500 text-[10px]">{r.datum}</span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < r.ocena ? "text-yellow-400 fill-yellow-400" : "text-gray-600 fill-gray-600"}
                />
              ))}
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">{r.tekst}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
