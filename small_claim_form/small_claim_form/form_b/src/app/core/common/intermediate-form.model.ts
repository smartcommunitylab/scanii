export class IntermediateForm {
  private _stepOne: any;
  private _stepTwo: any;

  constructor(stepOne: any, stepTwo: any) {
    this._stepOne = stepOne;
    this._stepTwo = stepTwo;
  }

  get stepOne(): any {
    return this._stepOne;
  }

  get stepTwo(): any {
    return this._stepTwo;
  }

  toJSON() {
    const { _stepOne, _stepTwo } = this;
    return {
      stepOne: _stepOne,
      stepTwo: _stepTwo,
    };
  }
}
