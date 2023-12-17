import { TestBed } from '@angular/core/testing';

import { OtherpaymentService } from './otherpayment.service';

describe('OtherpaymentService', () => {
  let service: OtherpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
