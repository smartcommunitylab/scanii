export class Contacts {
  private _phone_number?: string;
  private _email?: string;

  constructor(phone_number?: string, email?: string) {
    if (phone_number) this._phone_number = phone_number;
    if (email) this._email = email;
  }
}
