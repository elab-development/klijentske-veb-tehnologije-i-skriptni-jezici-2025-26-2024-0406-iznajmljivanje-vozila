"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import korisnici from "@/models/korisnici";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Star } from "lucide-react";

const inputCls =
  "w-full bg-[#111827] border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder:text-gray-600";

export default function PrijavaPage() {
  const router = useRouter();
  const [, setUserId]   = useLocalStorage<number | null>("auth_userId", null);
  const [, setUsername] = useLocalStorage<string | null>("auth_username", null);

  const [email, setEmail]     = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska]   = useState("");

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const korisnik = korisnici.find(
      (k) => k.email === email && k.lozinka === lozinka
    );
    if (!korisnik) {
      setGreska("Pogrešan email ili lozinka.");
      return;
    }
    setUserId(korisnik.id);
    setUsername(`${korisnik.ime} ${korisnik.prezime}`);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#060a14] via-[#0a1628] to-[#0d2040] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl flex rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        <div className="hidden md:flex flex-col justify-between w-[42%] bg-linear-to-b from-[#0a1628] to-[#060e1c] p-10">
          <div className="flex flex-col gap-3">
            <p className="text-gray-400 text-sm">Dobrodosli u</p>
            <h1 className="text-white font-bold text-4xl leading-tight">RentACar</h1>
            <p className="text-gray-500 text-sm">Najam vozila bez komplikacija.</p>
          </div>

          <div className="flex gap-6 mt-auto pt-16">
            <div>
              <p className="text-blue-400 font-bold text-xl">500+</p>
              <p className="text-gray-500 text-xs mt-0.5">Vozila</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold text-xl">50+</p>
              <p className="text-gray-500 text-xs mt-0.5">Lokacija</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold text-xl flex items-center gap-1">4.9 <Star size={14} fill="currentColor" className="text-bluye-400" /></p>
              <p className="text-gray-500 text-xs mt-0.5">Ocena</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0d1117] p-10 flex flex-col justify-center">
          <h2 className="text-white font-bold text-2xl">Prijava</h2>
          <p className="text-gray-500 text-xs mt-1.5">Unesite vase podatke za pristup nalogu</p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs">Imei adresu</label>
              <input
                type="email"
                placeholder="ime@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setGreska(""); }}
                required
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-gray-400 text-xs">Lozinka</label>
                <Link href="#" className="text-blue-400 text-xs hover:underline">
                  Zaboravili ste lozinku?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={lozinka}
                onChange={(e) => { setLozinka(e.target.value); setGreska(""); }}
                required
                className={inputCls}
              />
            </div>

            {greska && <p className="text-red-400 text-xs -mt-1">{greska}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors cursor-pointer"
            >
              Prijavite se
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-600 text-xs">ili</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button
              type="button"
              className="w-full border border-white/10 hover:bg-white/5 text-gray-300 text-sm font-medium rounded-lg py-2.5 transition-colors cursor-pointer"
            >
              Nastavite sa Google nalogom
            </button>

          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            Nemate nalog?{" "}
            <Link href="/registracija" className="text-blue-400 hover:underline">
              Registrujte se
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
