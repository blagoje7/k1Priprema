import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { zauzetoUMagacinu } from '../../logika/popunjenost';
import { Magacin } from '../../model/magacin';
import { Roba } from '../../model/roba';
import { SkalaKapaciteta } from '../skala-kapaciteta/skala-kapaciteta';

@Component({
  selector: 'app-tabela-magacina',
  imports: [],
  templateUrl: './tabela-magacina.html',
  styleUrl: './tabela-magacina.css',
})
export class TabelaMagacina {
  magacini = input<Magacin[]>([]);
  roba = input<Roba[]>([]);

  izmeni = output<Magacin>();
  obrisi = output<Magacin>();

  zauzeto(magacin: Magacin): number {
    return zauzetoUMagacinu(this.roba(), magacin.id!);
  }
}
