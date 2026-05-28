"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import IRezervacija from "@/app/interfaces/RezervacijaInterface";
import IFormaRezervacije from "@/app/interfaces/FormaRezervacije";
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

const manager = new RezervacijaManager();

export function RezervacijaProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<IRezervacija[]>([]);

  const refresh = () => setReservations(manager.getAll());

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
