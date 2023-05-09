import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import {
  bankDetailsShowHideFields,
  crossBorderNatureShowHideFields,
} from 'src/app/shared/constants/step-four.constants';
import { Subscription } from 'rxjs';

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
      courtCountry: [{ value: 'IT', disabled: true }, [Validators.required]],
      courtCountryOther: [{ value: '', disabled: true }],
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
    accountNumberOrIBAN: [''],
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

  constructor(private fb: FormBuilder, private zone: NgZone) {}

  crossborderNatureValidator(formGroup: FormGroup) {
    if (
      formGroup.get('claimantCountry').value !== 'other' ||
      formGroup.get('defendantCountry').value !== 'other'
    ) {
      const claimantCountry = formGroup.get('claimantCountry').value;
      const defendantCountry = formGroup.get('defendantCountry').value;
      const courtCountry =
        formGroup.get('courtCountry').value !== 'other'
          ? formGroup.get('courtCountry').value
          : formGroup.get('courtCountryOther').value;

      const setFormControlSameCountryAttribute = (
        formGroup: FormGroup,
        formControlName: string,
        areAtLeastTwoListDifferent: boolean
      ) => {
        if (areAtLeastTwoListDifferent) {
          formGroup.get(formControlName)['sameCountry'] = false;
        } else {
          formGroup.get(formControlName)['sameCountry'] = true;
        }
      };

      const claimantDefendantCountry =
        claimantCountry === defendantCountry ? claimantCountry : undefined;

      let areAtLeastTwoListDifferent = true;

      if (claimantDefendantCountry) {
        if (claimantDefendantCountry === courtCountry) {
          areAtLeastTwoListDifferent = false;
        } else areAtLeastTwoListDifferent = true;
      } else areAtLeastTwoListDifferent = true;

      setFormControlSameCountryAttribute(
        formGroup,
        'claimantCountry',
        areAtLeastTwoListDifferent
      );
      setFormControlSameCountryAttribute(
        formGroup,
        'defendantCountry',
        areAtLeastTwoListDifferent
      );

      return areAtLeastTwoListDifferent ? null : { required: true };
    }
    return null;
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
    if (formElement instanceof FormGroup) {
      for (const nestedFormElementName in formElement.controls) {
        const nestedFormElement = formElement.get(nestedFormElementName);
        if (nestedFormElement instanceof FormGroup) {
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