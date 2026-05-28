"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";

const inputCls = "w-full bg-[#111827] border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder:text-gray-600";

const features = [
  "Brza rezervacija vozila",
  "Pregled istorije najma",
  "Ekskluzivne ponude",
  "Podrška 24/7",
];

export default function RegistracijaPage() {
  const router = useRouter();
  const [prihvaceno, setPrihvaceno] = useState(false);

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    router.push("/prijava");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#060a14] via-[#0a1628] to-[#0d2040] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl flex rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        <div className="hidden md:flex flex-col justify-center w-[40%] bg-linear-to-b from-[#0a1628] to-[#060e1c] p-10 gap-6">
          <div>
            <h1 className="text-white font-bold text-4xl leading-tight">Registracija</h1>
            <p className="text-gray-500 text-sm mt-3">Kreirajte nalog i počnite da koristite naše usluge.</p>
          </div>
          <ul className="flex flex-col gap-3 mt-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-gray-400 text-sm">
                <Check size={14} className="text-blue-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-[#0d1117] p-10 flex flex-col justify-center">
          <h2 className="text-white font-bold text-2xl">Kreirajte nalog</h2>
          <p className="text-gray-500 text-xs mt-1.5">Popunite podatke ispod</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs">Ime</label>
                <input type="text" placeholder="Vase ime" className={inputCls} />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs">Prezime</label>
                <input type="text" placeholder="Vase prezime" className={inputCls} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs">Imeil adresa</label>
              <input type="email" placeholder="ime@example.com" className={inputCls} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs">Broj telefona</label>
              <input type="tel" placeholder="+381 6x xxx xxxx" className={inputCls} />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs">Lozinka</label>
                <input type="password" placeholder="••••••••" className={inputCls} />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs">Potvrda lozinke</label>
                <input type="password" placeholder="••••••••" className={inputCls} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs">Broj vozačke dozvole</label>
              <input type="text" placeholder="xx-xxxxxxxxx" className={inputCls} />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setPrihvaceno((p) => !p)}>
              <span
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                  prihvaceno
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white/5 border-white/20 group-hover:border-white/40"
                }`}
              >
                {prihvaceno && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-gray-400 text-xs group-hover:text-white transition-colors">
                Prihvatam uslove koriscenja i politiku privatnosti
              </span>
            </label>

            <button
              type="submit"
              disabled={!prihvaceno}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg py-2.5 transition-colors cursor-pointer"
            >
              Kreirajte nalog
            </button>

          </form>

          <p className="text-gray-500 text-sm text-center mt-5">
            Vec imate nalog?{" "}
            <Link href="/prijava" className="text-blue-400 hover:underline">Prijavite se</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
