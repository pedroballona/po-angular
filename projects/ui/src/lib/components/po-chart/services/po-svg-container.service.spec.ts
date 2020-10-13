import { TestBed } from '@angular/core/testing';

import { PoSvgContainerService } from './po-svg-container.service';

describe('PoSvgContainerService', () => {
  let service: PoSvgContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoSvgContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
