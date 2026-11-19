import { TestBed } from '@angular/core/testing';

import { MagacinServis } from './magacin-servis';

describe('MagacinServis', () => {
  let service: MagacinServis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagacinServis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
