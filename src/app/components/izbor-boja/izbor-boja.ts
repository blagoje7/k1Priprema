import { Component, inject } from '@angular/core';
import { Nivo } from '../../logika/popunjenost';
import { BojeServis } from '../../services/boje-servis';

@Component({
  selector: 'app-izbor-boja',
  imports: [],
  templateUrl: './izbor-boja.html',
  styleUrl: './izbor-boja.css',
})
export class IzborBoja {
  bojeServis = inject(BojeServis);

  nivoi: {nivo: Nivo, opis: string }[] = [
    { nivo: 'nisko', opis: 'do 50%'},
    { nivo: 'srednje', opis: 'od 50% do 75%' },
    { nivo: 'poviseno', opis: 'ood 75% do 90%'},
    { nivo: 'visoko', opis: 'od 90%'},
  ];

  promeni(nivo: Nivo, dogadjaj: Event) {
    this.bojeServis.promeniBoju(nivo, (dogadjaj.target as HTMLInputElement).value);
  }
}
