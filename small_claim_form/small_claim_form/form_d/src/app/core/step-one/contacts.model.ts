export class Contacts {
  private _phone_number?: string;
  private _email?: string;

  constructor(phone_number?: string, email?: string) {
    this._phone_number = phone_number;
    this._email = email;
  }

  get phone_number(): string | undefined {
    return this._phone_number;
  }

  get email(): string | undefined {
    return this._email;
  }
}
