import { Injectable, NgZone } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { PromiseContent } from "../common/promise-content.model";
import { Subscription } from "rxjs";
import { StepTwo } from "./step-two.model";
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

  areJudgmentSettlementRadioButtonsUnchecked = true;
  judgmentRadioButton = false;
  settlementRadioButton = false;

  onStableSubscription: Subscription;

  supersededJudgmentExpansion = this.fb.group({
    supersededJudgmentDate: [""],
    supersededJudgmentCaseNumber: [""],
  });

  judgment = this.fb.group({
    judgmentDate: [""],
    judgmentCaseNumber: [""],
    courtOrder: [""],
    judgmentPaymentRecipient: [""],
    judgmentPrincipal: ["", this.amountValidator()],
    judgmentInterest: [""],
    judgmentCosts: ["", this.amountValidator()],
    respondent: [""],
    courtOrderAgainst: [""],
    courtOrderTo: [""],
    supersededJudgment: [false],
    supersededJudgmentExpansion: this.supersededJudgmentExpansion,
  });

  settlement = this.fb.group({
    settlementDate: [""],
    settlementCaseNumber: [""],
    firstSettlementAgreement: [""],
    settlementPaymentRecipient: [""],
    settlementPrincipal: ["", this.amountValidator()],
    settlementInterest: [""],
    settlementCosts: ["", this.amountValidator()],
    secondSettlementAgreement: [""],
    agreedAction: [""],
  });

  form = this.fb.group({
    judgmentOrSettlement: ["", [Validators.required]],
    judgment: this.judgment,
    settlement: this.settlement,
    doneAt: ["", [Validators.required]],
    date: ["", [Validators.required]],
  });

  constructor(private fb: UntypedFormBuilder, private zone: NgZone) {}

  private amountValidator(): ValidatorFn {
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

  isStepTwoFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.form.invalid) {
        this.markStepTwoFormAsDirty(this.form);
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step2", isValid));
    });
  }

  markStepTwoFormAsDirty(formGroup: UntypedFormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = this.getFormControl(formElementName);

      if (formElement instanceof UntypedFormGroup) {
        if (formElementName in stepTwoShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);

          if (
            value === stepTwoShowHideFields[formElementName]["triggeringValue"]
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

  setStepTwoForm(stepTwo: any): Promise<void> {
    this.resetAll();
    this.form.patchValue(stepTwo);
    return this.handleStableEvent(stepTwo);
  }

  private handleStableEvent(stepTwo: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        const supersededJudgementExpansion =
          stepTwoShowHideFields["supersededJudgementExpansion"];

        const value = this.getJsonValue(
          supersededJudgementExpansion["triggeringFormControlName"],
          stepTwo
        );
        if (value === supersededJudgementExpansion["triggeringValue"]) {
          //trigger change event to expand the div with id "dynformSCD2WasJudgmentGivenAppealCourt_div"
          this.triggerChangeEvent(
            supersededJudgementExpansion["triggeringFieldId"]
          );
        }

        if (stepTwo.judgmentOrSettlement) {
          //trigger the click event for either judgment radio button or settlement radio button
          this.triggerClickEvent(
            stepTwoShowHideFields[stepTwo.judgmentOrSettlement][
              "triggeringFieldId"
            ]
          );
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
    this.areJudgmentSettlementRadioButtonsUnchecked = true;
    this.judgmentRadioButton = false;
    this.settlementRadioButton = false;
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

  // getStepTwo(): StepTwo {
  //   const languages = this.form.get("languages").value;
  //   const languagesNames: string[] = [];
  //   for (let i = 0; i < languages.length; i++) {
  //     const language = this.europeanLanguages.find((europeanLanguage) => {
  //       return europeanLanguage.value === languages[i];
  //     });
  //     if (language) {
  //       languagesNames.push(language.label);
  //     } else {
  //       languagesNames.push(languages[i]);
  //     }
  //   }

  //   const expiryDate = this.form.get("expiryDate").value;
  //   const doneAt = this.form.get("doneAt").value;
  //   const date = this.form.get("date").value;
  //   const statement = this.form.get("statement").value;

  //   return new StepTwo(
  //     expiryDate,
  //     doneAt,
  //     date,
  //     languages,
  //     languagesNames,
  //     statement
  //   );
  // }
}
