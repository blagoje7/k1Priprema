import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, of, switchMap } from 'rxjs';
import { AdresaUnos } from '../../components/adresa-unos/adresa-unos';
import { IzborBoja } from '../../components/izbor-boja/izbor-boja';
import { TabelaMagacina } from '../../components/tabela-magacina/tabela-magacina';
import { Adresa, rastaviAdresu } from '../../logika/adresa';
import { Magacin } from '../../model/magacin';
import { Roba } from '../../model/roba';
import { MagacinServis } from '../../services/magacin-servis';
import { RobServis } from '../../services/rob-servis';

@Component({
  selector: 'app-magacini-strana',
  imports: [ReactiveFormsModule, AdresaUnos, IzborBoja, TabelaMagacina],
  templateUrl: './magacini-strana.html',
  styleUrl: './magacini-strana.css',
})
export class MagaciniStrana {
  private magacinServis = inject(MagacinServis);
  private robaServis = inject(RobServis);

  magacini = signal<Magacin[]>([]);
  roba = signal<Roba[]>([]);
  poruka = signal('');
  greska = signal('');

  izmenaId = signal<number | null>(null);
  jeIzmena = computed(() => this.izmenaId() !== null );

  adresaZaUnos = signal<Adresa>({ ulica: '', mesto: '' });

  forma = new FormGroup({
    naziv: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    adresa: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    kapacitet: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)]})
  });

  ngOnInit(): void {
    this.ucitajMagacine();
    this.ucitajRobu();
  }

  ucitajMagacine() {
    this.magacinServis.getMagacini().subscribe({
      next: (magacini) => this.magacini.set(magacini),
      error: () => this.greska.set('Greska pri ucitavanju magacina.'),
    });
  }

  ucitajRobu() {
    this.robaServis.getRoba().subscribe({
      next: (roba) => this.roba.set(roba),
      error: () => this.greska.set('Greska pri ucitavanju robe.')
    });
  }

  sacuvaj() {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    const podaci = this.forma.getRawValue();
    const id = this.izmenaId();

    if(id === null) {
      this.magacinServis.dodajMagacin(podaci).subscribe({
        next: (novi) => {
          this.magacini.update((lista) => [...lista, novi]);
          this.zavrsi('Magacin je dodat.');
        },
        error: () => this.greska.set('Greska ri dodavanju magacina')
      });
    } else {
      this.magacinServis.izmeniMagacin({id, ...podaci}).subscribe({
        next: (izmenjen) => {
          this.magacini.update((lista) => lista.map((m) => (m.id === izmenjen.id ? izmenjen : m)));
        },
        error: () => this.greska.set('Greska pri izmeni magacina')
      });
    }
  }

  izmeni(magacin: Magacin) {
    this.izmenaId.set(magacin.id!);
    this.forma.setValue({
      naziv: magacin.naziv,
      adresa: magacin.adresa,
      kapacitet: magacin.kapacitet,
    });

    this.adresaZaUnos.set(rastaviAdresu(magacin.adresa));
    this.poruka.set('');
    this.greska.set('');
  }

  odustani() {
    this.izmenaId.set(null);
    this.forma.reset();
    this.adresaZaUnos.set({ ulica: '', mesto: ''});
  }

  postaviAdresu(tekst: string) {
    this.forma.controls.adresa.setValue(tekst);
    this.forma.controls.adresa.markAsTouched();
  }

  obrisi(magacin: Magacin) {
    if(!confirm(`Obrisati magacin "${magacin.naziv}" i svu robu u njemu?`)) {
      return;
    }
    const id = magacin.id!;

    this.robaServis
      .getRobaZaMagacin(id)
      .pipe(
        switchMap((roba) => {
          const brisanja = roba.map((r) => this.robaServis.obrisiRobu(r.id!));
          return brisanja.length > 0 ? forkJoin(brisanja) : of([]);
        }),
        switchMap(() => this.magacinServis.obrisiMagacin(id)),
      ).subscribe({
        next: () => {
          this.magacini.update((lista) => lista.filter((m) => m.id !== id ));
          this.roba.update((lista) => lista.filter((r) => r.magacin_id !== id));
          if (this.izmenaId() === id) {
            this.odustani();
          }
          this.greska.set('');
          this.poruka.set(`Magacn "${magacin.naziv}" je obrisan zajedno sa robom.`)
        },
        error: () => this.greska.set('Greska pri brisanju magacina.'),
      });
  }

  private zavrsi(tekst: string) {
    this.odustani();
    this.greska.set('');
    this.poruka.set('');
  }
}
