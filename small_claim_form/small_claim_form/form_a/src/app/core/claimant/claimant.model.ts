import { Citizen } from "../common/citizen.model";
import { Organisation } from "../common/organisation.model";
import { Representative } from "../common/representative.model";

export class Claimant {
  private _claimant: Organisation | Citizen;
  private _representative: Representative;
  private _otherDetails: string;

  constructor(
    claimant: Organisation | Citizen,
    representative: Representative,
    otherDetails: string
  ) {
    this._claimant = claimant;
    this._representative = representative;
    this._otherDetails = otherDetails;
  }

  get claimant(): Organisation | Citizen {
    return this._claimant;
  }

  get representative(): Representative {
    return this._representative;
  }

  get otherDetails(): string {
    return this._otherDetails;
  }
}
