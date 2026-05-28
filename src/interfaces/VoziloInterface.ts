export default interface IVozilo {
  id: number;
  osnovniPodaci: {
    marka: string;
    model: string;
    godinaProizvodnje: number;
    vrsta: string;
  };
  specifikacije: {
    tip: string;
    menjac: "manuelni" | "automatski";
    brojSedista: number;
    pogon: "prednji" | "zadnji" | "4x4";
    gorivo: "benzin" | "dizel" | "elektricni" | "hibrid";
    vrstaMotora: string;
    klima: boolean;
  };
  cena: number;
  ocena: number;
  brojOcena: number;
    slike: string[];
}