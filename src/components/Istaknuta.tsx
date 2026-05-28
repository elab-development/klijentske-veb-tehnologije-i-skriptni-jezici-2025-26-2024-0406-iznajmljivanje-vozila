import VehicleCard from "@/components/VehicleCard";
import vehicles from "@/models/data";
const featured = [...vehicles].sort((a, b) => b.ocena - a.ocena).slice(0, 4);

export default function Istaknuta() {
  return (
    <section className="w-[85%] mx-auto px-6 py-8">
      <h2 className="text-white font-bold text-lg">Istaknuta vozila</h2>
      <p className="text-gray-500 text-xs mt-1">
        Pogledajte neka od vozila u našoj ponudi
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {featured.map((v) => (
          <VehicleCard key={v.id} vozilo={v} />
        ))}
      </div>
    </section>
  );
}
