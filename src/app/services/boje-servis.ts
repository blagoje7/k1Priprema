import { signal, Injectable } from '@angular/core';
import { Nivo } from '../logika/popunjenost';

export const PODRAZUMEVANE_BOJE: Record<Nivo, string> = {
  nisko: '#2e7d32',
  srednje: '#f9a825',
  poviseno: '#ef6c00',
  visoko: '#c62828'
};

@Injectable({
  providedIn: 'root',
})
export class BojeServis {
  boje = signal<Record<Nivo, string>>({ ...PODRAZUMEVANE_BOJE });

  promeniBoju(nivo: Nivo, boja: string) {
    this.boje.update((stare) => ({ ...stare, [nivo]: boja }));
  }

  vratiPodrazumevane() {
    this.boje.set({ ...PODRAZUMEVANE_BOJE });
  }
}
