import { TestBed } from '@angular/core/testing';

import { ClaimDetailsService } from './claim-details.service';

describe('ClaimDetailsService', () => {
  let service: ClaimDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
