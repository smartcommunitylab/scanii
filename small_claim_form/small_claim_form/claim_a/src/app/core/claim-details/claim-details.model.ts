export class ClaimDetails {
  private _detailsOfClaim: string;
  private _writtenEvidence: {
    isYes: boolean;
    note?: string;
  };
  private _witnesses: {
    isYes: boolean;
    note?: string;
  };
  private _otherClaimDetails: {
    isYes: boolean;
    note?: string;
  };

  public get detailsOfClaim(): string {
    return this._detailsOfClaim;
  }
  public set detailsOfClaim(value: string) {
    this._detailsOfClaim = value;
  }
  public get writtenEvidence(): {
    isYes: boolean;
    note?: string;
  } {
    return this._writtenEvidence;
  }
  public set writtenEvidence(value: { isYes: boolean; note?: string }) {
    this._writtenEvidence.isYes = value.isYes;
    if(value.note) this._writtenEvidence.note = value.note;
  }
  public get witnesses(): {
    isYes: boolean;
    note?: string;
  } {
    return this._witnesses;
  }
  public set witnesses(value: { isYes: boolean; note?: string }) {
    this._witnesses.isYes = value.isYes;
    if(value.note) this._witnesses.note = value.note;
  }
  public get otherClaimDetails(): {
    isYes: boolean;
    note?: string;
  } {
    return this._otherClaimDetails;
  }
  public set otherClaimDetails(value: { isYes: boolean; note?: string }) {
    this._otherClaimDetails.isYes = value.isYes;
    if(value.note) this._otherClaimDetails.note = value.note;
  }
}
