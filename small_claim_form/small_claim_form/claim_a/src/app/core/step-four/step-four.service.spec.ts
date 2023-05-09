import { TestBed } from '@angular/core/testing';

import { StepFourService } from './crossborder-nature.service';

describe('StepFourService', () => {
  let service: StepFourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepFourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
