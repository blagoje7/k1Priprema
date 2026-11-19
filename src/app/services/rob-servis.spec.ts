import { TestBed } from '@angular/core/testing';

import { RobServis } from './rob-servis';

describe('RobServis', () => {
  let service: RobServis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobServis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
