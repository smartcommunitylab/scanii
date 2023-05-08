export class ClaimingCostProceedings {
  private _isYes: boolean;
  private _costDetails?: string;

  constructor(isYes: boolean, costDetails?: string) {
    this._isYes = isYes;
    if (costDetails) this._costDetails = costDetails;
  }
}
