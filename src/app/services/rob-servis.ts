import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roba } from '../model/roba';

@Injectable({
  providedIn: 'root',
})
export class RobServis {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/roba';

  getRoba() {
    return this.http.get<Roba[]>(this.apiUrl);
  }

  getRobaZaMagacin(magacinId: number) {
    return this.http.get<Roba[]>(this.apiUrl, { params: { magacin_id: magacinId } });
  }

  dodajRobu(roba: Roba) {
    return this.http.post<Roba>(this.apiUrl, roba);
  }

  izmeniRobu(roba: Roba) {
    return this.http.put<Roba>(`${this.apiUrl}/${roba.id}`, roba);
  }

  obrisiRobu(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
