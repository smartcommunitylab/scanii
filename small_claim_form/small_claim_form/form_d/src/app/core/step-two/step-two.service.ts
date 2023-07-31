import { Injectable } from "@angular/core";
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
    supersededJudgmentDate: [""],
    supersededJudgmentCaseNumber: [""],
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

  constructor(private fb: UntypedFormBuilder) {}

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
        this.markStepTwoFormAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step2", isValid));
    });
  }

  markStepTwoFormAsDirty() {
    for (const formElementName in this.form.controls) {
      const formElement = this.form.get(formElementName);
      this.markAsDirty(formElement);
    }
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
    return new Promise<void>((resolve) => {
      this.resetAll();

      //a maximum of three languages can be selected. So, if the length of the array is greater than 3, the last elements are removed
      if (stepTwo.languages.length > 3) {
        stepTwo.languages = stepTwo.languages.slice(0, 3);
      }

      this.form.patchValue(stepTwo);
      resolve();
    });
  }

  private resetAll() {
    this.form.reset();
    $("#dynformSCB2Language").find(".added-option").remove();
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
