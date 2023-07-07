export class Certificate {
  private _certificateRequest: boolean;
  private _language?: string;
  private _languageName?: string;

  constructor(certificateRequest: boolean) {
    this._certificateRequest = certificateRequest;
  }

  get certificateRequest(): boolean {
    return this._certificateRequest;
  }

  set certificateRequest(certificateRequest: boolean) {
    this._certificateRequest = certificateRequest;
  }

  get language(): string | undefined {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
  }

  get languageName(): string | undefined {
    return this._languageName;
  }

  set languageName(languageName: string) {
    this._languageName = languageName;
  }
}
