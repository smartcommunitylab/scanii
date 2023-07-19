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

@Injectable({
  providedIn: "root",
})
export class StepTwoService {
  europeanLanguages: { value: string; label: string }[] = [];
  onStableSubscription: Subscription;

  form = this.fb.group(
    {
      expiryDate: ["", [Validators.required]],
      languages: [[]],
      statement: [""],
      doneAt: ["", [Validators.required]],
      date: ["", [Validators.required]],
    },
    { validator: this.languagesStatementValidator }
  );

  constructor(private fb: UntypedFormBuilder) {}

  languagesStatementValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const languages = control.get("languages");
    const statement = control.get("statement");

    if (
      (!languages.value || languages.value.length === 0) &&
      (!statement.value || statement.value === "")
    ) {
      return { atLeastOneRequired: true };
    }

    return null;
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
    this.resetAll();
    this.form.patchValue(stepTwo);
    this.setLanguagesSelect();
    return this.handleStableEvent();
  }

  private handleStableEvent(): Promise<void> {
    return new Promise<void>((resolve) => {
      // this.onStableSubscription = this.zone.onStable.subscribe(() => {
      //   if (this.onStableSubscription) {
      //     this.onStableSubscription.unsubscribe();
      //   }

      //   this.triggerChangeEvent("dynformSCA1CourtCountry");

      resolve();
      // });
    });
  }

  private resetAll() {
    this.form.reset();
  }

  setLanguagesSelect() {
    const languages = this.form.get("languages").value;
    const id = "#dynformSCB2Language";
    const $select = $(id);

    for (let i = 0; i < languages.length; i++) {
      const language = this.europeanLanguages.find(
        (europeanLanguage) => {
          return europeanLanguage.value === languages[i];
        }
      );
      if (!language) {
        const optionHTML =
          '<option value="' + languages[i] + '">' + languages[i] + "</option>";
        $select.append(optionHTML);
      }
    }

    $select
      .val(this.form.get("languages").value)
      .trigger("chosen:updated");
  }
}
