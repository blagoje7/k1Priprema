import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzborBoja } from './izbor-boja';

describe('IzborBoja', () => {
  let component: IzborBoja;
  let fixture: ComponentFixture<IzborBoja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IzborBoja],
    }).compileComponents();

    fixture = TestBed.createComponent(IzborBoja);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
