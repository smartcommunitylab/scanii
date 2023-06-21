import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import { claimDetailsShowHideFields } from 'src/app/shared/constants/claim-details.constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaimDetailsService {
  requiredValidator = Validators.required;

  editForm = this.fb.group({
    detailsOfClaim: ['', [Validators.required]],
    writtenEvidence: ['', [Validators.required]],
    writtenEvidenceText: [''],
    witnesses: ['', [Validators.required]],
    witnessesText: [''],
    otherClaimDetails: ['', [Validators.required]],
    otherClaimDetailsText: [''],
  });

  onStableSubscription: Subscription;

  constructor(private fb: UntypedFormBuilder, private zone: NgZone) {}

  isClaimDetailsFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        this.markClaimDetailsFormAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step6', isValid));
    });
  }

  markClaimDetailsFormAsDirty() {
    for (const formElementName in this.editForm.controls) {
      const formElement = this.editForm.get(formElementName);
      if (formElementName in claimDetailsShowHideFields) {
        const value = this.getTriggeringFormControlValue(formElementName);
        if (
          value ===
          claimDetailsShowHideFields[formElementName]['triggeringValue']
        ) {
          this.markAsDirty(formElement);
        }
      } else {
        this.markAsDirty(formElement);
      }
    }
  }

  private getTriggeringFormControlValue(formElementName: string) {
    return this.editForm.get(
      claimDetailsShowHideFields[formElementName]['triggeringFormControlName']
    ).value;
  }

  private markAsDirty(formElement: AbstractControl) {
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

  setClaimDetailsForm(claimDetails: any): Promise<void> {
    this.resetAll();
    this.editForm.patchValue(claimDetails);
    return this.handleStableEvent(claimDetails);
  }

  private handleStableEvent(claimDetails: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        for (const key of Object.keys(claimDetailsShowHideFields)) {
          const value = this.getJsonValue(claimDetailsShowHideFields[key]['triggeringFormControlName'], claimDetails);

          if (value === claimDetailsShowHideFields[key]['triggeringValue']) {
            this.triggerChangeEvent(
              claimDetailsShowHideFields[key]['triggeringFieldId']
            );
          }
        }

        resolve();
      });
    });
  }

  private getJsonValue(key: string, claimDetails: any): any {
    const formGroupNames = this.findFormGroupNames(key, this.editForm);
    
    let value = claimDetails;
    for (let i = 0; i < formGroupNames.length; i++) {
      value = value[formGroupNames[i]];
    }
    return value[key];
  }

  private resetAll() {
    this.editForm.reset();
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  }

  private findFormGroupNames(
    formElementName: string,
    formGroup: UntypedFormGroup,
    parentFormGroupNames: string[] = []
  ): string[] | undefined {
    if (formGroup.contains(formElementName)) {
      return parentFormGroupNames;
    }

    for (const nestedFormElementName in formGroup.controls) {
      const nestedFormElement = formGroup.get(nestedFormElementName);
      if (nestedFormElement instanceof UntypedFormGroup) {
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
}
