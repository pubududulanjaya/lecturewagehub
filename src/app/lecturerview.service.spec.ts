import { TestBed } from '@angular/core/testing';

import { LecturerviewService } from './lecturerview.service';

describe('LecturerviewService', () => {
  let service: LecturerviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturerviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
