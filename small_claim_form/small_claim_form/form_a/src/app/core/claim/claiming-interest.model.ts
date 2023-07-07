import { ContractualInterest } from "./contractual-interest.model";
import { StatutoryInterest } from "./statutory-interest.model";

export class ClaimingInterest {
  private _isYes: boolean;
  private _interestType?: string;
  private _contractualInterest?: ContractualInterest;
  private _statutoryInterest?: StatutoryInterest;

  constructor(
    isYes: boolean,
    interestType?: string,
    contractualInterest?: ContractualInterest,
    statutoryInterest?: StatutoryInterest
  ) {
    this._isYes = isYes;
    if(interestType) this._interestType = interestType;
    if(contractualInterest) this._contractualInterest = contractualInterest;
    if(statutoryInterest) this._statutoryInterest = statutoryInterest;
  }

  public get isYes(): boolean {
    return this._isYes;
  }

  public get interestType(): string | undefined {
    return this._interestType;
  }

  public get contractualInterest(): ContractualInterest | undefined {
    return this._contractualInterest;
  }

  public get statutoryInterest(): StatutoryInterest | undefined {
    return this._statutoryInterest;
  }
}
