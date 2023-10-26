import { Injectable, NgZone } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { PromiseContent } from "../common/promise-content.model";
import { Subscription } from "rxjs";
import { stepTwoShowHideFields } from "src/app/shared/constants/step-two.constants";

@Injectable({
  providedIn: "root",
})
export class StepTwoService {
  requiredValidator = Validators.required;
  previousSelectedRadioButton = {
    value: "",
    divIdToExpand: "",
    extendibleInternalDivIds: [],
  };
  currentSelectedRadioButton = {
    value: "",
    divIdToExpand: "",
    extendibleInternalDivIds: [],
  };

  areAllClaimApprovalRadioButtonsUnchecked = true;
  yesClaimApprovalRadioButton = false;
  noClaimApprovalRadioButton = false;
  partialClaimApprovalRadioButton = false;

  onStableSubscription: Subscription;

  firstPart = this.fb.group({
    claimant: ["", [Validators.required]],
    defendant: ["", [Validators.required]],
    court: ["", [Validators.required]],
    claim: ["", [Validators.required]],
    caseNumber: ["", [Validators.required]],
  });

  negativePartialApproval = this.fb.group({
    outsideScope: [""],
    outsideScopeText: [""],
    other: [""],
    otherText: [""],
    writtenEvidence: [""],
    writtenEvidenceText: [""],
    witnesses: [""],
    witnessesText: [""],
    otherEvidence: [""],
    otherEvidenceText: [""],
  });

  secondPart = this.fb.group({
    claimApproval: ["", [Validators.required]],
    negativePartialApproval: this.negativePartialApproval,
    oralHearingRequest: ["", [Validators.required]],
    oralHearingReasons: [""],
    oralHearingPhysicallyPresence: ["", [Validators.required]],
    oralHearingPhysicallyPresenceReasons: [""],
    proceedingsCostClaim: ["", [Validators.required]],
    proceedingsCostClaimText: [""],
    counterclaim: ["", [Validators.required]],
    electronicJudgmentAgreement: ["", [Validators.required]],
    electronicCommunicationAgreement: ["", [Validators.required]],
    otherInformation: [""],
    doneAt: ["", [Validators.required]],
    date: ["", [Validators.required]],
    nameSignature: [""],
  });

  form = this.fb.group({
    firstPart: this.firstPart,
    secondPart: this.secondPart,
  });

  constructor(private fb: UntypedFormBuilder, private zone: NgZone) {}

  isStepTwoFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.form.invalid) {
        this.markStepTwoFormAsDirty(this.form);
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step1", isValid));
    });
  }

  markStepTwoFormAsDirty(formGroup: UntypedFormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = this.getFormControl(formElementName);

      if (formElement instanceof UntypedFormGroup) {
        if (formElementName in stepTwoShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);

          if (
            formElementName === "negativePartialApproval" &&
            stepTwoShowHideFields[formElementName]["triggeringValues"].includes(
              value
            )
          ) {
            this.markStepTwoFormAsDirty(formElement);
          }
        } else {
          this.markStepTwoFormAsDirty(formElement);
        }
      } else {
        if (formElementName in stepTwoShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);

          if (
            value === stepTwoShowHideFields[formElementName]["triggeringValue"]
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
      stepTwoShowHideFields[formElementName]["triggeringFormControlName"]
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

  setStepTwoForm(stepTwo: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.resetAll();
      let foundErrors = false;

      try {
        this.form.setValue(stepTwo);
      } catch (error) {
        foundErrors = true;
        reject(error);
      }

      if (!foundErrors) {
        this.handleStableEvent(stepTwo).then(() => {
          resolve(null);
        });
      }
    });
  }

  private handleStableEvent(stepTwo: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        for (const key of Object.keys(stepTwoShowHideFields)) {
          const value = this.getJsonValue(
            stepTwoShowHideFields[key]["triggeringFormControlName"],
            stepTwo
          );

          if (value && key === "negativePartialApproval") {
            const index = stepTwoShowHideFields[key][
              "triggeringValues"
            ].findIndex((element) => {
              return element === value;
            });

            if (index !== -1) {
              this.triggerClickEvent(
                stepTwoShowHideFields[key]["triggeringFieldIds"][index]
              );
            } else {
              this.triggerClickEvent("dynforms_Yes_First_Capital");
            }
          } else {
            if (value === stepTwoShowHideFields[key]["triggeringValue"]) {
              this.triggerChangeEvent(
                stepTwoShowHideFields[key]["triggeringFieldId"]
              );
            }
          }
        }

        resolve();
      });
    });
  }

  private resetAll() {
    this.form.reset();
    this.previousSelectedRadioButton = {
      value: "",
      divIdToExpand: "",
      extendibleInternalDivIds: [],
    };
    this.currentSelectedRadioButton = {
      value: "",
      divIdToExpand: "",
      extendibleInternalDivIds: [],
    };

    this.areAllClaimApprovalRadioButtonsUnchecked = true;

    if (this.yesClaimApprovalRadioButton) {
      this.triggerClickEvent("dynforms_Yes_First_Capital");
      this.yesClaimApprovalRadioButton = false;
    }
    if (this.noClaimApprovalRadioButton) {
      this.triggerClickEvent("dynforms_No_First_Capital");
      this.noClaimApprovalRadioButton = false;
    }
    if (this.partialClaimApprovalRadioButton) {
      this.triggerClickEvent("dynforms_Partially");
      this.partialClaimApprovalRadioButton = false;
    }
  }

  private getJsonValue(key: string, claim: any): any {
    const formGroupNames = this.findFormGroupNames(key, this.form);

    let value = claim;
    for (let i = 0; i < formGroupNames.length; i++) {
      value = value[formGroupNames[i]];
    }
    return value[key];
  }

  private triggerClickEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event("click");
    inputElement.dispatchEvent(event);
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event("change");
    inputElement.dispatchEvent(event);
  }

  getFormControl(formControlName: string): AbstractControl {
    const formGroupNames = this.findFormGroupNames(formControlName, this.form);
    let formGroup = this.form;
    for (let i = 0; i < formGroupNames.length; i++) {
      formGroup = formGroup.get(formGroupNames[i]) as UntypedFormGroup;
    }
    return formGroup.get(formControlName);
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
