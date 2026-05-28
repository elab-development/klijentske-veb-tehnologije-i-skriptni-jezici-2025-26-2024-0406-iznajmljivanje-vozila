export default interface IRezervacija {

    id: number;
    voziloId: number;
    korisnikId: number;
    datumPocetka: Date;
    datumKraja: Date; 
    status: "rezervisana" | "otkazana" | "zavrsena";
    lokacija: string;
    cena: number;

 
}
