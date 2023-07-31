import { Injectable } from "@angular/core";
import { PromiseContent } from "../common/promise-content.model";

@Injectable({
  providedIn: "root",
})
export class StepZeroService {
  constructor() {}

  isStepZeroValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = true;
      resolve(new PromiseContent("step0", isValid));
    });
  }
}
