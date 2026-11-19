import { Component, input, linkedSignal, output } from '@angular/core';
import { Adresa, spojiAdresu } from '../../logika/adresa';

@Component({
  selector: 'app-adresa-unos',
  imports: [],
  templateUrl: './adresa-unos.html',
  styleUrl: './adresa-unos.css',
})
export class AdresaUnos {
  adresa = input<Adresa>({ ulica: '', mesto: '' });

  promena = output<string>();

  ulica = linkedSignal(() => this.adresa().ulica);
  mesto = linkedSignal(() => this.adresa().mesto);

  promeniUlicu(dogadjaj: Event) {
    this.ulica.set((dogadjaj.target as HTMLInputElement).value);
    this.javiRoditelju();
  }

  promeniMesto(dogadjaj: Event) {
    this.mesto.set((dogadjaj.target as HTMLInputElement).value);
    this.javiRoditelju();
  }

  private javiRoditelju() {
    this.promena.emit(spojiAdresu(this.ulica(), this.mesto()));
  }
}
