export class Font {
  private _fontName: string;
  private _ttfName: string;
  private _fontWeight: string;
  private _base64: string;

  constructor(
    fontName: string,
    ttfName: string,
    fontWeight: string,
  ) {
    this._fontName = fontName;
    this._ttfName = ttfName;
    this._fontWeight = fontWeight;
  }

  get fontName(): string {
    return this._fontName;
  }

  get ttfName(): string {
    return this._ttfName;
  }

  get fontWeight(): string {
    return this._fontWeight;
  }

  get base64(): string {
    return this._base64;
  }

  set base64(value: string) {
    this._base64 = value;
  }
}
