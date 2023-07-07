export class OtherClaim {
  private _isYes: boolean;
  private _description?: string;
  private _value?: number;
  private _currency?: string;
  private _currencyName?: string;

  constructor(
    isYes: boolean,
    description?: string,
    value?: number,
    currency?: string,
    currencyName?: string
  ) {
    this._isYes = isYes;
    if (description) this._description = description;
    if (value) this._value = value;
    if (currency) this._currency = currency;
    if (currencyName) this._currencyName = currencyName;
  }

  public get isYes(): boolean {
    return this._isYes;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get value(): number | undefined {
    return this._value;
  }

  public get currency(): string | undefined {
    return this._currency;
  }

  public get currencyName(): string | undefined {
    return this._currencyName;
  }
}
