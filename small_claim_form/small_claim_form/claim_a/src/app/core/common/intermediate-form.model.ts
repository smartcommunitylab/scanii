export class IntermediateForm {
  private _claimants: any[];
  private _defendants: any[];
  private _jurisdiction: any;
  private _crossborderNature: any;
  private _bankDetails: any;
  private _claim: any;
  private _claimDetails: any;
  private _oralHearing: any;
  private _documentAndCommunication: any;
  private _certificate: any;
  private _dateAndSignature: any;
  private _court: any;

  public get claimants(): any[] {
    return this._claimants;
  }
  public set claimants(value: any[]) {
    this._claimants = value;
  }
  public get defendants(): any[] {
    return this._defendants;
  }
  public set defendants(value: any[]) {
    this._defendants = value;
  }
  public get jurisdiction(): any {
    return this._jurisdiction;
  }
  public set jurisdiction(value: any) {
    this._jurisdiction = value;
  }
  public get crossborderNature(): any {
    return this._crossborderNature;
  }
  public set crossborderNature(value: any) {
    this._crossborderNature = value;
  }
  public get bankDetails(): any {
    return this._bankDetails;
  }
  public set bankDetails(value: any) {
    this._bankDetails = value;
  }
  public get claim(): any {
    return this._claim;
  }
  public set claim(value: any) {
    this._claim = value;
  }
  public get claimDetails(): any {
    return this._claimDetails;
  }
  public set claimDetails(value: any) {
    this._claimDetails = value;
  }
  public get oralHearing(): any {
    return this._oralHearing;
  }
  public set oralHearing(value: any) {
    this._oralHearing = value;
  }
  public get documentAndCommunication(): any {
    return this._documentAndCommunication;
  }
  public set documentAndCommunication(value: any) {
    this._documentAndCommunication = value;
  }
  public get certificate(): any {
    return this._certificate;
  }
  public set certificate(value: any) {
    this._certificate = value;
  }
  public get dateAndSignature(): any {
    return this._dateAndSignature;
  }
  public set dateAndSignature(value: any) {
    this._dateAndSignature = value;
  }
  public get court(): any {
    return this._court;
  }
  public set court(value: any) {
    this._court = value;
  }

  toJSON() {
    const {
      _claimants,
      _defendants,
      _jurisdiction,
      _crossborderNature,
      _bankDetails,
      _claim,
      _claimDetails,
      _oralHearing,
      _documentAndCommunication,
      _certificate,
      _dateAndSignature,
      _court,
    } = this;
    return {
      claimants: _claimants,
      defendants: _defendants,
      jurisdiction: _jurisdiction,
      crossborderNature: _crossborderNature,
      bankDetails: _bankDetails,
      claim: _claim,
      claimDetails: _claimDetails,
      oralHearing: _oralHearing,
      documentAndCommunication: _documentAndCommunication,
      certificate: _certificate,
      dateAndSignature: _dateAndSignature,
      court: _court,
    };
  }
}
