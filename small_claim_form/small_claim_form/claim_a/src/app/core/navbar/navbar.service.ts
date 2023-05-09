import { StepSevenService } from 'src/app/core/step-seven/step-seven.service';
import { ClaimDetailsService } from 'src/app/core/claim-details/claim-details.service';
import { ClaimantService } from '../claimant/claimant.service';
import { Injectable } from '@angular/core';
import { DefendantService } from '../defendant/defendant.service';
import { PromiseContent } from '../common/promise-content.model';
import { JurisdictionService } from '../jurisdiction/jurisdiction.service';
import { StepFourService } from '../step-four/step-four.service';
import { ClaimService } from '../claim/claim.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  previousStepId = 'step1';
  currentStepId = 'step1';

  constructor(
    private claimantService: ClaimantService,
    private defendantService: DefendantService,
    private jurisdictionService: JurisdictionService,
    private stepFourService: StepFourService,
    private claimService: ClaimService,
    private claimDetailsService: ClaimDetailsService,
    private stepSevenService: StepSevenService
  ) {}

  isStepValid(stepId: string): Promise<PromiseContent> {
    switch (stepId) {
      case 'step1':
        return this.claimantService.isClaimantFormValid();
      case 'step2':
        return this.defendantService.isDefendantFormValid();
      case 'step3':
        return this.jurisdictionService.isJurisdictionFormValid();
      case 'step4':
        return this.stepFourService.isStepFourFormValid();
      case 'step5':
        return this.claimService.isClaimFormValid();
      case 'step6':
        return this.claimDetailsService.isClaimDetailsFormValid();
      case 'step7':
        return this.stepSevenService.isStepSevenFormValid();
      case 'step8':
        return this.stepFourService.isStepFourFormValid();
    }
  }
}
