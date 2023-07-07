import { To } from "../common/to.model";

export class StatutoryInterest {
  private _fromDate: Date;
  private _to: To;

  constructor(fromDate: Date, to: To) {
    this._fromDate = fromDate;
    this._to = to;
  }

  public get fromDate(): Date {
    return this._fromDate;
  }

  public get to(): To {
    return this._to;
  }
}
