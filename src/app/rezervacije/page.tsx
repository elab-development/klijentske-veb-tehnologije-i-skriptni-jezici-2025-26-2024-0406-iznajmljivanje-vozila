"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReservation } from "@/context/ReservationContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import vehicles from "@/models/data";
import IRezervacija from "@/interfaces/RezervacijaInterface";

type TabFilter = "sve" | "aktivne" | "predstojece" | "zavrsene";
type DisplayStatus = "aktivna" | "predstojeca" | "zavrsena" | "otkazana";

function getDisplayStatus(r: IRezervacija): DisplayStatus {
  if (r.status === "otkazana") return "otkazana";
  if (r.status === "zavrsena") return "zavrsena";
  const now = new Date();
  if (new Date(r.datumPocetka) > now) return "predstojeca";
  if (new Date(r.datumKraja) >= now) return "aktivna";
  return "zavrsena";
}

function fmtDate(d: Date) {
  return new Date(d).toLocaleDateString("sr-Latn-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const STATUS_LABEL: Record<DisplayStatus, string> = {
  aktivna: "Aktivna",
  predstojeca: "Predstojeca",
  zavrsena: "Zavrsena",
  otkazana: "Otkazana",
};

const STATUS_CLS: Record<DisplayStatus, string> = {
  aktivna: "bg-green-500/15 text-green-400",
  predstojeca: "bg-yellow-500/15 text-yellow-400",
  zavrsena: "bg-white/5 text-gray-500",
  otkazana: "bg-red-500/15 text-red-400",
};

export default function RezervacijePage() {
  const router = useRouter();
  const [userId] = useLocalStorage<number | null>("auth_userId", null);
  const { reservations, cancel } = useReservation();
  const [tab, setTab] = useState<TabFilter>("sve");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !userId) router.push("/prijava");
  }, [mounted, userId, router]);

  const mine = useMemo(
    () => reservations.filter((r) => r.korisnikId === userId),
    [reservations, userId]
  );

  const withStatus = useMemo(
    () => mine.map((r) => ({ ...r, displayStatus: getDisplayStatus(r) })),
    [mine]
  );

  const counts = useMemo(() => ({
    aktivne: withStatus.filter((r) => r.displayStatus === "aktivna").length,
    predstojece: withStatus.filter((r) => r.displayStatus === "predstojeca").length,
    zavrsene: withStatus.filter((r) => r.displayStatus === "zavrsena" || r.displayStatus === "otkazana").length,
    ukupno: mine.reduce((sum, r) => sum + r.cena, 0),
  }), [withStatus, mine]);

  const filtered = useMemo(() => {
    if (tab === "aktivne") return withStatus.filter((r) => r.displayStatus === "aktivna");
    if (tab === "predstojece") return withStatus.filter((r) => r.displayStatus === "predstojeca");
    if (tab === "zavrsene") return withStatus.filter((r) => r.displayStatus === "zavrsena" || r.displayStatus === "otkazana");
    return withStatus;
  }, [withStatus, tab]);

  if (!mounted || !userId) return null;

  const tabs: { key: TabFilter; label: string; count: number }[] = [
    { key: "sve", label: "Sve", count: mine.length },
    { key: "aktivne", label: "Aktivne", count: counts.aktivne },
    { key: "predstojece", label: "Predstojece", count: counts.predstojece },
    { key: "zavrsene", label: "Zavrsene", count: counts.zavrsene },
  ];

  return (
    <main className="flex-1 bg-[#0a0d14]">
      <div className="w-[85%] mx-auto py-10">

        <div className="mb-8">
          <h1 className="text-white font-bold text-2xl">Moje rezervacije</h1>
          <p className="text-gray-500 text-sm mt-1">Pregled svih vasih rezervacija</p>
        </div>

        <div className="flex gap-2 mb-5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? "bg-blue-600 text-white"
                  : "bg-[#111827] border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden mb-8">
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1.5fr_6rem] px-6 py-3 border-b border-white/10">
            {["Vozilo", "Preuzimanje", "Vracanje", "Lokacija", "Cena", "Status", ""].map((col, i) => (
              <span key={i} className="text-gray-500 text-xs font-medium">{col}</span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500 text-sm">
              Nema rezervacija za prikaz.
            </div>
          ) : (
            filtered.map((r) => {
              const vozilo = vehicles.find((v) => v.id === r.voziloId);
              const canCancel = r.displayStatus === "aktivna" || r.displayStatus === "predstojeca";
              return (
                <div
                  key={r.id}
                  className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1.5fr_6rem] px-6 py-4 border-b border-white/5 last:border-0 items-center"
                >
                  <span className="text-white text-sm font-semibold">
                    {vozilo
                      ? `${vozilo.osnovniPodaci.marka} ${vozilo.osnovniPodaci.model}`
                      : `Vozilo #${r.voziloId}`}
                  </span>
                  <span className="text-gray-400 text-sm">{fmtDate(r.datumPocetka)}</span>
                  <span className="text-gray-400 text-sm">{fmtDate(r.datumKraja)}</span>
                  <span className="text-gray-400 text-sm">{r.lokacija}</span>
                  <span className="text-blue-400 text-sm font-semibold">€{r.cena}</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit ${STATUS_CLS[r.displayStatus]}`}>
                    {STATUS_LABEL[r.displayStatus]}
                  </span>
                  <button
                    onClick={() =>
                      canCancel ? cancel(r.id) : router.push(`/vozila/${r.voziloId}`)
                    }
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      canCancel
                        ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                        : "border-white/10 text-gray-500 hover:bg-white/5"
                    }`}
                  >
                    {canCancel ? "Otkaži" : "Detalji"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-white font-semibold text-base mb-4">Pregled</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: counts.aktivne, label: "Aktivne", numCls: "text-green-400", accentCls: "bg-green-500" },
              { value: counts.predstojece, label: "Predstojece", numCls: "text-yellow-400", accentCls: "bg-yellow-500" },
              { value: counts.zavrsene, label: "Zavrsene", numCls: "text-white", accentCls: "bg-white/20" },
              { value: `€${counts.ukupno.toLocaleString("de-DE")}`, label: "Ukupno", numCls: "text-blue-400", accentCls: "bg-blue-500" },
            ].map(({ value, label, numCls, accentCls }) => (
              <div key={label} className="bg-[#111827] border border-white/10 rounded-xl p-5 flex gap-4 items-stretch">
                <div className={`w-0.5 rounded-full shrink-0 ${accentCls}`} />
                <div>
                  <p className={`font-bold text-2xl ${numCls}`}>{value}</p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push("/vozila")}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          + Nova rezervacija
        </button>

      </div>
    </main>
  );
}
