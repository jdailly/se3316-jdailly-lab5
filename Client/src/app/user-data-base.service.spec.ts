import { TestBed } from '@angular/core/testing';

import { UserDataBaseService } from './user-data-base.service';

describe('UserDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataBaseService = TestBed.get(UserDataBaseService);
    expect(service).toBeTruthy();
  });
});
