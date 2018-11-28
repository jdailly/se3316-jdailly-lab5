import { TestBed } from '@angular/core/testing';

import { CommentsDataBaseService } from './comments-data-base.service';

describe('CommentsDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentsDataBaseService = TestBed.get(CommentsDataBaseService);
    expect(service).toBeTruthy();
  });
});
