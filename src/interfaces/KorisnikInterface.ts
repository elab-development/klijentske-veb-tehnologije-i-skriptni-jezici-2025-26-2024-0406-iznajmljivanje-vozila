export default interface IKorisnik {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  lozinka: string;
  telefon: string;
  datumRodjenja: Date;
  adresa: string;
  grad: string;
  vozackaDozvola: string;
  slika: string;
  uloga: "korisnik" | "admin";
  datumRegistracije: Date;
}
