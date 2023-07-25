import { Address } from "./address.model";
import { Contacts } from "./contacts.model";

export class Citizen {
  private _name: string;
  private _surname: string;
  private _address: Address;
  private _identificationCode: string;
  private _contacts: Contacts;

  constructor(
    name: string,
    surname: string,
    address: Address,
    identificationCode: string,
    contacts: Contacts
  ) {
    this._name = name;
    this._surname = surname;
    this._address = address;
    this._identificationCode = identificationCode;
    this._contacts = contacts;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get address(): Address {
    return this._address;
  }

  get identificationCode(): string {
    return this._identificationCode;
  }

  get contacts(): Contacts {
    return this._contacts;
  }
}
