export class Court {
  private _country: string;
  private _countryName: string;
  private _name: string;
  private _street: string;
  private _post_code?: string;
  private _city?: string;
  private _street_number?: string;

  constructor(
    country: string,
    countryName: string,
    name: string,
    street: string,
    post_code?: string,
    city?: string,
    street_number?: string
  ) {
    this._country = country;
    this._countryName = countryName;
    this._name = name;
    this._street = street;
    if (post_code) this._post_code = post_code;
    if (city) this._city = city;
    if (street_number) this._street_number = street_number;
  }

  get country(): string {
    return this._country;
  }

  get countryName(): string {
    return this._countryName;
  }

  get name(): string {
    return this._name;
  }

  get street(): string {
    return this._street;
  }

  get post_code(): string | undefined {
    return this._post_code;
  }

  get city(): string | undefined {
    return this._city;
  }

  get street_number(): string | undefined {
    return this._street_number;
  }
}
