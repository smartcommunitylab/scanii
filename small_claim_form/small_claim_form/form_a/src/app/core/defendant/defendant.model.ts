import { Citizen } from "../common/citizen.model";
import { Organisation } from "../common/organisation.model";
import { RepresentativeCitizen } from "../common/representative-citizen.model";
import { RepresentativeOrganisation } from "../common/representative-organisation.model";

export class Defendant {
  private _defendant: Organisation | Citizen;
  private _representative: RepresentativeCitizen | RepresentativeOrganisation;
  private _otherDetails: string;

  constructor(
    defendant: Organisation | Citizen,
    representative: RepresentativeCitizen | RepresentativeOrganisation,
    otherDetails: string
  ) {
    this._defendant = defendant;
    this._representative = representative;
    this._otherDetails = otherDetails;
  }

  get defendant(): Organisation | Citizen {
    return this._defendant;
  }

  get representative(): RepresentativeCitizen | RepresentativeOrganisation {
    return this._representative;
  }

  get otherDetails(): string {
    return this._otherDetails;
  }
}
