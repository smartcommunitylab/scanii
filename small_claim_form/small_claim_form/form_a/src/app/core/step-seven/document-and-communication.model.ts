export class DocumentAndCommunication {
  private _electronicCommunicationWithCourtTribunal: boolean;
  private _electronicCommunicationOther: boolean;

  constructor(
    electronicCommunicationWithCourtTribunal: boolean,
    electronicCommunicationOther: boolean
  ) {
    this._electronicCommunicationWithCourtTribunal =
      electronicCommunicationWithCourtTribunal;
    this._electronicCommunicationOther = electronicCommunicationOther;
  }
}
