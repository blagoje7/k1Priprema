import type { Roba } from '../model/roba';

export type Nivo = 'nisko' | 'srednje' | 'poviseno' | 'visoko';

export function zauzetoUMagacinu(roba: Roba[], magacinId: number): number {
  return roba.filter((r) => r.magacin_id === magacinId).reduce((zbir, r) => zbir + r.kolicina, 0);
}

export function procenatPopunjenosti(zauzeto: number, kapacitet: number): number {
  if (kapacitet <= 0) {
    return 0;
  }
  return (zauzeto / kapacitet) * 100;
}

export function nivoPopunjenosti(procenat: number): Nivo {
  if(procenat <= 50) return 'nisko';
  if(procenat <= 75) return 'srednje';
  if(procenat <= 90) return 'poviseno';
  return 'visoko';
}
