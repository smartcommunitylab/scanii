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
import { StepOne } from "./step-one.model";
import { stepOneShowHideFields } from "src/app/shared/constants/step-one.constants";

@Injectable({
  providedIn: "root",
})
export class StepOneService {
  requiredValidator = Validators.required;
  previousSelectedRadioButton = { value: "", divIdToExpand: "", extendibleInternalDivIds: [] };
  currentSelectedRadioButton = { value: "", divIdToExpand: "", extendibleInternalDivIds: [] };

  areAllClaimApprovalRadioButtonsUnchecked = true;
  yesClaimApprovalRadioButton = false;
  noClaimApprovalRadioButton = false;
  partialClaimApprovalRadioButton = false;

  onStableSubscription: Subscription;

  firstPart = this.fb.group({
    claimant: [""],
    defendant: [""],
    court: [""],
    claim: [""],
    caseNumber: [""],
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
    claimApproval: [""],
    negativePartialApproval: this.negativePartialApproval,
    oralHearingRequest: [""],
    oralHearingReasons: [""],
    oralHearingPhysicallyPresence: [""],
    oralHearingPhysicallyPresenceReasons: [""],
    proceedingsCostClaim: [""],
    proceedingsCostClaimText: [""],
    counterclaim: [""],
    electronicJudgmentAgreement: [""],
    electronicCommunicationAgreement: [""],
    otherInformation: [""],
    doneAt: [""],
    date: [""],
    nameSignature: [""],
  });

  form = this.fb.group({
    firstPart: this.firstPart,
    secondPart: this.secondPart,
  });

  constructor(private fb: UntypedFormBuilder, private zone: NgZone) {}

  isStepOneFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.form.invalid) {
        this.markStepOneFormAsDirty(this.form);
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step1", isValid));
    });
  }

  markStepOneFormAsDirty(formGroup: UntypedFormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = this.getFormControl(formElementName);

      if (formElement instanceof UntypedFormGroup) {
        if (formElementName in stepOneShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);

          if (
            formElementName === "negativePartialApproval" &&
            stepOneShowHideFields[formElementName]["triggeringValues"].includes(
              value
            )
          ) {
            this.markStepOneFormAsDirty(formElement);
          }
        } else {
          this.markStepOneFormAsDirty(formElement);
        }
      } else {
        if (formElementName in stepOneShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);

          if (
            value === stepOneShowHideFields[formElementName]["triggeringValue"]
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
      stepOneShowHideFields[formElementName]["triggeringFormControlName"]
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

  setStepOneForm(stepOne: any): Promise<void> {
    this.resetAll();
    this.form.patchValue(stepOne);
    return this.handleStableEvent(stepOne);
  }

  private handleStableEvent(stepOne: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        for (const key of Object.keys(stepOneShowHideFields)) {
          const value = this.getJsonValue(
            stepOneShowHideFields[key]["triggeringFormControlName"],
            stepOne
          );

          if (value && key === "negativePartialApproval") {
            const index = stepOneShowHideFields[key][
              "triggeringValues"
            ].findIndex((element) => {
              return element === value;
            });

            this.triggerClickEvent(
              stepOneShowHideFields[key]["triggeringFieldIds"][index]
            );
          } else {
            if (value === stepOneShowHideFields[key]["triggeringValue"]) {
              this.triggerChangeEvent(
                stepOneShowHideFields[key]["triggeringFieldId"]
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
    this.previousSelectedRadioButton = { value: "", divIdToExpand: "", extendibleInternalDivIds: [] };
    this.currentSelectedRadioButton = { value: "", divIdToExpand: "", extendibleInternalDivIds: [] };
    this.areAllClaimApprovalRadioButtonsUnchecked = true;
    this.yesClaimApprovalRadioButton = false;
    this.noClaimApprovalRadioButton = false;
    this.partialClaimApprovalRadioButton = false;
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

  getStepOne(): StepOne {
    const languages = this.form.get("languages").value;
    const languagesNames: string[] = [];
    // for (let i = 0; i < languages.length; i++) {
    //   const language = this.europeanLanguages.find((europeanLanguage) => {
    //     return europeanLanguage.value === languages[i];
    //   });
    //   if (language) {
    //     languagesNames.push(language.label);
    //   } else {
    //     languagesNames.push(languages[i]);
    //   }
    // }

    const expiryDate = this.form.get("expiryDate").value;
    const doneAt = this.form.get("doneAt").value;
    const date = this.form.get("date").value;
    const statement = this.form.get("statement").value;

    return new StepOne(
      expiryDate,
      doneAt,
      date,
      languages,
      languagesNames,
      statement
    );
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
