import { Citizen } from '../common/citizen.model';
import { Organisation } from '../common/organisation.model';

export class Claimant {
  private _claimant: Organisation | Citizen;
  private _representative?: Organisation | Citizen;
  private _otherDetails?: string;

  constructor(
    claimant: Organisation | Citizen,
    representative?: Organisation | Citizen,
    otherDetails?: string
  ) {
    this._claimant = claimant;
    if (representative) this._representative = representative;
    if (otherDetails) this._otherDetails = otherDetails;
  }

  public get claimant(): Organisation | Citizen {
    return this._claimant;
  }
  public set claimant(value: Organisation | Citizen) {
    this._claimant = value;
  }
  public get representative(): Organisation | Citizen {
    return this._representative;
  }
  public set representative(value: Organisation | Citizen) {
    this._representative = value;
  }
  public get otherDetails(): string {
    return this._otherDetails;
  }
  public set otherDetails(value: string) {
    this._otherDetails = value;
  }
}
