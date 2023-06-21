import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import {
  bankDetailsShowHideFields,
  crossBorderNatureShowHideFields,
} from 'src/app/shared/constants/step-four.constants';
import { Subscription, from } from 'rxjs';
import { ValidatorService } from 'angular-iban';

@Injectable({
  providedIn: 'root',
})
export class StepFourService {
  requiredValidator = Validators.required;

  previousSelectedRadioButton = { value: '', divIdToExpand: '' };
  currentSelectedRadioButton = { value: '', divIdToExpand: '' };
  areAllRadioButtonsUnchecked = true;
  bankTransferRadioButton = false;
  creditCardRadioButton = false;
  directDebitRadioButton = false;
  otherRadioButton = false;

  crossborderNatureForm = this.fb.group(
    {
      claimantCountry: ['', [Validators.required]],
      claimantCountryOther: [''],
      defendantCountry: ['', [Validators.required]],
      defendantCountryOther: [''],
      courtCountry: ['', [Validators.required]],
      courtCountryOther: [''],
    },
    { validator: this.crossborderNatureValidator }
  );
  creditCardForm = this.fb.group({
    cardHolder: [''],
    cardCompany: [''],
    cardNumber: [''],
    cardExpireDate: [''],
    cardSecurityNumber: [''],
  });
  directDebitForm = this.fb.group({
    accountHolder: [''],
    bicOrBankName: [''],
    accountNumberOrIBAN: [''],
  });
  claimantBankAccountForm = this.fb.group({
    accountHolder: [''],
    bicOrBankName: [''],
    accountNumberOrIBAN: ['', ValidatorService.validateIban],
  });
  otherForm = this.fb.group({
    other: [''],
  });
  bankDetailsForm = this.fb.group({
    applicationFeePayment: this.fb.group({
      creditCard: this.creditCardForm,
      directDebit: this.directDebitForm,
      other: this.otherForm,
    }),
    claimantBankAccount: this.claimantBankAccountForm,
  });

  onStableSubscription: Subscription;

  constructor(private fb: UntypedFormBuilder, private zone: NgZone) {}

  crossborderNatureValidator(formGroup: UntypedFormGroup) {
    if (
      formGroup.get('claimantCountry').value !== 'other' &&
      formGroup.get('defendantCountry').value !== 'other' &&
      formGroup.get('courtCountry').value !== 'other'
    ) {
      const claimantCountry = formGroup.get('claimantCountry').value;
      const defendantCountry = formGroup.get('defendantCountry').value;
      const courtCountry = formGroup.get('courtCountry').value;

      const claimantDefendantEuropeanCountry =
        claimantCountry === defendantCountry ? claimantCountry : undefined;

      let areAtLeastTwoListDifferent = true;

      if (claimantDefendantEuropeanCountry) {
        if (claimantDefendantEuropeanCountry === courtCountry) {
          areAtLeastTwoListDifferent = false;
        } else areAtLeastTwoListDifferent = true;
      } else areAtLeastTwoListDifferent = true;

      return areAtLeastTwoListDifferent
        ? null
        : { invalidEuropeanCountriesCombination: true };
    } else if (
      formGroup.get('claimantCountry').value === 'other' &&
      formGroup.get('defendantCountry').value === 'other' &&
      formGroup.get('courtCountry').value === 'other'
    ) {
      const claimantCountryOther = formGroup.get('claimantCountryOther').value;
      const defendantCountryOther = formGroup.get(
        'defendantCountryOther'
      ).value;
      const courtCountryOther = formGroup.get('courtCountryOther').value;

      const claimantDefendantWorldCountry =
        claimantCountryOther === defendantCountryOther
          ? claimantCountryOther
          : undefined;

      let areAtLeastTwoListDifferent = true;

      if (claimantDefendantWorldCountry) {
        if (claimantDefendantWorldCountry === courtCountryOther) {
          areAtLeastTwoListDifferent = false;
        } else areAtLeastTwoListDifferent = true;
      } else areAtLeastTwoListDifferent = true;

      return areAtLeastTwoListDifferent
        ? null
        : { invalidWorldCountriesCombination: true };
    } else return null;
  }

  isStepFourFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.crossborderNatureForm.invalid || this.bankDetailsForm.invalid) {
        this.markStepFourFormsAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step4', isValid));
    });
  }

  markStepFourFormsAsDirty() {
    this.markCrossborderNatureFormAsDirty();
    this.markBankDetailsFormAsDirty();
  }

  markCrossborderNatureFormAsDirty() {
    for (const formElementName in this.crossborderNatureForm.controls) {
      const formElement = this.crossborderNatureForm.get(formElementName);
      if (formElementName in crossBorderNatureShowHideFields) {
        const value = this.crossborderNatureForm.get(
          crossBorderNatureShowHideFields[formElementName][
            'triggeringFormControlName'
          ]
        ).value;
        if (
          value ===
          crossBorderNatureShowHideFields[formElementName]['triggeringValue']
        ) {
          this.markAsDirty(formElement);
        }
      } else {
        this.markAsDirty(formElement);
      }
    }
  }

  markBankDetailsFormAsDirty() {
    this.markAsDirty(this.bankDetailsForm.get('claimantBankAccount'));
    for (const formElementName in this.bankDetailsForm.get(
      'applicationFeePayment'
    )['controls']) {
      const formElement = this.bankDetailsForm
        .get('applicationFeePayment')
        .get(formElementName);

      if (formElementName in bankDetailsShowHideFields) {
        const triggeringValue =
          bankDetailsShowHideFields[formElementName]['triggeringValue'];

        switch (formElementName) {
          case 'creditCard':
            if (this.creditCardRadioButton === triggeringValue) {
              this.markAsDirty(formElement);
            }
            break;
          case 'directDebit':
            if (this.directDebitRadioButton === triggeringValue) {
              this.markAsDirty(formElement);
            }
            break;
          case 'other':
            if (this.otherRadioButton === triggeringValue) {
              this.markAsDirty(formElement);
            }
            break;
        }
      } else {
        this.markAsDirty(formElement);
      }
    }
  }

  markAsDirty(formElement: AbstractControl) {
    if (formElement instanceof UntypedFormGroup) {
      for (const nestedFormElementName in formElement.controls) {
        const nestedFormElement = formElement.get(nestedFormElementName);
        if (nestedFormElement instanceof UntypedFormGroup) {
          this.markAsDirty(nestedFormElement);
        } else {
          nestedFormElement.markAsDirty({
            onlySelf: true,
          });
        }
      }
    } else {
      formElement.markAsDirty({
        onlySelf: true,
      });
    }
  }

  setStepFourForms(crossBorderNature: any, bankDetails: any): Promise<void> {
    this.resetAll();
    this.crossborderNatureForm.patchValue(crossBorderNature);
    this.bankDetailsForm.patchValue(bankDetails);
    return this.handleStableEvent(bankDetails);
  }

  private handleStableEvent(bankDetails: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        for (const key of Object.keys(crossBorderNatureShowHideFields)) {
          this.triggerChangeEvent(
            crossBorderNatureShowHideFields[key]['triggeringFieldId']
          );
        }

        if (bankDetails.applicationFeePayment.paymentMethod !== '') {
          this.triggerClickEvent(
            bankDetailsShowHideFields[
              bankDetails.applicationFeePayment.paymentMethod
            ]['triggeringFieldId']
          );
        }

        resolve();
      });
    });
  }

  private resetAll() {
    this.crossborderNatureForm.reset();
    this.bankDetailsForm.reset();
    this.previousSelectedRadioButton = { value: '', divIdToExpand: '' };
    this.currentSelectedRadioButton = { value: '', divIdToExpand: '' };
    this.areAllRadioButtonsUnchecked = true;
    this.bankTransferRadioButton = false;
    this.creditCardRadioButton = false;
    this.directDebitRadioButton = false;
    this.otherRadioButton = false;
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  }

  private triggerClickEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('click');
    inputElement.dispatchEvent(event);
  }
}
