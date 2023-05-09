export class ClaimForMoney {
  private _isYes: boolean;
  private _principalAmount?: number;
  private _currency?: string;

  constructor(isYes: boolean, principalAmount?: number, currency?: string) {
    this._isYes = isYes;
    if (principalAmount) this._principalAmount = principalAmount;
    if (currency) this._currency = currency;
  }
}
