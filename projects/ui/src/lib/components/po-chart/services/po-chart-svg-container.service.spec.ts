import { TestBed } from '@angular/core/testing';

import { PoChartSvgContainerService } from './po-chart-svg-container.service';

describe('PoChartSvgContainerService', () => {
  let service: PoChartSvgContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoChartSvgContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
