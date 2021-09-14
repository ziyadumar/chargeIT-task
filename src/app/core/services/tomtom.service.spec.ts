import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TomtomService } from './tomtom.service';

describe('TomtomService', () => {
  let service: TomtomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TomtomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
