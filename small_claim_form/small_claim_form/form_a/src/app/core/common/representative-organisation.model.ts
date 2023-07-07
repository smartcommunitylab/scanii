import { Address } from "./address.model";
import { Contacts } from "./contacts.model";
import { Representative } from "./representative.model";

export class RepresentativeOrganisation extends Representative {
  private _name: string;
  private _address: Address;
  private _identificationCode: string;
  private _contacts: Contacts;

  constructor(
    name: string,
    address: Address,
    identificationCode: string,
    contacts: Contacts
  ) {
    super();
    this._name = name;
    this._address = address;
    this._identificationCode = identificationCode;
    this._contacts = contacts;
  }

  get name(): string {
    return this._name;
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
