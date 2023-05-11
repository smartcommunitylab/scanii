import { Injectable, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import { Subscription } from 'rxjs';
import { otherCheckboxId } from 'src/app/shared/constants/jurisdiction.constants';

@Injectable({
  providedIn: 'root',
})
export class JurisdictionService {
  requiredValidator = Validators.required;

  editForm = this.fb.group(
    {
      defendantDomicile: [false],
      customerDomicile: [false],
      policyholderDomicilie: [false],
      placePerformanceObbligation: [false],
      placeHarmfulEvent: [false],
      placeImmovableProperty: [false],
      choiceCourtTribunal: [false],
      otherCheckbox: [false],
      otherText: [''],
    },
    { validator: this.checkboxValidator }
  );
  onStableSubscription: Subscription;

  constructor(private fb: FormBuilder, private zone: NgZone) {}

  checkboxValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const setFormControlValidity = (
      formGroup: FormGroup,
      formControlName: string,
      isValid: boolean
    ) => {
      if (isValid) {
        formGroup.get(formControlName).setErrors(null);
      } else {
        formGroup.get(formControlName).setErrors({ invalid: true });
      }
    };

    const formControls = formGroup.controls;

    const checkboxFormControls = Object.keys(formControls).filter(
      (key) => key !== 'otherText'
    );

    const atLeastOneCheckboxSelected = checkboxFormControls.some(
      (key) => formControls[key].value
    );

    for (const key of checkboxFormControls) {
      setFormControlValidity(formGroup, key, atLeastOneCheckboxSelected);
    }

    return atLeastOneCheckboxSelected ? null : { required: true };
  }

  isJurisdictionFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        if (this.editForm.get('otherCheckbox').value)
          this.markOtherTextAsDirty();
        else this.markCheckboxesAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step3', isValid));
    });
  }

  markCheckboxesAsDirty() {
    Object.keys(this.editForm.controls)
      .filter((key) => key !== 'otherText')
      .forEach((key) => {
        this.editForm.get(key).markAsDirty({ onlySelf: true });
      });
  }

  markOtherTextAsDirty() {
    this.editForm.get('otherText').markAsDirty({ onlySelf: true });
  }

  setJurisdictionForm(jurisdiction: any): Promise<void> {
    this.resetAll();
    this.editForm.patchValue(jurisdiction);
    return this.handleStableEvent();
  }

  private handleStableEvent(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }
        this.triggerClickEvent(otherCheckboxId);
        resolve();
      });
    });
  }

  private resetAll() {
    this.editForm.reset();
  }

  private triggerClickEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('click');
    inputElement.dispatchEvent(event);
  }
}
