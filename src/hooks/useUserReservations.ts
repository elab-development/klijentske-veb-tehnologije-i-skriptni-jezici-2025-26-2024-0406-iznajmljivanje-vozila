"use client";

import IRezervacija from "@/app/interfaces/RezervacijaInterface";
import useLocalStorage from "./useLocalStorage";

export function useUserReservations(userId: number | null) {
  const storageKey = userId !== null ? `reservations_${userId}` : "reservations_guest";

  const [reservations, setReservations, clearReservations] = useLocalStorage<IRezervacija[]>(
    storageKey,
    []
  );

  const addReservation = (r: IRezervacija) => {
    setReservations((prev) => [...prev, r]);
  };

  const updateReservation = (id: number, status: IRezervacija["status"]) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const removeReservation = (id: number) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    reservations,
    addReservation,
    updateReservation,
    removeReservation,
    clearReservations,
  };
}
