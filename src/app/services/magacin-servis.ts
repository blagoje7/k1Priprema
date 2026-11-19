import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Magacin } from '../model/magacin';

@Injectable({
  providedIn: 'root',
})
export class MagacinServis {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/magacin';

  getMagacini() {
    return this.http.get<Magacin[]>(this.apiUrl);
  }

  dodajMagacin(magacin: Magacin) {
    return this.http.post<Magacin>(this.apiUrl, magacin);
  }

  izmeniMagacin(magacin: Magacin) {
    return this.http.put<Magacin>(`${this.apiUrl}/${magacin.id}`, magacin);
  }

  obrisiMagacin(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
