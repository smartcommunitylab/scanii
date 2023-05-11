export class Court {
  private _country: string;
  private _name: string;
  private _street: string;
  private _post_code?: string;
  private _city?: string;
  private _street_number?: string;

  constructor(
    country: string,
    name: string,
    street: string,
    post_code?: string,
    city?: string,
    street_number?: string
  ) {
    this._country = country;
    this._name = name;
    this._street = street;
    if (post_code) this._post_code = post_code;
    if (city) this._city = city;
    if (street_number) this._street_number = street_number;
  }
}
