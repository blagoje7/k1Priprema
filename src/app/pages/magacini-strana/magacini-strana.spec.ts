import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagaciniStrana } from './magacini-strana';

describe('MagaciniStrana', () => {
  let component: MagaciniStrana;
  let fixture: ComponentFixture<MagaciniStrana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaciniStrana],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaciniStrana);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
