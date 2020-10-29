import { TestBed } from '@angular/core/testing';

import { PoChartMathsService } from './po-chart-maths.service';

describe('PoChartMathsService', () => {
  let service: PoChartMathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoChartMathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
