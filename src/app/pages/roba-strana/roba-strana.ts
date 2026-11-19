import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SkalaKapaciteta } from '../../components/skala-kapaciteta/skala-kapaciteta';
import { TabelaRoba } from '../../components/tabela-roba/tabela-roba';
import { zauzetoUMagacinu } from '../../logika/popunjenost';
import { Magacin } from '../../model/magacin';
import { Roba } from '../../model/roba';
import { MagacinServis } from '../../services/magacin-servis';
import { RobServis } from '../../services/rob-servis';

@Component({
  selector: 'app-roba-strana',
  imports: [ReactiveFormsModule, TabelaRoba, SkalaKapaciteta],
  templateUrl: './roba-strana.html',
  styleUrl: './roba-strana.css',
})
export class RobaStrana {
  private robaServis = inject(RobServis);
  private magacinServis = inject(MagacinServis);
  private ruta = inject(ActivatedRoute);

  roba = signal<Roba[]>([]);
  magacini = signal<Magacin[]>([]);
  poruka = signal('');
  greska = signal('');

  filterMagacinId = signal<number | null>(null);

  izmenaId = signal<number | null>(null);
  jeIzmena = computed(() => this.izmenaId() !== null );

  prikazanaRoba = computed(() => {
    const id = this.filterMagacinId();
    return id === null ? this.roba() : this.roba().filter((r) => r.magacin_id === id);
  });

  izabraniMagacin = computed(() => this.magacini().find((m) => m.id === this.filterMagacinId()));

  zauzetoIzabranog = computed(() => {
    const magacin = this.izabraniMagacin();
    return magacin ? zauzetoUMagacinu(this.roba(), magacin.id!) : 0;
  });

  forma = new FormGroup({
    magacin_id: new FormControl<number | null>(null, Validators.required),
    naziv: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    opis: new FormControl('', { nonNullable: true }),
    cena: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    kolicina: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    jedinica: new FormControl('Kg', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    const izAdrese = this.ruta.snapshot.queryParamMap.get('magacin');

    if (izAdrese !== null) {
      this.filterMagacinId.set(Number(izAdrese));
      this.forma.controls.magacin_id.setValue(Number(izAdrese));
    }
    this.ucitajMagacine();
    this.ucitajRobu();
  }

  ucitajMagacine() {
    this.magacinServis.getMagacini().subscribe({
      next: (magacini) => this.magacini.set(magacini),
      error: () => this.greska.set('Greska pri ucitavanju magacina')
    });
  }

  ucitajRobu() {
    this.robaServis.getRoba().subscribe({
      next: (roba) => this.roba.set(roba),
      error: () => this.greska.set('Greska pri ucitavanju robe')
    });
  }

  promeniFilter(dogadjaj: Event) {
    const vrednost = (dogadjaj.target as HTMLSelectElement).value;
    this.filterMagacinId.set(vrednost === '' ? null : Number(vrednost));
  }

  sacuvaj() {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
      return;
    }

    const podaci = this.forma.getRawValue();
    const roba: Roba = { ...podaci, magacin_id: podaci.magacin_id! };
    const id = this.izmenaId();

    if (id === null) {
      this.robaServis.dodajRobu(roba).subscribe({
        next: (nova) => {
          this.roba.update((lista) => [...lista, nova]);
          this.zavrsi('Roba je dodata.');
        },
        error: () => this.greska.set('Greska pri dodavanju robe.'),
      });
    } else {
      this.robaServis.izmeniRobu({ ...roba, id }).subscribe({
        next: (izmenjena) => {
          this.roba.update((lista) => lista.map((r) => (r.id === izmenjena.id ? izmenjena : r)));
          this.zavrsi('Roba je izmenjena.');
        },
        error: () => this.greska.set('Greska pri izmeni robe.'),
      });
    }
  }

  izmeni(roba: Roba) {
    this.izmenaId.set(roba.id!);
    this.forma.setValue({
      magacin_id: roba.magacin_id,
      naziv: roba.naziv,
      opis: roba.opis,
      cena: roba.cena,
      kolicina: roba.kolicina,
      jedinica: roba.jedinica,
    });
    this.poruka.set('');
    this.greska.set('');
  }

  odustani() {
    this.izmenaId.set(null);
    this.forma.reset({ magacin_id: this.filterMagacinId() });
  }

  obrisi(roba: Roba) {
    if (!confirm(`Obrisati robu "${roba.naziv}"?`)) {
      return;
    }

    this.robaServis.obrisiRobu(roba.id!).subscribe({
      next: () => {
        this.roba.update((lista) => lista.filter((r) => r.id !== roba.id));
        if (this.izmenaId() === roba.id) {
          this.odustani();
        }
        this.greska.set('');
        this.poruka.set('Roba je obrisana.');
      },
      error: () => this.greska.set('Greska pri brisanju robe.'),
    });
  }

  private zavrsi(tekst: string) {
    this.odustani();
    this.greska.set('');
    this.poruka.set(tekst);
  }
}
