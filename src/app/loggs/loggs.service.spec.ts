import { TestBed } from '@angular/core/testing';

import { LoggsService } from './loggs.service';

describe('LoggsService', () => {
  let service: LoggsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
