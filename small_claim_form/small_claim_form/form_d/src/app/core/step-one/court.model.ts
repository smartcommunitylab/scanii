export class Court {
  private _country: string;
  private _countryName: string;
  private _name: string;
  private _street: string;
  private _city_post_code: string;
  private _street_number?: string;

  constructor(
    country: string,
    countryName: string,
    name: string,
    street: string,
    city_post_code: string,
    street_number?: string
  ) {
    this._country = country;
    this._countryName = countryName;
    this._name = name;
    this._street = street;
    this._city_post_code = city_post_code;
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

  get city_post_code(): string {
    return this._city_post_code;
  }

  get street_number(): string | undefined {
    return this._street_number;
  }
}
