"use client";

import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  TooltipItem,
  TooltipPositionerFunction,
  ChartType,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartEvent, ActiveElement } from "chart.js";
import { Link } from "lucide-react";
import vehicles from "@/models/data";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// Custom positioner — tooltip follows the cursor
declare module "chart.js" {
  interface TooltipPositionerMap {
    cursor: TooltipPositionerFunction<ChartType>;
  }
}
Tooltip.positioners.cursor = function (_elements, eventPosition) {
  return { x: eventPosition.x, y: eventPosition.y };
};

const chartVehicles = [...vehicles].sort((a, b) => b.brojOcena - a.brojOcena).slice(0, 5);

const data = {
  labels: chartVehicles.map((v) => `${v.osnovniPodaci.marka} ${v.osnovniPodaci.model}`),
  datasets: [
    {
      data: chartVehicles.map((v) => v.brojOcena),
      backgroundColor: "#2563eb",
      hoverBackgroundColor: "#3b82f6",
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

export default function Chart() {
  const router = useRouter();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        position: "cursor" as const,
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => ` ${ctx.parsed.y ?? 0} ocena`,
        },
        footerColor: "#93c5fd",
        footerFont: { size: 11 },
        footerMarginTop: 6,
      },
    },
    onClick: (_: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const vozilo = chartVehicles[elements[0].index];
        router.push(`/vozila/${vozilo.id}`);
      }
    },
    scales: {
      x: {
        ticks: { color: "#6b7280", font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { color: "#6b7280", font: { size: 11 } },
        grid: { color: "#ffffff0d" },
        border: { display: false },
      },
    },
  };

  return (
    <section className="w-[85%] mx-auto py-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg">Najpopularnija vozila</h2>
          <p className="text-gray-500 text-xs mt-1">Rangirana po broju ocena korisnika</p>
        </div>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <Link size={12} /> Kliknite na bar za prikaz vozila
        </span>
      </div>

      <div className="mt-6 bg-[#0d1117] border border-white/10 rounded-xl p-6 h-72 cursor-pointer">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}
