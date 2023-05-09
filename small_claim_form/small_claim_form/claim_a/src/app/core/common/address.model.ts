export class Address {
  private _street: string;
  private _post_code: string;
  private _city: string;
  private _country: string;
  private _street_number?: string;

  constructor(
    street: string,
    post_code: string,
    city: string,
    country: string,
    street_number?: string
  ) {
    this._street = street;
    this._post_code = post_code;
    this._city = city;
    this._country = country;
    if (street_number) this._street_number = street_number;
  }
}
