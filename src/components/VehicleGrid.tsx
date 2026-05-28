import IVozilo from "@/interfaces/VoziloInterface";
import VehicleCard from "@/components/VehicleCard";

interface VehicleGridProps {
  vehicles: IVozilo[];
}

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-400 text-sm">
          Nema vozila koja odgovaraju filterima.
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Pokušajte promijeniti kriterije pretrage.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((v) => (
        <VehicleCard key={v.id} vozilo={v} />
      ))}
    </div>
  );
}
