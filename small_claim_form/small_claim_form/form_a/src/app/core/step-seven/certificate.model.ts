export class Certificate {
  private _certificateRequest: boolean;
  private _language?: string;

  constructor(certificateRequest: boolean, language?: string) {
    this._certificateRequest = certificateRequest;
    if (language) this._language = language;
  }
}
