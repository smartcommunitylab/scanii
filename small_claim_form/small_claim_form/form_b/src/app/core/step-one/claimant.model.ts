import { Citizen } from "./citizen.model";
import { Organisation } from "./organisation.model";
import { RepresentativeCitizen } from "./representative-citizen.model";
import { RepresentativeOrganisation } from "./representative-organisation.model";

export class Claimant {
  private _claimant: Organisation | Citizen;
  private _representative: RepresentativeCitizen | RepresentativeOrganisation;
  private _otherDetails: string;

  constructor(
    claimant: Organisation | Citizen,
    representative: RepresentativeCitizen | RepresentativeOrganisation,
    otherDetails: string
  ) {
    this._claimant = claimant;
    this._representative = representative;
    this._otherDetails = otherDetails;
  }

  get claimant(): Organisation | Citizen {
    return this._claimant;
  }

  get representative(): RepresentativeCitizen | RepresentativeOrganisation {
    return this._representative;
  }

  get otherDetails(): string {
    return this._otherDetails;
  }
}
