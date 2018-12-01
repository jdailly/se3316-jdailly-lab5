import { TestBed } from '@angular/core/testing';

import { PolicyDataBaseService } from './policy-data-base.service';

describe('PolicyDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicyDataBaseService = TestBed.get(PolicyDataBaseService);
    expect(service).toBeTruthy();
  });
});
