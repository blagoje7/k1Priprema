import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobaStrana } from './roba-strana';

describe('RobaStrana', () => {
  let component: RobaStrana;
  let fixture: ComponentFixture<RobaStrana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobaStrana],
    }).compileComponents();

    fixture = TestBed.createComponent(RobaStrana);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
