import { Claimant } from "./claimant.model";
import { Court } from "./court.model";
import { Defendant } from "./defendant.model";
import { RepresentativeCitizen } from "./representative-citizen.model";
import { RepresentativeOrganisation } from "./representative-organisation.model";

export class StepOne {
  _caseNumber: string;
  _date: string;
  _court: Court;
  _claimants: (Claimant | RepresentativeCitizen | RepresentativeOrganisation)[];
  _defendants: (Defendant | RepresentativeCitizen | RepresentativeOrganisation)[];

  constructor(
    caseNumber: string,
    date: string,
    court: Court,
    claimants: (Claimant | RepresentativeCitizen | RepresentativeOrganisation)[],
    defendants: (Defendant | RepresentativeCitizen | RepresentativeOrganisation)[]
  ) {
    this._caseNumber = caseNumber;
    this._date = date;
    this._court = court;
    this._claimants = claimants;
    this._defendants = defendants;
  }

  get caseNumber(): string {
    return this._caseNumber;
  }

  get date(): string {
    return this._date;
  }

  get court(): Court {
    return this._court;
  }

  get claimants(): (Claimant | RepresentativeCitizen | RepresentativeOrganisation)[] {
    return this._claimants;
  }

  get defendants(): (Defendant | RepresentativeCitizen | RepresentativeOrganisation)[] {
    return this._defendants;
  }
}
