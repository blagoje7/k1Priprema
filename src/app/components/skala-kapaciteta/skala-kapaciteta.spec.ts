import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkalaKapaciteta } from './skala-kapaciteta';

describe('SkalaKapaciteta', () => {
  let component: SkalaKapaciteta;
  let fixture: ComponentFixture<SkalaKapaciteta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkalaKapaciteta],
    }).compileComponents();

    fixture = TestBed.createComponent(SkalaKapaciteta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
