import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { nivoPopunjenosti, procenatPopunjenosti } from '../../logika/popunjenost';
import { BojeServis } from '../../services/boje-servis';

@Component({
  selector: 'app-skala-kapaciteta',
  imports: [DecimalPipe],
  templateUrl: './skala-kapaciteta.html',
  styleUrl: './skala-kapaciteta.css',
})
export class SkalaKapaciteta {
  private bojeServis = inject(BojeServis);

  zauzeto = input.required<number>();
  kapacitet = input.required<number>();

  procenat = computed(() => procenatPopunjenosti(this.zauzeto(), this.kapacitet()));

  sirina = computed(() => Math.min(100, Math.max(0, this.procenat())));

  boja = computed(() => this.bojeServis.boje()[nivoPopunjenosti(this.procenat())]);
}
