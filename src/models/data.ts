import IVozilo from "@/app/interfaces/VoziloInterface";

const vehicles: IVozilo[] = [
  // --- Mali Auto ---
  {
    id: 1,
    osnovniPodaci: { marka: "Opel", model: "Corsa", godinaProizvodnje: 2020, vrsta: "hatchback" },
    specifikacije: { tip: "Mali Auto", menjac: "manuelni", brojSedista: 5, pogon: "prednji", gorivo: "benzin", vrstaMotora: "1.2 Turbo 74kW", klima: false },
    cena: 30,
    ocena: 3.9,
    brojOcena: 182,
    slike: ["/images/corsa.jpg"],
  },
  {
    id: 2,
    osnovniPodaci: { marka: "Renault", model: "Clio", godinaProizvodnje: 2021, vrsta: "hatchback" },
    specifikacije: { tip: "Mali Auto", menjac: "manuelni", brojSedista: 5, pogon: "prednji", gorivo: "benzin", vrstaMotora: "1.0 TCe 67kW", klima: true },
    cena: 35,
    ocena: 4.2,
    brojOcena: 163,
    slike: ["/images/clio.jpg"],
  },
  {
    id: 3,
    osnovniPodaci: { marka: "Fiat", model: "500e", godinaProizvodnje: 2022, vrsta: "hatchback" },
    specifikacije: { tip: "Mali Elektricni Auto", menjac: "automatski", brojSedista: 4, pogon: "prednji", gorivo: "elektricni", vrstaMotora: "Electric 87kW", klima: true },
    cena: 48,
    ocena: 4.5,
    brojOcena: 93,
    slike: ["/images/fiat500.jpg"],
  },

  // --- Kompakt ---
  {
    id: 4,
    osnovniPodaci: { marka: "Volkswagen", model: "Golf 8", godinaProizvodnje: 2022, vrsta: "hatchback" },
    specifikacije: { tip: "Kompakt", menjac: "manuelni", brojSedista: 5, pogon: "prednji", gorivo: "benzin", vrstaMotora: "1.5 TSI 110kW", klima: true },
    cena: 45,
    ocena: 4.5,
    brojOcena: 128,
    slike: ["/images/golf8.jpg"],
  },
  {
    id: 5,
    osnovniPodaci: { marka: "Toyota", model: "Yaris", godinaProizvodnje: 2023, vrsta: "hatchback" },
    specifikacije: { tip: "Kompakt", menjac: "automatski", brojSedista: 5, pogon: "prednji", gorivo: "hibrid", vrstaMotora: "1.5 Hybrid 85kW", klima: true },
    cena: 50,
    ocena: 4.7,
    brojOcena: 95,
    slike: ["/images/yaris.jpg"],
  },
  {
    id: 6,
    osnovniPodaci: { marka: "Peugeot", model: "308", godinaProizvodnje: 2023, vrsta: "hatchback" },
    specifikacije: { tip: "Kompakt", menjac: "automatski", brojSedista: 5, pogon: "prednji", gorivo: "hibrid", vrstaMotora: "1.6 Plug-in Hybrid 133kW", klima: true },
    cena: 65,
    ocena: 4.4,
    brojOcena: 57,
    slike: ["/images/308.jpg"],
  },

  // --- Karavan / Sedan ---
  {
    id: 7,
    osnovniPodaci: { marka: "Skoda", model: "Octavia Combi", godinaProizvodnje: 2022, vrsta: "karavan" },
    specifikacije: { tip: "Karavan", menjac: "automatski", brojSedista: 5, pogon: "prednji", gorivo: "dizel", vrstaMotora: "2.0 TDI 110kW", klima: true },
    cena: 60,
    ocena: 4.6,
    brojOcena: 107,
    slike: ["/images/octavia.jpg"],
  },
  {
    id: 8,
    osnovniPodaci: { marka: "Tesla", model: "Model 3", godinaProizvodnje: 2023, vrsta: "sedan" },
    specifikacije: { tip: "Elektricni Sedan", menjac: "automatski", brojSedista: 5, pogon: "zadnji", gorivo: "elektricni", vrstaMotora: "Long Range 239kW", klima: true },
    cena: 95,
    ocena: 4.9,
    brojOcena: 211,
    slike: ["/images/tesla3.jpg"],
  },

  // --- SUV ---
  {
    id: 9,
    osnovniPodaci: { marka: "Dacia", model: "Duster", godinaProizvodnje: 2021, vrsta: "SUV" },
    specifikacije: { tip: "SUV", menjac: "manuelni", brojSedista: 5, pogon: "4x4", gorivo: "dizel", vrstaMotora: "1.5 Blue dCi 85kW", klima: true },
    cena: 55,
    ocena: 4.1,
    brojOcena: 144,
    slike: ["/images/duster.jpg"],
  },
  {
    id: 10,
    osnovniPodaci: { marka: "Kia", model: "Sportage", godinaProizvodnje: 2022, vrsta: "SUV" },
    specifikacije: { tip: "SUV", menjac: "automatski", brojSedista: 5, pogon: "4x4", gorivo: "hibrid", vrstaMotora: "1.6 T-GDI Hybrid 169kW", klima: true },
    cena: 80,
    ocena: 4.6,
    brojOcena: 120,
    slike: ["/images/sportage.jpg"],
  },
  {
    id: 11,
    osnovniPodaci: { marka: "Hyundai", model: "Ioniq 5", godinaProizvodnje: 2023, vrsta: "SUV" },
    specifikacije: { tip: "Elektricni SUV", menjac: "automatski", brojSedista: 5, pogon: "4x4", gorivo: "elektricni", vrstaMotora: "Dual Motor 225kW", klima: true },
    cena: 100,
    ocena: 4.6,
    brojOcena: 38,
    slike: ["/images/ioniq5.jpg"],
  },

  // --- Luksuzno Vozilo ---
  {
    id: 12,
    osnovniPodaci: { marka: "Audi", model: "A4", godinaProizvodnje: 2023, vrsta: "sedan" },
    specifikacije: { tip: "Luksuzni Sedan", menjac: "automatski", brojSedista: 5, pogon: "prednji", gorivo: "benzin", vrstaMotora: "2.0 TFSI 140kW", klima: true },
    cena: 105,
    ocena: 4.8,
    brojOcena: 66,
    slike: ["/images/a4.jpg"],
  },
  {
    id: 13,
    osnovniPodaci: { marka: "Mercedes-Benz", model: "C 200", godinaProizvodnje: 2022, vrsta: "sedan" },
    specifikacije: { tip: "Luksuzni Sedan", menjac: "automatski", brojSedista: 5, pogon: "zadnji", gorivo: "benzin", vrstaMotora: "2.0 T 150kW", klima: true },
    cena: 110,
    ocena: 4.7,
    brojOcena: 89,
    slike: ["/images/c200.jpg"],
  },
  {
    id: 14,
    osnovniPodaci: { marka: "BMW", model: "X5", godinaProizvodnje: 2021, vrsta: "SUV" },
    specifikacije: { tip: "Luksuzni SUV", menjac: "automatski", brojSedista: 5, pogon: "4x4", gorivo: "dizel", vrstaMotora: "3.0d 210kW", klima: true },
    cena: 120,
    ocena: 4.8,
    brojOcena: 74,
    slike: ["/images/bmwx5.jpg"],
  },
  {
    id: 15,
    osnovniPodaci: { marka: "Land Rover", model: "Defender", godinaProizvodnje: 2022, vrsta: "SUV" },
    specifikacije: { tip: "Luksuzni SUV", menjac: "automatski", brojSedista: 5, pogon: "4x4", gorivo: "dizel", vrstaMotora: "3.0D 183kW", klima: true },
    cena: 150,
    ocena: 4.7,
    brojOcena: 41,
    slike: ["/images/defender.jpg"],
  },
  {
    id: 16,
    osnovniPodaci: { marka: "Porsche", model: "Cayenne", godinaProizvodnje: 2023, vrsta: "SUV" },
    specifikacije: { tip: "Luksuzno Vozilo", menjac: "automatski", brojSedista: 5, pogon: "4x4", gorivo: "benzin", vrstaMotora: "3.0 V6 250kW", klima: true },
    cena: 220,
    ocena: 4.9,
    brojOcena: 29,
    slike: ["/images/cayenne.jpg"],
  },
];

export default vehicles;
