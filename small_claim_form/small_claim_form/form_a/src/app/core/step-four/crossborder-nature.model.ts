export class CrossborderNature {
  private _claimantCountry: string;
  private _claimantCountryName: string;
  private _defendantCountry: string;
  private _defendantCountryName: string;
  private _courtCountry: string;
  private _courtCountryName: string;

  constructor(
    claimantCountry: string,
    claimantCountryName: string,
    defendantCountry: string,
    defendantCountryName: string,
    courtCountry: string,
    courtCountryName: string
  ) {
    this._claimantCountry = claimantCountry;
    this._claimantCountryName = claimantCountryName;
    this._defendantCountry = defendantCountry;
    this._defendantCountryName = defendantCountryName;
    this._courtCountry = courtCountry;
    this._courtCountryName = courtCountryName;
  }

  get claimantCountry(): string {
    return this._claimantCountry;
  }

  get claimantCountryName(): string {
    return this._claimantCountryName;
  }

  get defendantCountry(): string {
    return this._defendantCountry;
  }

  get defendantCountryName(): string {
    return this._defendantCountryName;
  }

  get courtCountry(): string {
    return this._courtCountry;
  }

  get courtCountryName(): string {
    return this._courtCountryName;
  }
}
