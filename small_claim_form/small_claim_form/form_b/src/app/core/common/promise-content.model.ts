export class PromiseContent {
  private _stepId: string;
  private _isValid: boolean;

  constructor(stepId: string, isValid: boolean) {
    this._stepId = stepId;
    this._isValid = isValid;
  }

  get stepId(): string {
    return this._stepId;
  }

  get isValid(): boolean {
    return this._isValid;
  }
}
