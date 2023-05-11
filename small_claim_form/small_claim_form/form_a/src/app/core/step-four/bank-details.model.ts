import { ApplicationFeePayment } from './application-fee-payment.modal';
import { BankTransfer } from './bank-transfer.model';

export class BankDetails {
  private _applicationFeePayment?: ApplicationFeePayment;
  private _claimantBankAccount?: BankTransfer;

  public get applicationFeePayment(): ApplicationFeePayment {
    return this._applicationFeePayment;
  }
  public set applicationFeePayment(value: ApplicationFeePayment) {
    this._applicationFeePayment = value;
  }
  public get claimantBankAccount(): BankTransfer {
    return this._claimantBankAccount;
  }
  public set claimantBankAccount(value: BankTransfer) {
    this._claimantBankAccount = value;
  }
}
