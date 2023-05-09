import { CreditCard } from './credit-card.model';
import { DirectDebit } from './direct-debit.model';
import { Other } from './other.model';

export class ApplicationFeePayment {
  private _paymentMethod: string;
  private _creditCard?: CreditCard;
  private _directDebit?: DirectDebit;
  private _other?: Other;

  constructor(paymentMethod: string) {
    this._paymentMethod = paymentMethod;
  }

  public get paymentMethod(): string {
    return this._paymentMethod;
  }
  public set paymentMethod(value: string) {
    this._paymentMethod = value;
  }
  public get creditCard(): CreditCard {
    return this._creditCard;
  }
  public set creditCard(value: CreditCard) {
    this._creditCard = value;
  }
  public get directDebit(): DirectDebit {
    return this._directDebit;
  }
  public set directDebit(value: DirectDebit) {
    this._directDebit = value;
  }
  public get other(): Other {
    return this._other;
  }
  public set other(value: Other) {
    this._other = value;
  }
}
