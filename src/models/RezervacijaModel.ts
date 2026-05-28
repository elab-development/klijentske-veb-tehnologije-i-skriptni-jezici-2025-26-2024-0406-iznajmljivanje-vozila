
import IRezervacija from "../app/interfaces/RezervacijaInterface";
import IFormaRezervacije from "../app/interfaces/FormaRezervacije";

export class RezervacijaManager {
  private reservations: IRezervacija[] = [];
  private nextId = 1;

  create(form: IFormaRezervacije, cenaPoDanu: number): IRezervacija {
    const days = this.calculateDays(form.datumPocetka, form.datumKraja);
    const reservation: IRezervacija = {
      id: this.nextId++,
      voziloId: form.voziloId,
      korisnikId: form.korisnikId,
      datumPocetka: form.datumPocetka,
      datumKraja: form.datumKraja,
      lokacija: form.lokacija,
      status: "rezervisana",
      cena: days * cenaPoDanu,
    };
    this.reservations.push(reservation);
    return reservation;
  }

  cancel(id: number): boolean {
    const r = this.findById(id);
    if (!r || r.status !== "rezervisana") return false;
    r.status = "otkazana";
    return true;
  }

  complete(id: number): boolean {
    const r = this.findById(id);
    if (!r || r.status !== "rezervisana") return false;
    r.status = "zavrsena";
    return true;
  }

  getByUser(korisnikId: number): IRezervacija[] {
    return this.reservations.filter((r) => r.korisnikId === korisnikId);
  }

  getByVehicle(voziloId: number): IRezervacija[] {
    return this.reservations.filter((r) => r.voziloId === voziloId);
  }

  getAll(): IRezervacija[] {
    return [...this.reservations];
  }

  isVehicleAvailable(voziloId: number, datumPocetka: Date, datumKraja: Date): boolean {
    return !this.reservations.some(
      (r) =>
        r.voziloId === voziloId &&
        r.status === "rezervisana" &&
        datumPocetka < r.datumKraja &&
        datumKraja > r.datumPocetka
    );
  }

  calculateDays(datumPocetka: Date, datumKraja: Date): number {
    const ms = datumKraja.getTime() - datumPocetka.getTime();
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  private findById(id: number): IRezervacija | undefined {
    return this.reservations.find((r) => r.id === id);
  }
}
