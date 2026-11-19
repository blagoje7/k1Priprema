import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresaUnos } from './adresa-unos';

describe('AdresaUnos', () => {
  let component: AdresaUnos;
  let fixture: ComponentFixture<AdresaUnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresaUnos],
    }).compileComponents();

    fixture = TestBed.createComponent(AdresaUnos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
