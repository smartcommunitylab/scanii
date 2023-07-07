import { StepSevenService } from 'src/app/core/step-seven/step-seven.service';
import { ClaimDetailsService } from 'src/app/core/claim-details/claim-details.service';
import { ClaimantService } from '../claimant/claimant.service';
import { Injectable } from '@angular/core';
import { DefendantService } from '../defendant/defendant.service';
import { PromiseContent } from '../common/promise-content.model';
import { JurisdictionService } from '../jurisdiction/jurisdiction.service';
import { StepFourService } from '../step-four/step-four.service';
import { ClaimService } from '../claim/claim.service';
import { CourtService } from '../court/court.service';
import { IntermediateForm } from '../common/intermediate-form.model';
import { TranslateService } from '@ngx-translate/core';
import exportFromJSON from 'export-from-json';

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
    private stepSevenService: StepSevenService,
    private courtService: CourtService,
    private translateService: TranslateService
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
        return this.courtService.isCourtFormValid();
    }
  }

  generateJson(): void {
    const fileName = `${this.formatDate(new Date())}_${
      this.translateService.currentLang
    }`;

    exportFromJSON({
      data: { form_A: this.getIntermediateForm() },
      fileName,
      exportType: exportFromJSON.types.json,
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}${month}${year}`;
  }

  getIntermediateForm(): IntermediateForm {
    const intermediateForm = new IntermediateForm();
    intermediateForm.claimants = this.claimantService.editForm.value.claimants;
    intermediateForm.defendants =
      this.defendantService.editForm.value.defendants;
    intermediateForm.jurisdiction = this.jurisdictionService.editForm.value;
    intermediateForm.crossborderNature =
      this.stepFourService.crossborderNatureForm.value;
    intermediateForm.bankDetails = this.getBankDetailsObj();
    intermediateForm.claim = this.claimService.editForm.value;
    intermediateForm.claimDetails = this.claimDetailsService.editForm.value;
    intermediateForm.oralHearing = this.stepSevenService.oralHearingForm.value;
    intermediateForm.documentAndCommunication =
      this.stepSevenService.documentAndCommunicationForm.value;
    intermediateForm.certificate = this.stepSevenService.certificateForm.value;
    intermediateForm.dateAndSignature =
      this.stepSevenService.dateAndSignatureForm.value;
    intermediateForm.court = this.courtService.editForm.value;
    return intermediateForm;
  }

  private getBankDetailsObj() {
    const bankDetailsObj = this.stepFourService.bankDetailsForm.value;
    if (this.stepFourService.bankTransferRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'bankTransfer';
    else if (this.stepFourService.creditCardRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'creditCard';
    else if (this.stepFourService.directDebitRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'directDebit';
    else if (this.stepFourService.otherRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'other';
    else bankDetailsObj.applicationFeePayment.paymentMethod = '';
    return bankDetailsObj;
  }

}
