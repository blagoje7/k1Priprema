export interface Adresa {
  ulica: string;
  mesto: string;
}

export function rastaviAdresu(tekst: string | null | undefined): Adresa {
  const vrednost = (tekst ?? '').trim();
  const zarez = vrednost.lastIndexOf(',');

  if (zarez === -1) {
    return { ulica: vrednost, mesto: '' };
  }

  return {
    ulica: vrednost.slice(0, zarez).trim(),
    mesto: vrednost.slice(zarez + 1).trim(),
  };
}

export function spojiAdresu(ulica: string, mesto: string): string {
  const u = ulica.trim();
  const m = mesto.trim();
  return u && m ? `${u}, ${m}` : '';
}
