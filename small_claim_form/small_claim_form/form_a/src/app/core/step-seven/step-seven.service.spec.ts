import { TestBed } from '@angular/core/testing';

import { StepSevenService } from './step-seven.service';

describe('StepSevenService', () => {
  let service: StepSevenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepSevenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
