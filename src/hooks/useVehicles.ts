"use client";

import { useState, useMemo } from "react";
import IVozilo from "@/interfaces/VoziloInterface";
import IFilter from "@/interfaces/FilterInterface";
import { VoziloFilter } from "@/models/VoziloModel";
import vehicles from "@/models/data";

const filter = new VoziloFilter();

export function useVehicles() {
  const [activeFilter, setActiveFilter] = useState<IFilter>({});

  const filtered = useMemo(
    () => filter.filterAndSort(vehicles, activeFilter),
    [activeFilter],
  );

  const updateFilter = (partial: Partial<IFilter>) => {
    setActiveFilter((prev) => ({ ...prev, ...partial }));
  };

  const resetFilter = () => setActiveFilter({});

  const getById = (id: number): IVozilo | undefined =>
    vehicles.find((v) => v.id === id);

  const uniqueValues = useMemo(
    () => ({
      vrste: [...new Set(vehicles.map((v) => v.osnovniPodaci.vrsta))],
      tipovi: [...new Set(vehicles.map((v) => v.specifikacije.tip))],
      marke: [...new Set(vehicles.map((v) => v.osnovniPodaci.marka))],
    }),
    [],
  );

  return {
    vehicles: filtered,
    allVehicles: vehicles,
    activeFilter,
    updateFilter,
    resetFilter,
    getById,
    uniqueValues,
  };
}
