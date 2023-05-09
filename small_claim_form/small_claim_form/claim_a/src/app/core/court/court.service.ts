import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  editForm = this.fb.group({
    country: ['', [Validators.required]],
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    postalCode: [''],
    city: [''],
  });

  constructor(private fb: FormBuilder) {}

  markCourtFormAsDirty() {
    for (const formElementName in this.editForm.controls) {
      const formElement = this.editForm.get(formElementName);
      this.markAsDirty(formElement);
    }
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

  // setCourtForm(
  //   court: any
  // ): Promise<void> {
  //   this.resetAll();
  //   this.editForm.patchValue(court);
  //   return this.handleStableEvent(oralHearing);
  // }

  // private handleStableEvent(oralHearing: any): Promise<void> {
  //   return new Promise<void>((resolve) => {
  //     this.onStableSubscription = this.zone.onStable.subscribe(() => {
  //       if (this.onStableSubscription) {
  //         this.onStableSubscription.unsubscribe();
  //       }

  //       for (const key of Object.keys(stepSevenShowHideFields)) {
  //         const value = this.getJsonValue(
  //           stepSevenShowHideFields[key]['triggeringFormControlName'],
  //           this.oralHearingForm,
  //           oralHearing
  //         );

  //         if (value === stepSevenShowHideFields[key]['triggeringValue']) {
  //           this.triggerChangeEvent(
  //             stepSevenShowHideFields[key]['triggeringFieldId']
  //           );
  //         }
  //       }

  //       resolve();
  //     });
  //   });
  // }

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

  // private resetAll() {
  //   this.oralHearingForm.reset();
  //   this.documentAndCommunicationForm.reset();
  //   this.certificateForm.reset();
  //   this.dateAndSignatureForm.reset();
  // }

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
