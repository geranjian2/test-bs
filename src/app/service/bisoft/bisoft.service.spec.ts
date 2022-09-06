import { TestBed } from '@angular/core/testing';

import { BisoftService } from './bisoft.service';

describe('BisoftService', () => {
  let service: BisoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BisoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
