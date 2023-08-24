import { StatutoryInterest } from "./statutory-interest.model";
import { Injectable, NgZone } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { PromiseContent } from "../common/promise-content.model";
import { claimShowHideFields } from "src/app/shared/constants/claim.constants";
import { Subscription } from "rxjs";
import { ClaimForMoney } from "./claim-for-money.model";
import { OtherClaim } from "./other-claim.model";
import { ContractualInterest } from "./contractual-interest.model";
import { TranslateService } from "@ngx-translate/core";
import { To } from "../common/to.model";
import { ClaimingInterest } from "./claiming-interest.model";
import { ClaimingInterestOnCost } from "./claiming-interest-on-cost.model";
import { From } from "./from.model";

@Injectable({
  providedIn: "root",
})
export class ClaimService {
  requiredValidator = Validators.required;
  europeanCurrencies: { value: string; label: string }[] = [];
  worldCurrencies: { value: string; label: string }[] = [];
  worldAndHistoricalCurrencies: { value: string; label: string }[] = [];

  claimForMoneyExpansionForm = this.fb.group({
    principalAmount: ["", this.amountValidator()],
    claimForMoneyCurrency: [],
    claimForMoneyCurrencyOther: [""],
    claimForMoneyCurrencyHistorical: [""],
    claimForMoneyCurrencyHistoricalCheckbox: [""],
  });

  otherClaimExpansionForm = this.fb.group({
    claimDescription: [""],
    claimValue: ["", this.amountValidator()],
    otherClaimCurrency: [],
    otherClaimCurrencyOther: [""],
    otherClaimCurrencyHistorical: [""],
    otherClaimCurrencyHistoricalCheckbox: [""],
  });

  claimingCostProceedingsExpansionForm = this.fb.group({
    costsDetails: [""],
  });

  contractualInterest = this.fb.group(
    {
      interestPercentage: [""],
      percentagePointsAboveECB: [""],
      contractualInterestOther: [""],
      contractualInterestFromDate: [""],
      contractualInterestTo: [""],
      contractualInterestToDate: [""],
    },
    { validator: this.validateDates }
  );

  statutoryInterest = this.fb.group(
    {
      statutoryInterestFromDate: [""],
      statutoryInterestTo: [""],
      statutoryInterestToDate: [""],
    },
    { validator: this.validateDates }
  );

  claimingInterestExpansion = this.fb.group({
    claimingInterestOption: [""],
    contractualInterest: this.contractualInterest,
    statutoryInterest: this.statutoryInterest,
  });

  claimingInterestOnCostExpansion = this.fb.group(
    {
      claimingInterestOnCostFrom: [""],
      claimingInterestOnCostFromDate: [""],
      claimingInterestOnCostFromEvent: [""],
      claimingInterestOnCostTo: [""],
      claimingInterestOnCostToDate: [""],
    },
    { validator: this.validateDates }
  );

  editForm = this.fb.group({
    claimForMoney: ["", [this.requiredValidator]],
    claimForMoneyExpansion: this.claimForMoneyExpansionForm,
    otherClaim: ["", [this.requiredValidator]],
    otherClaimExpansion: this.otherClaimExpansionForm,
    claimingCostProceedings: ["", [this.requiredValidator]],
    claimingCostProceedingsExpansion: this.claimingCostProceedingsExpansionForm,
    claimingInterest: ["", [this.requiredValidator]],
    claimingInterestExpansion: this.claimingInterestExpansion,
    claimingInterestOnCost: ["", [this.requiredValidator]],
    claimingInterestOnCostExpansion: this.claimingInterestOnCostExpansion,
  });

  areIncludedClaimForMoneyHistoricalCurrencies = false;
  areIncludedOtherClaimHistoricalCurrencies = false;

  onStableSubscription: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private zone: NgZone,
    private translateService: TranslateService
  ) {}

  validateDates(
    formGroup: UntypedFormGroup
  ): { [key: string]: boolean } | null {
    let fromDateFormControlName: string;
    let toDateFormControlName: string;

    if (
      Object.keys(formGroup.controls).includes("contractualInterestFromDate") &&
      Object.keys(formGroup.controls).includes("contractualInterestToDate")
    ) {
      fromDateFormControlName = "contractualInterestFromDate";
      toDateFormControlName = "contractualInterestToDate";
    } else if (
      Object.keys(formGroup.controls).includes("statutoryInterestFromDate") &&
      Object.keys(formGroup.controls).includes("statutoryInterestToDate")
    ) {
      fromDateFormControlName = "statutoryInterestFromDate";
      toDateFormControlName = "statutoryInterestToDate";
    } else if (
      Object.keys(formGroup.controls).includes(
        "claimingInterestOnCostFromDate"
      ) &&
      Object.keys(formGroup.controls).includes("claimingInterestOnCostToDate")
    ) {
      fromDateFormControlName = "claimingInterestOnCostFromDate";
      toDateFormControlName = "claimingInterestOnCostToDate";
    }

    const fromStringDate = formGroup.get(fromDateFormControlName).value;
    const toStringDate = formGroup.get(toDateFormControlName).value;

    if (fromStringDate && toStringDate) {
      const fromDateParts = fromStringDate.split("/");
      const fromDate = new Date(
        +fromDateParts[2],
        fromDateParts[1] - 1,
        +fromDateParts[0]
      );

      const toDateParts = toStringDate.split("/");
      const toDate = new Date(
        +toDateParts[2],
        toDateParts[1] - 1,
        +toDateParts[0]
      );

      if (fromDate && toDate && fromDate >= toDate) {
        return { fromDateAfterToDate: true };
      }
    }
    return null;
  }

  amountValidator(): ValidatorFn {
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

  isClaimFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        this.markClaimFormAsDirty(this.editForm);
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step5", isValid));
    });
  }

  getClaimForMoney(): ClaimForMoney {
    const isYes = this.editForm.get("claimForMoney").value === "yes";

    if (isYes) {
      const principalAmount = this.editForm.get(
        "claimForMoneyExpansion.principalAmount"
      ).value;

      const currency = this.getCurrency("claimForMoneyExpansion.claimForMoney");

      return new ClaimForMoney(
        isYes,
        principalAmount,
        currency.currencyId,
        currency.currencyName
      );
    } else return new ClaimForMoney(isYes);
  }

  getOtherClaim(): OtherClaim {
    const isYes = this.editForm.get("otherClaim").value === "yes";

    if (isYes) {
      const description = this.editForm.get(
        "otherClaimExpansion.claimDescription"
      ).value;

      const value = this.editForm.get("otherClaimExpansion.claimValue").value;

      const currency = this.getCurrency("otherClaimExpansion.otherClaim");

      return new OtherClaim(
        isYes,
        description,
        value,
        currency.currencyId,
        currency.currencyName
      );
    } else return new OtherClaim(isYes);
  }

  getClaimingInterest(): ClaimingInterest {
    const isYes = this.editForm.get("claimingInterest").value === "yes";

    if (isYes) {
      const interestType = this.editForm.get(
        "claimingInterestExpansion.claimingInterestOption"
      ).value;

      let contractualInterest: ContractualInterest;
      let statutoryInterest: StatutoryInterest;

      if (interestType === "contractual")
        contractualInterest = this.getContractualInterest();
      else if (interestType === "statutory")
        statutoryInterest = this.getStatutoryInterest();

      return new ClaimingInterest(
        isYes,
        interestType,
        contractualInterest,
        statutoryInterest
      );
    } else return new ClaimingInterest(isYes);
  }

  private getContractualInterest(): ContractualInterest {
    const interestPercentage = this.editForm.get(
      "claimingInterestExpansion.contractualInterest.interestPercentage"
    ).value;

    const percentagePointsAboveECB = this.editForm.get(
      "claimingInterestExpansion.contractualInterest.percentagePointsAboveECB"
    ).value;

    const other = this.editForm.get(
      "claimingInterestExpansion.contractualInterest.contractualInterestOther"
    ).value;

    const fromDate = this.editForm.get(
      "claimingInterestExpansion.contractualInterest.contractualInterestFromDate"
    ).value;

    const to = this.getTo(
      "claimingInterestExpansion.contractualInterest.contractualInterest",
      "01"
    );

    return new ContractualInterest(
      fromDate,
      to,
      interestPercentage,
      percentagePointsAboveECB,
      other
    );
  }

  private getStatutoryInterest(): StatutoryInterest {
    const fromDate = this.editForm.get(
      "claimingInterestExpansion.statutoryInterest.statutoryInterestFromDate"
    ).value;

    const to = this.getTo(
      "claimingInterestExpansion.statutoryInterest.statutoryInterest",
      "01"
    );

    return new StatutoryInterest(fromDate, to);
  }

  getClaimingInterestOnCost(): ClaimingInterestOnCost {
    const isYes = this.editForm.get("claimingInterestOnCost").value === "yes";

    if (isYes) {
      const from = this.getFrom();

      const to = this.getTo(
        "claimingInterestOnCostExpansion.claimingInterestOnCost",
        "02"
      );

      return new ClaimingInterestOnCost(isYes, from, to);
    } else return new ClaimingInterestOnCost(isYes);
  }

  private getTo(prefix: string, value: string): To {
    const toOption = this.editForm.get(prefix + "To").value;

    if (toOption === value) {
      const toDate = this.editForm.get(prefix + "ToDate").value;
      return new To(toOption, toDate);
    } else return new To(toOption);
  }

  private getFrom(): From {
    const fromOption = this.editForm.get(
      "claimingInterestOnCostExpansion.claimingInterestOnCostFrom"
    ).value;
    if (fromOption === "00") {
      const from = new From(fromOption);
      from.fromDate = this.editForm.get(
        "claimingInterestOnCostExpansion.claimingInterestOnCostFromDate"
      ).value;
      return from;
    } else {
      const from = new From(fromOption);
      from.fromEvent = this.editForm.get(
        "claimingInterestOnCostExpansion.claimingInterestOnCostFromEvent"
      ).value;
      return from;
    }
  }

  private getCurrency(prefix: string): {
    currencyId: string;
    currencyName: string;
  } {
    let currencyId = "";
    let currencyName = "";
    //"OO" is the value associated with the "Other (please specify)" option in the dropdown
    if (this.editForm.get(prefix + "Currency").value !== "00") {
      //european currencies
      currencyId = this.editForm.get(prefix + "Currency").value;

      currencyName = this.europeanCurrencies.find(
        (currency) => currency.value === currencyId
      ).label;
    } else if (this.editForm.get(prefix + "CurrencyHistoricalCheckbox").value) {
      //historical and world currencies
      currencyId = this.editForm.get(prefix + "CurrencyHistorical").value;

      currencyName = this.worldAndHistoricalCurrencies.find(
        (currency) => currency.value === currencyId
      ).label;
    } else {
      //world currencies
      currencyId = this.editForm.get(prefix + "CurrencyOther").value;

      currencyName = this.worldCurrencies.find(
        (currency) => currency.value === currencyId
      ).label;
    }
    return { currencyId, currencyName };
  }

  markClaimFormAsDirty(formGroup: UntypedFormGroup) {
    for (const formElementName in formGroup.controls) {
      const formElement = formGroup.get(formElementName);
      if (formElement instanceof UntypedFormGroup) {
        const value = this.getTriggeringFormControlValue(formElementName);
        if (value === claimShowHideFields[formElementName]["triggeringValue"]) {
          this.markClaimFormAsDirty(formElement);
        }
      } else {
        if (formElementName in claimShowHideFields) {
          const value = this.getTriggeringFormControlValue(formElementName);
          if (
            value === claimShowHideFields[formElementName]["triggeringValue"]
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
      claimShowHideFields[formElementName]["triggeringFormControlName"]
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

  getFormControl(formControlName: string): AbstractControl {
    const formGroupNames = this.findFormGroupNames(
      formControlName,
      this.editForm
    );
    let formGroup = this.editForm;
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

  setClaimForm(claim: any): Promise<void> {
    this.resetAll();
    if (claim.claimForMoneyExpansion.claimForMoneyCurrencyHistoricalCheckbox)
      this.areIncludedClaimForMoneyHistoricalCurrencies = true;
    if (claim.otherClaimExpansion.otherClaimCurrencyHistoricalCheckbox)
      this.areIncludedOtherClaimHistoricalCurrencies = true;
    this.editForm.patchValue(claim);
    return this.handleStableEvent(claim);
  }

  private handleStableEvent(claim: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        const filteredClaimShowHideFields = Object.keys(claimShowHideFields)
          .filter(
            (key) =>
              key !== "contractualInterest" &&
              key !== "statutoryInterest" &&
              key !== "claimingInterestOnCostFromDate" &&
              key !== "claimingInterestOnCostFromEvent"
          )
          .reduce((obj, key) => {
            obj[key] = claimShowHideFields[key];
            return obj;
          }, {});

        for (const key of Object.keys(filteredClaimShowHideFields)) {
          const value = this.getJsonValue(
            claimShowHideFields[key]["triggeringFormControlName"],
            claim
          );

          if (value === claimShowHideFields[key]["triggeringValue"]) {
            this.triggerChangeEvent(
              claimShowHideFields[key]["triggeringFieldId"]
            );
          }
        }

        this.triggerChangeEventBasedOnValue(
          claim.claimingInterestExpansion.claimingInterestOption,
          "contractualInterest",
          "statutoryInterest"
        );
        this.triggerChangeEventBasedOnValue(
          claim.claimingInterestOnCostExpansion.claimingInterestOnCostFrom,
          "claimingInterestOnCostFromDate",
          "claimingInterestOnCostFromEvent"
        );

        resolve();
      });
    });
  }

  private getJsonValue(key: string, claim: any): any {
    const formGroupNames = this.findFormGroupNames(key, this.editForm);

    let value = claim;
    for (let i = 0; i < formGroupNames.length; i++) {
      value = value[formGroupNames[i]];
    }
    return value[key];
  }

  private triggerChangeEventBasedOnValue(
    value: string,
    firstField: string,
    secondField: string
  ) {
    if (value === claimShowHideFields[firstField]["triggeringValue"]) {
      this.triggerChangeEvent(
        claimShowHideFields[firstField]["triggeringFieldId"]
      );
    } else if (value === claimShowHideFields[secondField]["triggeringValue"]) {
      this.triggerChangeEvent(
        claimShowHideFields[secondField]["triggeringFieldId"]
      );
    }
  }

  private resetAll() {
    this.editForm.reset();

    const expandedElements = document
      .getElementById("step5")
      .querySelectorAll(".df_expanded");
    expandedElements.forEach((expandedElement) => {
      //collapse all expanded elements
      expandedElement.classList.remove("df_expanded");
      expandedElement.classList.add("df_collapsed");

      const formControlElements =
        expandedElement.querySelectorAll("[formControlName]");
      formControlElements.forEach((formControlElement) => {
        //remove required validator
        const formControl = this.getFormControl(
          formControlElement.getAttribute("formControlName")
        );
        this.removeRequiredValidatorFromFormControl(formControl);
      });
    });

    this.areIncludedClaimForMoneyHistoricalCurrencies = false;
    this.areIncludedOtherClaimHistoricalCurrencies = false;
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
}
