"use client";

import { useState, useMemo } from "react";
import vehicles from "@/models/data";
import FilterPanel from "@/components/FilterPanel";
import SearchBar from "@/components/SearchBar";
import VehicleGrid from "@/components/VehicleGrid";
import Pagination from "@/components/Pagination";

const PER_PAGE = 9;
const MAX_CENA = Math.max(...vehicles.map((v) => v.cena));

export default function VozilaPage() {
  const [maxCena, setMaxCena] = useState(MAX_CENA);
  const [tip, setTip] = useState("Svi");
  const [marke, setMarke] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const handleMarka = (marka: string, checked: boolean) => {
    setMarke((prev) =>
      checked ? [...prev, marka] : prev.filter((m) => m !== marka),
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (v.cena > maxCena) return false;
      if (tip !== "Svi" && v.specifikacije.tip !== tip) return false;
      if (marke.length > 0 && !marke.includes(v.osnovniPodaci.marka))
        return false;
      if (query) {
        const q = query.toLowerCase();
        const match =
          `${v.osnovniPodaci.marka} ${v.osnovniPodaci.model} ${v.specifikacije.tip}`.toLowerCase();
        if (!match.includes(q)) return false;
      }
      return true;
    });

    if (sort === "cena-asc") list = [...list].sort((a, b) => a.cena - b.cena);
    if (sort === "cena-desc") list = [...list].sort((a, b) => b.cena - a.cena);
    if (sort === "ocena-desc")
      list = [...list].sort((a, b) => b.ocena - a.ocena);
    if (sort === "godina-desc")
      list = [...list].sort(
        (a, b) =>
          b.osnovniPodaci.godinaProizvodnje - a.osnovniPodaci.godinaProizvodnje,
      );

    return list;
  }, [maxCena, tip, marke, query, sort]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <main className="flex-1 bg-[#0a0d14]">
      <div className="w-[85%] mx-auto py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white font-bold text-2xl">Dostupna vozila</h1>
          <p className="text-gray-500 text-sm mt-1">
            Pronađite savrseno vozilo za vase putovanje
          </p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <FilterPanel
            maxCena={maxCena}
            tip={tip}
            marke={marke}
            onMaxCena={(v) => {
              setMaxCena(v);
              setPage(1);
            }}
            onTip={(v) => {
              setTip(v);
              setPage(1);
            }}
            onMarka={handleMarka}
          />

          {/* Content */}
          <div className="flex-1 flex flex-col gap-5">
            <SearchBar
              query={query}
              sort={sort}
              count={filtered.length}
              onQuery={(v) => {
                setQuery(v);
                setPage(1);
              }}
              onSort={(v) => {
                setSort(v);
                setPage(1);
              }}
            />
            <VehicleGrid vehicles={paginated} />
            <Pagination
              page={page}
              total={filtered.length}
              perPage={PER_PAGE}
              onPage={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
