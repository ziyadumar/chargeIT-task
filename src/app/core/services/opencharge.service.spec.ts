import { TestBed } from '@angular/core/testing';

import { OpenchargeService } from './opencharge.service';

describe('OpenchargeService', () => {
  let service: OpenchargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenchargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
