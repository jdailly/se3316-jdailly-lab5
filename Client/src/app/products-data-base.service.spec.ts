import { TestBed } from '@angular/core/testing';

import { ProductsDataBaseService } from './products-data-base.service';

describe('ProductsDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsDataBaseService = TestBed.get(ProductsDataBaseService);
    expect(service).toBeTruthy();
  });
});
