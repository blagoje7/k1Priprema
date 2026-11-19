import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Magacin } from '../../model/magacin';
import { Roba } from '../../model/roba';

@Component({
  selector: 'app-tabela-roba',
  imports: [DecimalPipe],
  templateUrl: './tabela-roba.html',
  styleUrl: './tabela-roba.css',
})
export class TabelaRoba {
  roba = input<Roba[]>([]);
  magacini = input<Magacin[]>([]);

  izmeni = output<Roba>();
  obrisi = output<Roba>();

  nazivMagacina(magacinId: number): string {
    return this.magacini().find((m) => m.id === magacinId)?.naziv ?? 'Nepoznat magacin';
  }
}
