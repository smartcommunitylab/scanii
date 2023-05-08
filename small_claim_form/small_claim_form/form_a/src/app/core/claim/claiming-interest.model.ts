import { ContractualInterest } from './contractual-interest.model';
import { StatutoryInterest } from './statutory-interest.model';

export class ClaimingInterest {
  private _isYes: boolean;
  private _interestType: string;
  private _contractualInterest?: ContractualInterest;
  private _statutoryInterest?: StatutoryInterest;

  constructor(isYes: boolean, interestType: string) {
    this._isYes = isYes;
    this._interestType = interestType;
  }

  public get isYes(): boolean {
    return this._isYes;
  }
  public set isYes(value: boolean) {
    this._isYes = value;
  }
  public get interestType(): string {
    return this._interestType;
  }
  public set interestType(value: string) {
    this._interestType = value;
  }
  public get contractualInterest(): ContractualInterest {
    return this._contractualInterest;
  }
  public set contractualInterest(value: ContractualInterest) {
    this._contractualInterest = value;
  }
  public get statutoryInterest(): StatutoryInterest {
    return this._statutoryInterest;
  }
  public set statutoryInterest(value: StatutoryInterest) {
    this._statutoryInterest = value;
  }
}
