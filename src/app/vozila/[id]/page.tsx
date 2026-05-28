"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import vehicles from "@/models/data";
import ImageGallery from "@/components/ImageGallery";
import VehicleSpecs from "@/components/VehicleSpecs";
import Reviews from "@/components/Reviews";
import ReservationSidebar from "@/components/ReservationSidebar";

export default function VoziloDetailPage() {
  const { id } = useParams<{ id: string }>();
  const vozilo = vehicles.find((v) => v.id === Number(id));

  if (!vozilo) {
    return (
      <main className="flex-1 bg-[#0a0d14] flex items-center justify-center">
        <p className="text-gray-400">Vozilo nije pronađeno.</p>
      </main>
    );
  }

  const { osnovniPodaci: op } = vozilo;

  return (
    <main className="flex-1 bg-[#0a0d14]">
      <div className="w-[85%] mx-auto py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Početna</Link>
          <span>/</span>
          <Link href="/vozila" className="hover:text-white transition-colors">Vozila</Link>
          <span>/</span>
          <span className="text-gray-300">{op.marka} {op.model}</span>
        </nav>

        <div className="flex gap-8 items-start">

          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6">
            <ImageGallery slike={vozilo.slike} marka={op.marka} model={op.model} />
            <VehicleSpecs vozilo={vozilo} />
            <Reviews />
          </div>

          {/* RIGHT */}
          <ReservationSidebar vozilo={vozilo} />

        </div>
      </div>
    </main>
  );
}
