import { TestBed } from '@angular/core/testing';

import { WordFileService } from './word-file.service';

describe('WordFileService', () => {
  let service: WordFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
