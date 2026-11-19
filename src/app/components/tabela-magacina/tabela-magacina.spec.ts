import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMagacina } from './tabela-magacina';

describe('TabelaMagacina', () => {
  let component: TabelaMagacina;
  let fixture: ComponentFixture<TabelaMagacina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaMagacina],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaMagacina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
