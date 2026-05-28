export default interface IFilter {
  vrsta?: string;
  tip?: string;
  menjac?: "manuelni" | "automatski";
  gorivo?: "benzin" | "dizel" | "elektricni" | "hibrid";
  pogon?: "prednji" | "zadnji" | "4x4";
  klima?: boolean;
  minCena?: number;
  maxCena?: number;
  minOcena?: number;
  sortBy?: "cena" | "ocena" | "godinaProizvodnje";
  sortOrder?: "asc" | "desc";
}