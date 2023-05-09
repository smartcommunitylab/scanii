import { Address } from './address.model';
import { Contacts } from './contacts.model';

export class Citizen {
  private _name: string;
  private _surname: string;
  private _address: Address;
  private _identificationCode?: string;
  private _contacts?: Contacts;

  constructor(
    name: string,
    surname: string,
    address: Address,
    identificationCode?: string,
    contacts?: Contacts
  ) {
    this._name = name;
    this._surname = surname;
    this._address = address;
    if (identificationCode) this._identificationCode = identificationCode;
    if (contacts) this._contacts = contacts;
  }
}
