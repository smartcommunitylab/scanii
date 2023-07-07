import { Citizen } from "../common/citizen.model";
import { Organisation } from "../common/organisation.model";
import { Representative } from "../common/representative.model";

export class Defendant {
  private defendant: Organisation | Citizen;
  private representative: Representative;
  private otherDetails: string;

  constructor(
    defendant: Organisation | Citizen,
    representative: Representative,
    otherDetails: string
  ) {
    this.defendant = defendant;
    this.representative = representative;
    this.otherDetails = otherDetails;
  }
}
