export class ClaimForMoney {
  private _isYes: boolean;
  private _principalAmount?: number;
  private _currency?: string;
  private _currencyName?: string;

  constructor(
    isYes: boolean,
    principalAmount?: number,
    currency?: string,
    currencyName?: string
  ) {
    this._isYes = isYes;
    if (principalAmount) this._principalAmount = principalAmount;
    if (currency) this._currency = currency;
    if (currencyName) this._currencyName = currencyName;
  }

  public get isYes(): boolean {
    return this._isYes;
  }

  public get principalAmount(): number | undefined {
    return this._principalAmount;
  }

  public get currency(): string | undefined {
    return this._currency;
  }

  public get currencyName(): string | undefined{
    return this._currencyName;
  }
}
