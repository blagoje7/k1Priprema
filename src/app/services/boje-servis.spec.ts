import { TestBed } from '@angular/core/testing';

import { BojeServis } from './boje-servis';

describe('BojeServis', () => {
  let service: BojeServis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BojeServis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
