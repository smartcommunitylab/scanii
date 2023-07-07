import { ClaimForMoney } from './claim-for-money.model';
import { ClaimingCostProceedings } from './claiming-cost-proceedings.model';
import { ClaimingInterestOnCost } from './claiming-interest-on-cost.model';
import { ClaimingInterest } from './claiming-interest.model';
import { OtherClaim } from './other-claim.model';

export class Claim {
  private _claimForMoney: ClaimForMoney;
  private _otherClaim: OtherClaim;
  private _claimingCostProceedings: ClaimingCostProceedings;
  private _claimingInterest: ClaimingInterest;
  private _claimingInterestOnCost: ClaimingInterestOnCost;

  constructor(
    claimForMoney: ClaimForMoney,
    otherClaim: OtherClaim,
    claimingCostProceedings: ClaimingCostProceedings,
    claimingInterest: ClaimingInterest,
    claimingInterestOnCost: ClaimingInterestOnCost
  ) {
    this._claimForMoney = claimForMoney;
    this._otherClaim = otherClaim;
    this._claimingCostProceedings = claimingCostProceedings;
    this._claimingInterest = claimingInterest;
    this._claimingInterestOnCost = claimingInterestOnCost;
  }

  public get claimForMoney(): ClaimForMoney {
    return this._claimForMoney;
  }
  public set claimForMoney(value: ClaimForMoney) {
    this._claimForMoney = value;
  }
  public get otherClaim(): OtherClaim {
    return this._otherClaim;
  }
  public set otherClaim(value: OtherClaim) {
    this._otherClaim = value;
  }
  public get claimingCostProceedings(): ClaimingCostProceedings {
    return this._claimingCostProceedings;
  }
  public set claimingCostProceedings(value: ClaimingCostProceedings) {
    this._claimingCostProceedings = value;
  }
  public get claimingInterest(): ClaimingInterest {
    return this._claimingInterest;
  }
  public set claimingInterest(value: ClaimingInterest) {
    this._claimingInterest = value;
  }
  public get claimingInterestOnCost(): ClaimingInterestOnCost {
    return this._claimingInterestOnCost;
  }
  public set claimingInterestOnCost(value: ClaimingInterestOnCost) {
    this._claimingInterestOnCost = value;
  }
}
