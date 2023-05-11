export class OralHearing {
  private _oralHearingRequest: {
    isYes: boolean;
    reasons?: string;
  };
  private _oralHearingPresence: {
    isYes: boolean;
    reasons?: string;
  };

  public get oralHearingRequest(): { isYes: boolean; reasons?: string } {
    return this._oralHearingRequest;
  }
  public set oralHearingRequest(value: { isYes: boolean; reasons?: string }) {
    this._oralHearingRequest.isYes = value.isYes;
    if (value.reasons) this._oralHearingRequest.reasons = value.reasons;
  }
  public get oralHearingPresence(): { isYes: boolean; reasons?: string } {
    return this._oralHearingPresence;
  }
  public set oralHearingPresence(value: { isYes: boolean; reasons?: string }) {
    this._oralHearingPresence.isYes = value.isYes;
    if (value.reasons) this._oralHearingPresence.reasons = value.reasons;
  }
}
