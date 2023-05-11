import { StatutoryInterest } from './statutory-interest.model';
import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import { claimShowHideFields } from 'src/app/shared/constants/claim.constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  requiredValidator = Validators.required;

  claimForMoneyExpansionForm = this.fb.group({
    principalAmount: ['', this.amountValidator()],
    claimForMoneyCurrency: [],
    claimForMoneyCurrencyOther: [''],
    claimForMoneyCurrencyHistorical: [''],
    claimForMoneyCurrencyHistoricalCheckbox: [''],
  });

  otherClaimExpansionForm = this.fb.group({
    claimDescription: [''],
    claimValue: ['', this.amountValidator()],
    otherClaimCurrency: [],
    otherClaimCurrencyOther: [''],
    otherClaimCurrencyHistorical: [''],
    otherClaimCurrencyHistoricalCheckbox: [''],
  });

  claimingCostProceedingsExpansionForm = this.fb.group({
    costsDetails: [''],
  });

  contractualInterest = this.fb.group(
    {
      interestPercentage: [''],
      percentagePointsAboveECB: [''],
      contractualInterestOther: [''],
      contractualInterestFromDate: [''],
      contractualInterestTo: [''],
      contractualInterestToDate: [''],
    },
    { validator: this.validateDates }
  );

  statutoryInterest = this.fb.group(
    {
      statutoryInterestFromDate: [''],
      statutoryInterestTo: [''],
      statutoryInterestToDate: [''],
    },
    { validator: this.validateDates }
  );

  claimingInterestExpansion = this.fb.group({
    claimingInterestOption: [''],
    contractualInterest: this.contractualInterest,
    statutoryInterest: this.statutoryInterest,
  });

  claimingInterestOnCostExpansion = this.fb.group(
    {
      claimingInterestOnCostFromOption: [''],
      claimingInterestOnCostFromDate: [''],
      claimingInterestOnCostFromEvent: [''],
      claimingInterestOnCostToOption: [''],
      claimingInterestOnCostToDate: [''],
    },
    { validator: this.validateDates }
  );

  editForm = this.fb.group({
    claimForMoney: ['', [this.requiredValidator]],
    claimForMoneyExpansion: this.claimForMoneyExpansionForm,
    otherClaim: ['', [this.requiredValidator]],
    otherClaimExpansion: this.otherClaimExpansionForm,
    claimingCostProceedings: ['', [this.requiredValidator]],
    claimingCostProceedingsExpansion: this.claimingCostProceedingsExpansionForm,
    claimingInterest: ['', [this.requiredValidator]],
    claimingInterestExpansion: this.claimingInterestExpansion,
    claimingInterestOnCost: ['', [this.requiredValidator]],
    claimingInterestOnCostExpansion: this.claimingInterestOnCostExpansion,
  });

  areIncludedClaimForMoneyHistoricalCurrencies = false;
  areIncludedOtherClaimHistoricalCurrencies = false;

  onStableSubscription: Subscription;

  constructor(private fb: FormBuilder, private zone: NgZone) {}

  validateDates(formGroup: FormGroup): { [key: string]: boolean } | null {
    let fromDateFormControlName: string;
    let toDateFormControlName: string;
    
    if (
      Object.keys(formGroup.controls).includes('contractualInterestFromDate') &&
      Object.keys(formGroup.controls).includes('contractualInterestToDate')
    ) {
      fromDateFormControlName = 'contractualInterestFromDate';
      toDateFormControlName = 'contractualInterestToDate';
    } else if (
      Object.keys(formGroup.controls).includes('statutoryInterestFromDate') &&
      Object.keys(formGroup.controls).includes('statutoryInterestToDate')
    ) {
      fromDateFormControlName = 'statutoryInterestFromDate';
      toDateFormControlName = 'statutoryInterestToDate';
    } else if (
      Object.keys(formGroup.controls).includes(
        'claimingInterestOnCostFromDate'
      ) &&
      Object.keys(formGroup.controls).includes('claimingInterestOnCostToDate')
    ) {
      fromDateFormControlName = 'claimingInterestOnCostFromDate';
      toDateFormControlName = 'claimingInterestOnCostToDate';
    }

    const fromStringDate = formGroup.get(fromDateFormControlName).value;
    const toStringDate = formGroup.get(toDateFormControlName).value;

    if (fromStringDate && toStringDate) {
      const fromDateParts = fromStringDate.split('/');
      const fromDate = new Date(
        +fromDateParts[2],
        fromDateParts[1] - 1,
        +fromDateParts[0]
      );

      const toDateParts = toStringDate.split('/');
      const toDate = new Date(
        +toDateParts[2],
        toDateParts[1] - 1,
        +toDateParts[0]
      );

      if (fromDate && toDate && fromDate >= toDate) {
        return { fromDateAfterToDate: true };
      }
    }
    return null;
  }

  amountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const regex =
        /^(?:(?:\d{1,3}(?:\.\d{3})+|\d{1,3})(?:,\d{1,2})?|\d+(?:,\d{1,2})?)$/;

      if (!regex.test(value)) {
        return { invalidAmount: true };
      }

      return null;
    };
  }

  isClaimFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        this.markClaimFormAsDirty(this.editForm);
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step5', isValid));
    });
  }

  markClaimFormAsDirty(formGroup: FormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = formGroup.get(formElementName);
      if (formElement instanceof FormGroup) {
        const value = this.getTriggeringFormControlValue(formElementName);
        if (value === claimShowHideFields[formElementName]['triggeringValue']) {
          this.markClaimFormAsDirty(formElement);
        }
      } else {
        if (formElementName in claimShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);
          if (
            value === claimShowHideFields[formElementName]['triggeringValue']
          ) {
            this.markAsDirty(formElement);
          }
        } else {
          this.markAsDirty(formElement);
        }
      }
    }
  }

  private getTriggeringFormControlValue(formElementName: string) {
    return this.getFormControl(
      claimShowHideFields[formElementName]['triggeringFormControlName']
    ).value;
  }

  private markAsDirty(formElement: AbstractControl) {
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

  getFormControl(formControlName: string): AbstractControl {
    const formGroupNames = this.findFormGroupNames(
      formControlName,
      this.editForm
    );
    let formGroup = this.editForm;
    for (let i = 0; i < formGroupNames.length; i++) {
      formGroup = formGroup.get(formGroupNames[i]) as FormGroup;
    }
    return formGroup.get(formControlName);
  }

  private findFormGroupNames(
    formElementName: string,
    formGroup: FormGroup,
    parentFormGroupNames: string[] = []
  ): string[] | undefined {
    if (formGroup.contains(formElementName)) {
      return parentFormGroupNames;
    }

    for (const nestedFormElementName in formGroup.controls) {
      const nestedFormElement = formGroup.get(nestedFormElementName);
      if (nestedFormElement instanceof FormGroup) {
        const nestedFormGroupNames = this.findFormGroupNames(
          formElementName,
          nestedFormElement,
          [...parentFormGroupNames, nestedFormElementName]
        );
        if (nestedFormGroupNames) {
          return nestedFormGroupNames;
        }
      }
    }

    return undefined;
  }

  setClaimForm(claim: any): Promise<void> {
    this.resetAll();
    if (claim.claimForMoneyExpansion.claimForMoneyCurrencyHistoricalCheckbox)
      this.areIncludedClaimForMoneyHistoricalCurrencies = true;
    if (claim.otherClaimExpansion.otherClaimCurrencyHistoricalCheckbox)
      this.areIncludedOtherClaimHistoricalCurrencies = true;
    this.editForm.patchValue(claim);
    return this.handleStableEvent(claim);
  }

  private handleStableEvent(claim: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        const filteredClaimShowHideFields = Object.keys(claimShowHideFields)
          .filter(
            (key) =>
              key !== 'contractualInterest' &&
              key !== 'statutoryInterest' &&
              key !== 'claimingInterestOnCostFromDate' &&
              key !== 'claimingInterestOnCostFromEvent'
          )
          .reduce((obj, key) => {
            obj[key] = claimShowHideFields[key];
            return obj;
          }, {});

        for (const key of Object.keys(filteredClaimShowHideFields)) {
          const value = this.getJsonValue(
            claimShowHideFields[key]['triggeringFormControlName'],
            claim
          );

          if (value === claimShowHideFields[key]['triggeringValue']) {
            this.triggerChangeEvent(
              claimShowHideFields[key]['triggeringFieldId']
            );
          }
        }

        this.triggerChangeEventBasedOnValue(
          claim.claimingInterestExpansion.claimingInterestOption,
          'contractualInterest',
          'statutoryInterest'
        );
        this.triggerChangeEventBasedOnValue(
          claim.claimingInterestOnCostExpansion
            .claimingInterestOnCostFromOption,
          'claimingInterestOnCostFromDate',
          'claimingInterestOnCostFromEvent'
        );

        resolve();
      });
    });
  }

  private getJsonValue(key: string, claim: any): any {
    const formGroupNames = this.findFormGroupNames(key, this.editForm);

    let value = claim;
    for (let i = 0; i < formGroupNames.length; i++) {
      value = value[formGroupNames[i]];
    }
    return value[key];
  }

  private triggerChangeEventBasedOnValue(
    value: string,
    firstField: string,
    secondField: string
  ) {
    if (value === claimShowHideFields[firstField]['triggeringValue']) {
      this.triggerChangeEvent(
        claimShowHideFields[firstField]['triggeringFieldId']
      );
    } else if (value === claimShowHideFields[secondField]['triggeringValue']) {
      this.triggerChangeEvent(
        claimShowHideFields[secondField]['triggeringFieldId']
      );
    }
  }

  private resetAll() {
    this.editForm.reset();
    this.areIncludedClaimForMoneyHistoricalCurrencies = false;
    this.areIncludedOtherClaimHistoricalCurrencies = false;
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  }
}
