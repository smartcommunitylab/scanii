import { TestBed } from '@angular/core/testing';

import { DefendantService } from './defendant.service';

describe('DefendantService', () => {
  let service: DefendantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefendantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
