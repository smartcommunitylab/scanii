export class FormC {
  private _stepOne: any;

  constructor(stepOne: any) {
    this._stepOne = stepOne;
  }

  get stepOne(): any {
    return this._stepOne;
  }

  toJSON() {
    const { _stepOne } = this;
    return {
      stepOne: _stepOne,
    };
  }
}
