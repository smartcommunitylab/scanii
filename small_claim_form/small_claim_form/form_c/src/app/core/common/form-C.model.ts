export class FormC {
  private _stepTwo: any;

  constructor(stepTwo: any) {
    this._stepTwo = stepTwo;
  }

  get stepTwo(): any {
    return this._stepTwo;
  }

  toJSON() {
    const { _stepTwo } = this;
    return {
      stepTwo: _stepTwo,
    };
  }
}
