import { FinalForm } from './final-form.model';
import { IntermediateForm } from './intermediate-form.model';
export class Form {
  private _form_A: {
    intermediateForm: IntermediateForm;
    finalForm: FinalForm;
  };
  public get form_A(): {
    intermediateForm: IntermediateForm;
    finalForm: FinalForm;
  } {
    return this._form_A;
  }
  public set form_A(value: {
    intermediateForm: IntermediateForm;
    finalForm: FinalForm;
  }) {
    this._form_A = value;
  }
}
