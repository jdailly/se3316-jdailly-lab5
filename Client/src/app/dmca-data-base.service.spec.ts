import { TestBed } from '@angular/core/testing';

import { DmcaDataBaseService } from './dmca-data-base.service';

describe('DmcaDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DmcaDataBaseService = TestBed.get(DmcaDataBaseService);
    expect(service).toBeTruthy();
  });
});
