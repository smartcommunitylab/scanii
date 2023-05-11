export class To {
  private _toOption: string;
  private _toDate?: Date;

  constructor(toOption: string, toDate?: Date) {
    this._toOption = toOption;
    if (toDate) this._toDate = toDate;
  }
}
