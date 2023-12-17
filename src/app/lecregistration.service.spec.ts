import { TestBed } from '@angular/core/testing';

import { LecregistrationService } from './lecregistration.service';

describe('LecregistrationService', () => {
  let service: LecregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
