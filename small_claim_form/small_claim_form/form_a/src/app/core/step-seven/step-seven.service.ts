import { Injectable, NgZone } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { PromiseContent } from "../common/promise-content.model";
import { stepSevenShowHideFields } from "src/app/shared/constants/step-seven.constants";
import { Subscription } from "rxjs";
import { Certificate } from "./certificate.model";

@Injectable({
  providedIn: "root",
})
export class StepSevenService {
  requiredValidator = Validators.required;
  europeanLanguages: { value: string; label: string }[] = [];

  oralHearingForm = this.fb.group({
    oralHearingRequest: ["", [Validators.required]],
    oralHearingRequestReasons: [""],
    oralHearingPresence: ["", [Validators.required]],
    oralHearingPresenceReasons: [""],
  });
  documentAndCommunicationForm = this.fb.group({
    electronicCommunicationWithCourtTribunal: ["", [Validators.required]],
    electronicCommunicationOther: ["", [Validators.required]],
  });
  certificateForm = this.fb.group({
    certificateRequest: ["", [Validators.required]],
    language: [""],
  });
  dateAndSignatureForm = this.fb.group({
    city: ["", [Validators.required]],
    date: ["", [Validators.required]],
    sign: [""],
  });

  onStableSubscription: Subscription;

  constructor(private fb: UntypedFormBuilder, private zone: NgZone) {}

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
      resolve(new PromiseContent("step7", isValid));
    });
  }

  getCertificate(): Certificate {
    const certificateRequest =
      this.certificateForm.get("certificateRequest").value === "yes";

    const certificate = new Certificate(certificateRequest);

    const languageId = this.certificateForm.get("language").value;
    let languageName = "";
    if (languageId) {
      const language = this.europeanLanguages.find(
        (language) => language.value === languageId
      );
      if (language) languageName = language.label;

      certificate.language = languageId;
      certificate.languageName = languageName;
    }

    return certificate;
  }

  markStepSevenFormsAsDirty() {
    this.markFormGroupAsDirty(this.oralHearingForm);
    this.markFormGroupAsDirty(this.documentAndCommunicationForm);
    this.markFormGroupAsDirty(this.certificateForm);
    this.markFormGroupAsDirty(this.dateAndSignatureForm);
  }

  markFormGroupAsDirty(formGroup: UntypedFormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = formGroup.get(formElementName);
      if (formElementName in stepSevenShowHideFields) {
        const value = this.getTriggeringFormControlValue(
          formGroup,
          formElementName
        );
        if (
          value === stepSevenShowHideFields[formElementName]["triggeringValue"]
        ) {
          this.markAsDirty(formElement);
        }
      } else {
        this.markAsDirty(formElement);
      }
    }
  }

  private getTriggeringFormControlValue(
    formGroup: UntypedFormGroup,
    formElementName: string
  ) {
    return formGroup.get(
      stepSevenShowHideFields[formElementName]["triggeringFormControlName"]
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

  setStepSevenForms(
    oralHearing: any,
    documentAndCommunication: any,
    certificate: any,
    dateAndSignature: any
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.resetAll();
      let foundErrors = false;

      try {
        this.oralHearingForm.setValue(oralHearing);
        this.documentAndCommunicationForm.setValue(documentAndCommunication);
        this.certificateForm.setValue(certificate);
        this.dateAndSignatureForm.setValue(dateAndSignature);
      } catch (error) {
        foundErrors = true;
        reject(error);
      }

      if (!foundErrors) {
        this.handleStableEvent(oralHearing).then(() => {
          resolve(null);
        });
      }
    });
  }

  private handleStableEvent(oralHearing: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        for (const key of Object.keys(stepSevenShowHideFields)) {
          const value = this.getJsonValue(
            stepSevenShowHideFields[key]["triggeringFormControlName"],
            this.oralHearingForm,
            oralHearing
          );

          if (value === stepSevenShowHideFields[key]["triggeringValue"]) {
            this.triggerChangeEvent(
              stepSevenShowHideFields[key]["triggeringFieldId"]
            );
          }
        }

        resolve();
      });
    });
  }

  private getJsonValue(
    key: string,
    formGroup: UntypedFormGroup,
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

    const expandedElements = document
      .getElementById("step7_1")
      .querySelectorAll(".df_expanded");
    expandedElements.forEach((expandedElement) => {
      //collapse all expanded elements
      expandedElement.classList.remove("df_expanded");
      expandedElement.classList.add("df_collapsed");

      const formControlElements =
        expandedElement.querySelectorAll("[formControlName]");
      formControlElements.forEach((formControlElement) => {
        //remove required validator
        const formControl = this.oralHearingForm.get(
          formControlElement.getAttribute("formControlName")
        );
        this.removeRequiredValidatorFromFormControl(formControl);
      });
    });

    this.documentAndCommunicationForm.reset();
    this.certificateForm.reset();
    this.dateAndSignatureForm.reset();
  }

  private removeRequiredValidatorFromFormControl(formControl: any) {
    formControl.removeValidators(this.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event("change");
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
