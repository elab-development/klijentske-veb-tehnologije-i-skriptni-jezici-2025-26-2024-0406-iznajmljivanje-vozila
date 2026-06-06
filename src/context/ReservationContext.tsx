"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import IRezervacija from "@/interfaces/RezervacijaInterface";
import IFormaRezervacije from "@/interfaces/FormaRezervacije";
import { RezervacijaManager } from "@/models/RezervacijaModel";

interface RezervacijaContextType {
  reservations: IRezervacija[];
  create: (form: IFormaRezervacije, cenaPoDanu: number) => IRezervacija;
  cancel: (id: number) => boolean;
  complete: (id: number) => boolean;
  getByUser: (korisnikId: number) => IRezervacija[];
  getByVehicle: (voziloId: number) => IRezervacija[];
  isVehicleAvailable: (voziloId: number, datumPocetka: Date, datumKraja: Date) => boolean;
}

const RezervacijaContext = createContext<RezervacijaContextType | null>(null);

const STORAGE_KEY = "rezervacije";

function persist(data: IRezervacija[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function load(): IRezervacija[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as (Omit<IRezervacija, "datumPocetka" | "datumKraja"> & {
      datumPocetka: string;
      datumKraja: string;
    })[];
    return parsed.map((r) => ({
      ...r,
      datumPocetka: new Date(r.datumPocetka),
      datumKraja: new Date(r.datumKraja),
    }));
  } catch {
    return [];
  }
}

export function RezervacijaProvider({ children }: { children: ReactNode }) {
  const [manager] = useState(() => new RezervacijaManager());
  const [reservations, setReservations] = useState<IRezervacija[]>([]);

  useEffect(() => {
    const saved = load();
    saved.forEach((r) => manager.restore(r));
    setReservations(manager.getAll());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => {
    const all = manager.getAll();
    setReservations(all);
    persist(all);
  };

  const create = (form: IFormaRezervacije, cenaPoDanu: number): IRezervacija => {
    const r = manager.create(form, cenaPoDanu);
    refresh();
    return r;
  };

  const cancel = (id: number): boolean => {
    const result = manager.cancel(id);
    if (result) refresh();
    return result;
  };

  const complete = (id: number): boolean => {
    const result = manager.complete(id);
    if (result) refresh();
    return result;
  };

  return (
    <RezervacijaContext.Provider
      value={{
        reservations,
        create,
        cancel,
        complete,
        getByUser: (id) => manager.getByUser(id),
        getByVehicle: (id) => manager.getByVehicle(id),
        isVehicleAvailable: (voziloId, start, end) =>
          manager.isVehicleAvailable(voziloId, start, end),
      }}
    >
      {children}
    </RezervacijaContext.Provider>
  );
}

export function useReservation(): RezervacijaContextType {
  const ctx = useContext(RezervacijaContext);
  if (!ctx) throw new Error("useReservation must be used within RezervacijaProvider");
  return ctx;
}
