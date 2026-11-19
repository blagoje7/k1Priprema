import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaRoba } from './tabela-roba';

describe('TabelaRoba', () => {
  let component: TabelaRoba;
  let fixture: ComponentFixture<TabelaRoba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaRoba],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaRoba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
