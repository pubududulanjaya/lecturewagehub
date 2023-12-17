import { TestBed } from '@angular/core/testing';

import { FacultyviewService } from './facultyview.service';

describe('FacultyviewService', () => {
  let service: FacultyviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
