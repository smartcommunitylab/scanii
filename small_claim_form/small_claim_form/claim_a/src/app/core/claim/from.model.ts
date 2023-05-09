export class From {
  private _fromOption: string;
  private _fromDate?: Date;
  private _fromEvent?: string;

  constructor(fromOption: string) {
    this._fromOption = fromOption;
  }

  public get fromOption(): string {
    return this._fromOption;
  }
  public set fromOption(value: string) {
    this._fromOption = value;
  }
  public get fromDate(): Date {
    return this._fromDate;
  }
  public set fromDate(value: Date) {
    this._fromDate = value;
  }
  public get fromEvent(): string {
    return this._fromEvent;
  }
  public set fromEvent(value: string) {
    this._fromEvent = value;
  }
}
