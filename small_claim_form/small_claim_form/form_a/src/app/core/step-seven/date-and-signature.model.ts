export class DateAndSignature {
  private _city: string;
  private _date: Date;
  private _sign: string;

  constructor(city: string, date: Date, sign: string) {
    this._city = city;
    this._date = date;
    this._sign = sign;
  }
}
