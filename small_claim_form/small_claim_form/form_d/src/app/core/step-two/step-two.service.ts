import { Injectable } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
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

  areJudgementSettlementRadioButtonsUnchecked = true;
  judgementRadioButton = false;
  settlementRadioButton = false;

  onStableSubscription: Subscription;

  judgement = this.fb.group({
    judgementDate: ["", [Validators.required]],
    judgementCaseNumber: ["", [Validators.required]],
    courtOrder: [""],
    judgementPaymentRecipient: [""],
    judgementPrincipal: [""],
    judgementInterest: [""],
    judgementCosts: [""],
    respondent: [""],
    courtOrderAgainst: [""],
    courtOrderTo: [""],
    supersededJudgmentDate: [""],
    supersededJudgmentCaseNumber: [""],
  });

  settlement = this.fb.group({
    settlementDate: ["", [Validators.required]],
    settlementCaseNumber: ["", [Validators.required]],
    firstSettlementAgreement: [""],
    settlementPaymentRecipient: [""],
    settlementPrincipal: [""],
    settlementInterest: [""],
    settlementCosts: [""],
    secondSettlementAgreement: [""],
    agreedAction: [""],
  });

  form = this.fb.group({
    judgementOrSettlement: ["", [Validators.required]],
    judgement: this.judgement,
    settlement: this.settlement,
    doneAt: ["", [Validators.required]],
    date: ["", [Validators.required]],
  });

  constructor(private fb: UntypedFormBuilder) {}

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
