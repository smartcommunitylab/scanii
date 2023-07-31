import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PromiseContent } from "../common/promise-content.model";
import { StepOneService } from "../step-one/step-one.service";
import exportFromJSON from "export-from-json";
import { FormC } from "../common/form-C.model";
import { StepZeroService } from "../step-zero/step-zero.service";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  previousStepId = "step0";
  currentStepId = "step0";

  constructor(
    private stepZeroService: StepZeroService,
    private stepOneService: StepOneService,
    private translateService: TranslateService
  ) {}

  isStepValid(stepId: string): Promise<PromiseContent> | null {
    switch (stepId) {
      case "step0":
        return this.stepZeroService.isStepZeroValid();
      case "step1":
        return this.stepOneService.isStepOneFormValid();
      default:
        return null;
    }
  }

  generateJson(): void {
    const fileName = `${this.formatDate(new Date())}_${
      this.translateService.currentLang
    }`;

    exportFromJSON({
      data: { form_B: this.getFormC() },
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

  getFormC(): FormC {
    const formC = new FormC(
      this.stepOneService.form.value
    );
    return formC;
  }
}
