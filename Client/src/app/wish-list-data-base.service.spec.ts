import { TestBed } from '@angular/core/testing';

import { WishListDataBaseService } from './wish-list-data-base.service';

describe('WishListDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WishListDataBaseService = TestBed.get(WishListDataBaseService);
    expect(service).toBeTruthy();
  });
});
