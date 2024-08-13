import { TestBed } from '@angular/core/testing';

import { CopernicusPriceService } from './copernicus-price.service';

describe('CopernicusPriceService', () => {
  let service: CopernicusPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopernicusPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
