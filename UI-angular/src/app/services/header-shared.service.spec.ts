import { TestBed } from '@angular/core/testing';

import { HeaderSharedService } from './header-shared.service';

describe('HeaderSharedService', () => {
  let service: HeaderSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
