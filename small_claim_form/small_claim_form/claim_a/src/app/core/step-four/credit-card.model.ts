export class CreditCard {
  private _cardHolder: string;
  private _cardCompany: string;
  private _cardNumber: string;
  private _cardExpireDate: string;
  private _cardSecurityNumber: string;

  constructor(
    cardHolder: string,
    cardCompany: string,
    cardNumber: string,
    cardExpireDate: string,
    cardSecurityNumber: string
  ) {
    this._cardHolder = cardHolder;
    this._cardCompany = cardCompany;
    this._cardNumber = cardNumber;
    this._cardExpireDate = cardExpireDate;
    this._cardSecurityNumber = cardSecurityNumber;
  }
}
