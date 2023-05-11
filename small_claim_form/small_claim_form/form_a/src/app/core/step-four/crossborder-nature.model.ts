export class CrossborderNature {
  private _claimantCountry: string;
  private _defendantCountry: string;
  private _courtCountry: string;

  constructor(
    claimantCountry: string,
    defendantCountry: string,
    courtCountry: string
  ) {
    this._claimantCountry = claimantCountry;
    this._defendantCountry = defendantCountry;
    this._courtCountry = courtCountry;
  }
}
