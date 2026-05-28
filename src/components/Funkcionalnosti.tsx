const steps = [
  {
    num: "01",
    title: "Odaberite vozilo",
    desc: "Pregledajte našu flotu i pronađite idealno vozilo",
  },
  {
    num: "02",
    title: "Rezervisite termin",
    desc: "Odaberite datum, lokaciju preuzimanja i vracanja.",
  },
  {
    num: "03",
    title: "Preuzmite kljuceve",
    desc: "Dodite na lokaciju i preuzmite vozilo — jednostavno!",
  },
];

export default function Funkcionalnosti() {
  return (
    <section id="funkcionalnosti" className="w-[85%] mx-auto py-10">
      <h2 className="text-white font-bold text-lg mb-6">Kako funkcionise?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map(({ num, title, desc }) => (
          <div
            key={num}
            className="bg-[#0d1117] border border-white/10 rounded-xl p-6 flex flex-col gap-3"
          >
            <span className="text-blue-500 font-bold text-2xl">{num}</span>
            <h3 className="text-white font-semibold text-sm">{title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
