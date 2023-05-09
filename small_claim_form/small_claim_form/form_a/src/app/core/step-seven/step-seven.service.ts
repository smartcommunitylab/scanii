import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import { stepSevenShowHideFields } from 'src/app/shared/constants/step-seven.constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepSevenService {
  requiredValidator = Validators.required;

  oralHearingForm = this.fb.group({
    oralHearingRequest: ['', [Validators.required]],
    oralHearingRequestReasons: [''],
    oralHearingPresence: ['', [Validators.required]],
    oralHearingPresenceReasons: [''],
  });
  documentAndCommunicationForm = this.fb.group({
    electronicCommunicationWithCourtTribunal: ['', [Validators.required]],
    electronicCommunicationOther: ['', [Validators.required]],
  });
  certificateForm = this.fb.group({
    certificateRequest: ['', [Validators.required]],
    language: [''],
  });
  dateAndSignatureForm = this.fb.group({
    city: ['', [Validators.required]],
    date: ['', [Validators.required]],
    sign: ['', [Validators.required]],
  });

  onStableSubscription: Subscription;

  constructor(private fb: FormBuilder, private zone: NgZone) {}

  isStepValid(): boolean {
    return (
      this.oralHearingForm.valid &&
      this.documentAndCommunicationForm.valid &&
      this.certificateForm.valid &&
      this.dateAndSignatureForm.valid
    );
  }

  isStepSevenFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (!this.isStepValid()) {
        this.markStepSevenFormsAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step7', isValid));
    });
  }

  markStepSevenFormsAsDirty() {
    this.markFormGroupAsDirty(this.oralHearingForm);
    this.markFormGroupAsDirty(this.documentAndCommunicationForm);
    this.markFormGroupAsDirty(this.certificateForm);
    this.markFormGroupAsDirty(this.dateAndSignatureForm);
  }

  markFormGroupAsDirty(formGroup: FormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = formGroup.get(formElementName);
      if (formElementName in stepSevenShowHideFields) {
        const value = this.getTriggeringFormControlValue(
          formGroup,
          formElementName
        );
        if (
          value === stepSevenShowHideFields[formElementName]['triggeringValue']
        ) {
          this.markAsDirty(formElement);
        }
      } else {
        this.markAsDirty(formElement);
      }
    }
  }

  private getTriggeringFormControlValue(
    formGroup: FormGroup,
    formElementName: string
  ) {
    return formGroup.get(
      stepSevenShowHideFields[formElementName]['triggeringFormControlName']
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

  setStepSevenForms(
    oralHearing: any,
    documentAndCommunication: any,
    certificate: any,
    dateAndSignature: any
  ): Promise<void> {
    this.resetAll();
    this.oralHearingForm.patchValue(oralHearing);
    this.documentAndCommunicationForm.patchValue(documentAndCommunication);
    this.certificateForm.patchValue(certificate);
    this.dateAndSignatureForm.patchValue(dateAndSignature);
    return this.handleStableEvent(oralHearing);
  }

  private handleStableEvent(oralHearing: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        for (const key of Object.keys(stepSevenShowHideFields)) {
          const value = this.getJsonValue(
            stepSevenShowHideFields[key]['triggeringFormControlName'],
            this.oralHearingForm,
            oralHearing
          );

          if (value === stepSevenShowHideFields[key]['triggeringValue']) {
            this.triggerChangeEvent(
              stepSevenShowHideFields[key]['triggeringFieldId']
            );
          }
        }

        resolve();
      });
    });
  }

  private getJsonValue(
    key: string,
    formGroup: FormGroup,
    oralHearing: any
  ): any {
    const formGroupNames = this.findFormGroupNames(key, formGroup);

    let value = oralHearing;
    for (let i = 0; i < formGroupNames.length; i++) {
      value = value[formGroupNames[i]];
    }
    return value[key];
  }

  private resetAll() {
    this.oralHearingForm.reset();
    this.documentAndCommunicationForm.reset();
    this.certificateForm.reset();
    this.dateAndSignatureForm.reset();
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
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
}
