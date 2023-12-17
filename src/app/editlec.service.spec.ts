import { TestBed } from '@angular/core/testing';

import { EditlecService } from './editlec.service';

describe('EditlecService', () => {
  let service: EditlecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditlecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
