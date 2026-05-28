"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import korisnici from "@/models/korisnici";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useReservation } from "@/context/ReservationContext";
import { useCurrency } from "@/context/CurrencyContext";

const inputCls =
  "w-full bg-[#0d1117] border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder:text-gray-600";

type Tab = "podaci";

function fmtDate(d: Date) {
  return new Date(d).toLocaleDateString("sr-Latn-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ProfilPage() {
  const router = useRouter();
  const [userId] = useLocalStorage<number | null>("auth_userId", null);
  const { reservations } = useReservation();
  const { format } = useCurrency();
  const [tab, setTab] = useState<Tab>("podaci");
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !userId) router.push("/prijava");
  }, [mounted, userId, router]);

  const korisnik = korisnici.find((k) => k.id === userId);

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [adresa, setAdresa] = useState("");
  const [datumRodjenja, setDatumRodjenja] = useState("");

  useEffect(() => {
    if (korisnik) {
      setIme(korisnik.ime);
      setPrezime(korisnik.prezime);
      setEmail(korisnik.email);
      setTelefon(korisnik.telefon);
      setAdresa(`${korisnik.adresa}, ${korisnik.grad}`);
      setDatumRodjenja(fmtDate(korisnik.datumRodjenja));
    }
  }, [korisnik]);

  const myReservations = useMemo(
    () => reservations.filter((r) => r.korisnikId === userId),
    [reservations, userId]
  );

  const stats = useMemo(() => {
    const now = new Date();
    const aktivne = myReservations.filter(
      (r) => r.status === "rezervisana" && new Date(r.datumPocetka) <= now && new Date(r.datumKraja) >= now
    ).length;
    const zavrsene = myReservations.filter(
      (r) => r.status === "zavrsena" || (r.status === "rezervisana" && new Date(r.datumKraja) < now)
    ).length;
    const ukupno = myReservations.reduce((sum, r) => sum + r.cena, 0);
    return { ukupno: myReservations.length, zavrsene, aktivne, potroseno: ukupno };
  }, [myReservations]);

  if (!mounted || !userId || !korisnik) return null;

  const initials = `${korisnik.ime[0]}${korisnik.prezime[0]}`.toUpperCase();

  const handleSave = (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="flex-1 bg-[#0a0d14]">

      <div className="w-full h-28 bg-linear-to-r from-[#0a1628] via-[#0a2456] to-[#0352B8]" />

      <div className="w-[85%] mx-auto -mt-8 mb-6 flex items-end gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-4 border-[#0a0d14]">
          <span className="text-white font-bold text-xl">{initials}</span>
        </div>
        <div className="pb-1">
          <h1 className="text-white font-bold text-xl leading-tight">
            {korisnik.ime} {korisnik.prezime}
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">
            {korisnik.email} • {korisnik.telefon}
          </p>
        </div>
      </div>

      <div className="w-[85%] mx-auto">

        <div className="flex gap-6 border-b border-white/10 mb-6">
          <button
            onClick={() => setTab("podaci")}
            className={`pb-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer -mb-px ${
              tab === "podaci"
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Licni podaci
          </button>
          <button
            onClick={() => router.push("/rezervacije")}
            className="pb-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-white transition-colors cursor-pointer -mb-px"
          >
            Rezervacije
          </button>
        </div>

        {tab === "podaci" && (
          <div className="flex gap-8 items-start pb-10">

            <div className="flex-1">
              <h2 className="text-white font-semibold text-base mb-5">Licni podaci</h2>
              <form onSubmit={handleSave} className="flex flex-col gap-4">

                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs">Ime</label>
                    <input value={ime} onChange={(e) => setIme(e.target.value)} className={inputCls} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs">Prezime</label>
                    <input value={prezime} onChange={(e) => setPrezime(e.target.value)} className={inputCls} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-xs">Imejl adresa</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs">Broj telefona</label>
                    <input value={telefon} onChange={(e) => setTelefon(e.target.value)} className={inputCls} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs">Datum rodjenja</label>
                    <input value={datumRodjenja} onChange={(e) => setDatumRodjenja(e.target.value)} className={inputCls} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-xs">Adresa</label>
                  <input value={adresa} onChange={(e) => setAdresa(e.target.value)} className={inputCls} />
                </div>

                <div className="flex items-center gap-4 mt-1">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Sacuvaj izmene
                  </button>
                  {saved && <span className="text-green-400 text-xs">Sacuvano!</span>}
                </div>

              </form>
            </div>

            <div className="w-52 shrink-0">
              <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Statistike</h3>
                <div className="flex flex-col gap-0">
                  {[
                    { value: stats.ukupno, label: "Ukupno rezervovano", cls: "text-white" },
                    { value: stats.zavrsene, label: "Zavrsene", cls: "text-white" },
                    { value: stats.aktivne, label: "Aktivne", cls: "text-white" },
                    { value: format(stats.potroseno), label: "Ukupno potroseno", cls: "text-blue-400" },
                  ].map(({ value, label, cls }, i, arr) => (
                    <div key={label}>
                      <div className="py-3">
                        <p className={`font-bold text-xl ${cls}`}>{value}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                      </div>
                      {i < arr.length - 1 && <div className="h-px bg-white/5" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}


      </div>
    </main>
  );
}
