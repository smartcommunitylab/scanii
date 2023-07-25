import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PromiseContent } from "../common/promise-content.model";
import { StepOneService } from "../step-one/step-one.service";
import { StepTwoService } from "../step-two/step-two.service";
import exportFromJSON from "export-from-json";
import { FormB } from "../common/form-B.model";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  previousStepId = "step1";
  currentStepId = "step1";

  constructor(
    private stepOneService: StepOneService,
    private stepTwoService: StepTwoService,
    private translateService: TranslateService
  ) {}

  isStepValid(stepId: string): Promise<PromiseContent> | null {
    switch (stepId) {
      case "step1":
        return this.stepOneService.isStepOneFormValid();
      case "step2":
        return this.stepTwoService.isStepTwoFormValid();
      default:
        return null;
    }
  }

  generateJson(): void {
    const fileName = `${this.formatDate(new Date())}_${
      this.translateService.currentLang
    }`;

    exportFromJSON({
      data: { form_B: this.getFormB() },
      fileName,
      exportType: exportFromJSON.types.json,
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}${month}${year}`;
  }

  getFormB(): FormB {
    const formB = new FormB(
      this.stepOneService.form.value,
      this.stepTwoService.form.value
    );
    return formB;
  }
}
