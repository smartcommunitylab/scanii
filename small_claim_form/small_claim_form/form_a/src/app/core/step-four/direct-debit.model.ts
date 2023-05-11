export class DirectDebit {
  private _accountHolder: string;
  private _bicOrBankName: string;
  private _accountNumberOrIBAN: string;

  constructor(
    accountHolder: string,
    bicOrBankName: string,
    accountNumberOrIBAN: string
  ) {
    this._accountHolder = accountHolder;
    this._bicOrBankName = bicOrBankName;
    this._accountNumberOrIBAN = accountNumberOrIBAN;
  }
}
