import { TestBed } from '@angular/core/testing';

import { PoChartColorService } from './po-chart-color.service';

describe('PoChartColorService', () => {
  let service: PoChartColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoChartColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
