import { Citizen } from '../common/citizen.model';
import { Organisation } from '../common/organisation.model';

export class Defendant {
  private _defendant: Organisation | Citizen;
  private _representative?: Organisation | Citizen;
  private _otherDetails?: string;

  constructor(
    defendant: Organisation | Citizen,
    representative?: Organisation | Citizen,
    otherDetails?: string
  ) {
    this._defendant = defendant;
    if (representative) this._representative = representative;
    if (otherDetails) this._otherDetails = otherDetails;
  }
}