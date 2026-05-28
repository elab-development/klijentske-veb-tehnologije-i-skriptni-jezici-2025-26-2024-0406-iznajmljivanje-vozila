import IVozilo from "@/interfaces/VoziloInterface";
import IFilter from "@/interfaces/FilterInterface";


export class VoziloFilter {
  filter(vehicles: IVozilo[], filter: IFilter): IVozilo[] {
    return vehicles.filter((v) => {
      if (filter.vrsta && v.osnovniPodaci.vrsta !== filter.vrsta) return false;
      if (filter.tip && v.specifikacije.tip !== filter.tip) return false;
      if (filter.menjac && v.specifikacije.menjac !== filter.menjac) return false;
      if (filter.gorivo && v.specifikacije.gorivo !== filter.gorivo) return false;
      if (filter.pogon && v.specifikacije.pogon !== filter.pogon) return false;
      if (filter.klima !== undefined && v.specifikacije.klima !== filter.klima) return false;
      if (filter.minCena !== undefined && v.cena < filter.minCena) return false;
      if (filter.maxCena !== undefined && v.cena > filter.maxCena) return false;
      if (filter.minOcena !== undefined && v.ocena < filter.minOcena) return false;
      return true;
    });
  }

  sort(vehicles: IVozilo[], sortBy: IFilter["sortBy"], sortOrder: IFilter["sortOrder"] = "asc"): IVozilo[] {
    const dir = sortOrder === "desc" ? -1 : 1;

    return [...vehicles].sort((a, b) => {
      switch (sortBy) {
        case "cena":
          return (a.cena - b.cena) * dir;
        case "ocena":
          return (a.ocena - b.ocena) * dir;
        case "godinaProizvodnje":
          return (a.osnovniPodaci.godinaProizvodnje - b.osnovniPodaci.godinaProizvodnje) * dir;
        default:
          return 0;
      }
    });
  }

  filterAndSort(vehicles: IVozilo[], filter: IFilter): IVozilo[] {
    const filtered = this.filter(vehicles, filter);
    return this.sort(filtered, filter.sortBy, filter.sortOrder);
  }
}
