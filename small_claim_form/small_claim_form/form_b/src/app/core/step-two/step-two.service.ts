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

  setStepTwoForm(stepTwo: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.resetAll();
      let foundErrors = false;

      //a maximum of three languages can be selected. So, if the length of the array is greater than 3, the last elements are removed
      if (stepTwo.languages.length > 3) {
        stepTwo.languages = stepTwo.languages.slice(0, 3);
      }

      try {
        this.form.setValue(stepTwo);
        this.setLanguagesSelect();
      } catch (error) {
        foundErrors = true;
        reject(error);
      }

      if (!foundErrors) {
        resolve(null);
      }
    });
  }

  private resetAll() {
    this.form.reset();
    $("#dynformSCB2Language").find(".added-option").remove();
  }

  setLanguagesSelect() {
    const languages = this.form.get("languages").value;
    const id = "#dynformSCB2Language";
    const $select = $(id);

    for (let i = 0; i < languages.length; i++) {
      const language = this.europeanLanguages.find((europeanLanguage) => {
        return europeanLanguage.value === languages[i];
      });
      if (!language) {
        const optionHTML =
          '<option value="' +
          languages[i] +
          '" class="added-option">' +
          languages[i] +
          "</option>";
        $select.append(optionHTML);
      }
    }

    $select.val(this.form.get("languages").value).trigger("chosen:updated");
  }

  getStepTwo(): StepTwo {
    const languages = this.form.get("languages").value;
    const languagesNames: string[] = [];
    for (let i = 0; i < languages.length; i++) {
      const language = this.europeanLanguages.find((europeanLanguage) => {
        return europeanLanguage.value === languages[i];
      });
      if (language) {
        languagesNames.push(language.label);
      } else {
        languagesNames.push(languages[i]);
      }
    }

    const expiryDate = this.form.get("expiryDate").value;
    const doneAt = this.form.get("doneAt").value;
    const date = this.form.get("date").value;
    const statement = this.form.get("statement").value;

    return new StepTwo(
      expiryDate,
      doneAt,
      date,
      languages,
      languagesNames,
      statement
    );
  }
}
