import { Certificate } from 'crypto';
import { ClaimDetails } from '../claim-details/claim-details.model';
import { Claim } from '../claim/claim.model';
import { Claimant } from '../claimant/claimant.model';
import { Defendant } from '../defendant/defendant.model';
import { Jurisdiction } from '../jurisdiction/jurisdiction.model';
import { BankDetails } from '../step-four/bank-details.model';
import { CrossborderNature } from '../step-four/crossborder-nature.model';
import { DocumentAndCommunication } from '../step-seven/document-and-communication.model';
import { OralHearing } from '../step-seven/oral-hearing.model';
import { DateAndSignature } from '../step-seven/date-and-signature.model';
import { Court } from '../court/court.model';

export class FinalForm {
  private _claimants: Claimant[];
  private _defendants: Defendant[];
  private _jurisdiction: Jurisdiction;
  private _crossborderNature: CrossborderNature;
  private _bankDetails?: BankDetails;
  private _claim: Claim;
  private _claimDetails: ClaimDetails;
  private _oralHearing: OralHearing;
  private _documentAndCommunication: DocumentAndCommunication;
  private _certificate: Certificate;
  private _dateAndSignature: DateAndSignature;
  private _court: Court;

  public get claimants(): Claimant[] {
    return this._claimants;
  }
  public set claimants(value: Claimant[]) {
    this._claimants = value;
  }
  public get defendants(): Defendant[] {
    return this._defendants;
  }
  public set defendants(value: Defendant[]) {
    this._defendants = value;
  }
  public get jurisdiction(): Jurisdiction {
    return this._jurisdiction;
  }
  public set jurisdiction(value: Jurisdiction) {
    this._jurisdiction = value;
  }
  public get crossborderNature(): CrossborderNature {
    return this._crossborderNature;
  }
  public set crossborderNature(value: CrossborderNature) {
    this._crossborderNature = value;
  }
  public get bankDetails(): BankDetails {
    return this._bankDetails;
  }
  public set bankDetails(value: BankDetails) {
    this._bankDetails = value;
  }
  public get claim(): Claim {
    return this._claim;
  }
  public set claim(value: Claim) {
    this._claim = value;
  }
  public get claimDetails(): ClaimDetails {
    return this._claimDetails;
  }
  public set claimDetails(value: ClaimDetails) {
    this._claimDetails = value;
  }
  public get oralHearing(): OralHearing {
    return this._oralHearing;
  }
  public set oralHearing(value: OralHearing) {
    this._oralHearing = value;
  }
  public get documentAndCommunication(): DocumentAndCommunication {
    return this._documentAndCommunication;
  }
  public set documentAndCommunication(value: DocumentAndCommunication) {
    this._documentAndCommunication = value;
  }
  public get certificate(): Certificate {
    return this._certificate;
  }
  public set certificate(value: Certificate) {
    this._certificate = value;
  }
  public get dateAndSignature(): DateAndSignature {
    return this._dateAndSignature;
  }
  public set dateAndSignature(value: DateAndSignature) {
    this._dateAndSignature = value;
  }
  public get court(): Court {
    return this._court;
  }
  public set court(value: Court) {
    this._court = value;
  }
}
