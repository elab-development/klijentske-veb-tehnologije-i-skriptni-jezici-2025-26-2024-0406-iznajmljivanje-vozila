import IVozilo from "@/app/interfaces/VoziloInterface";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function VehicleSpecs({ vozilo }: { vozilo: IVozilo }) {
  const { osnovniPodaci: op, specifikacije: sp } = vozilo;

  const specs = [
    { label: "Vrsta", value: cap(op.vrsta) },
    { label: "Menjač", value: cap(sp.menjac) },
    { label: "Sedišta", value: String(sp.brojSedista) },
    { label: "Pogon", value: cap(sp.pogon) },
    { label: "Gorivo", value: cap(sp.gorivo) },
    { label: "Godište", value: String(op.godinaProizvodnje) },
    { label: "Motor", value: sp.vrstaMotora },
    { label: "Klima", value: sp.klima ? "Da" : "Ne" },
  ];

  return (
    <div>
      <h2 className="text-white font-semibold text-base mb-4">Specifikacije vozila</h2>
      <div className="grid grid-cols-4 gap-3">
        {specs.map(({ label, value }) => (
          <div key={label} className="bg-[#111827] border border-white/10 rounded-lg px-4 py-3">
            <p className="text-gray-500 text-[10px] mb-1">{label}</p>
            <p className="text-white text-sm font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
