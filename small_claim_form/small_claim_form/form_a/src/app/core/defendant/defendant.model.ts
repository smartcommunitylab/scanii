import { Citizen } from "../common/citizen.model";
import { Organisation } from "../common/organisation.model";
import { Representative } from "../common/representative.model";

export class Defendant {
  private _defendant: Organisation | Citizen;
  private _representative: Representative;
  private _otherDetails: string;

  constructor(
    defendant: Organisation | Citizen,
    representative: Representative,
    otherDetails: string
  ) {
    this._defendant = defendant;
    this._representative = representative;
    this._otherDetails = otherDetails;
  }

  get defendant(): Organisation | Citizen {
    return this._defendant;
  }

  get representative(): Representative {
    return this._representative;
  }

  get otherDetails(): string {
    return this._otherDetails;
  }
}
