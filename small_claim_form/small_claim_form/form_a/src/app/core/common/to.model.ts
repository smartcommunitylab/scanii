export class To {
  private _toOption: string;
  private _toDate?: string;

  constructor(toOption: string, toDate?: string) {
    this._toOption = toOption;
    if (toDate) this._toDate = toDate;
  }

  public get toOption(): string {
    return this._toOption;
  }

  public get toDate(): string | undefined {
    return this._toDate;
  }
}
