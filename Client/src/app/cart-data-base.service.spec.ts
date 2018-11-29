import { TestBed } from '@angular/core/testing';

import { CartDataBaseService } from './cart-data-base.service';

describe('CartDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDataBaseService = TestBed.get(CartDataBaseService);
    expect(service).toBeTruthy();
  });
});
