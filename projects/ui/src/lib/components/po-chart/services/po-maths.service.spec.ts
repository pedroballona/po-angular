import { TestBed } from '@angular/core/testing';

import { PoMathsService } from './po-chart-color.service';

describe('PoMathsService', () => {
  let service: PoMathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoMathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
