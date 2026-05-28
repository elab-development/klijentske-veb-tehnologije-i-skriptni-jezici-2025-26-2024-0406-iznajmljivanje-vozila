const stats = [
  { value: "1200+", label: "Zadovoljnih klijenata" },
  { value: "500+", label: "Iznajmljenih vozila" },
  { value: "50+", label: "Modela" },
  { value: "4.9/5", label: "Prosječna ocena" },
];

export default function Statistike() {
  return (
    <section className="bg-[#1C2433] border-y border-white/10 py-8 h-45 flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center w-[85%]">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="text-[#0578F5] font-bold text-2xl">{value}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
