"use client";

import Hero from "@/components/Hero";
import Istaknuta from "@/components/Istaknuta";
import Statistike from "@/components/Statistike";
import Chart from "@/components/Chart";
import Funkcionalnosti from "@/components/Funkcionalnosti";

export default function Home() {
  return (
    <main className="flex-1 bg-[#0a0d14]">
      <Hero />

      <Istaknuta />

      <Statistike />

      <Chart />

      <Funkcionalnosti />
    </main>
  );
}
