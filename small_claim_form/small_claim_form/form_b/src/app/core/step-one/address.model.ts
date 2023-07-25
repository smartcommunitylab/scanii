export class Address {
  private _street: string;
  private _post_code: string;
  private _city: string;
  private _country: string;
  private _countryName: string;
  private _street_number?: string;

  constructor(
    street: string,
    post_code: string,
    city: string,
    country: string,
    countryName: string,
    street_number?: string
  ) {
    this._street = street;
    this._post_code = post_code;
    this._city = city;
    this._country = country;
    this._countryName = countryName;
    if (street_number) this._street_number = street_number;
  }

  get street(): string {
    return this._street;
  }

  get post_code(): string {
    return this._post_code;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get countryName(): string {
    return this._countryName;
  }

  get street_number(): string | undefined {
    return this._street_number;
  }
}
