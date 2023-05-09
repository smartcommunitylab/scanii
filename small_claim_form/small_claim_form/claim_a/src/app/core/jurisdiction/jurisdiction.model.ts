export class Jurisdiction {
  private _defendantDomicile?: boolean;
  private _customerDomicile?: boolean;
  private _policyholderDomicilie?: boolean;
  private _placePerformanceObbligation?: boolean;
  private _placeHarmfulEvent?: boolean;
  private _placeImmovableProperty?: boolean;
  private _choiceCourtTribunal?: boolean;
  private _other?: {
    isCheck: boolean;
    note?: string;
  };

  public get defendantDomicile(): boolean {
    return this._defendantDomicile;
  }
  public set defendantDomicile(value: boolean) {
    this._defendantDomicile = value;
  }
  public get customerDomicile(): boolean {
    return this._customerDomicile;
  }
  public set customerDomicile(value: boolean) {
    this._customerDomicile = value;
  }
  public get policyholderDomicilie(): boolean {
    return this._policyholderDomicilie;
  }
  public set policyholderDomicilie(value: boolean) {
    this._policyholderDomicilie = value;
  }
  public get placePerformanceObbligation(): boolean {
    return this._placePerformanceObbligation;
  }
  public set placePerformanceObbligation(value: boolean) {
    this._placePerformanceObbligation = value;
  }
  public get placeHarmfulEvent(): boolean {
    return this._placeHarmfulEvent;
  }
  public set placeHarmfulEvent(value: boolean) {
    this._placeHarmfulEvent = value;
  }
  public get placeImmovableProperty(): boolean {
    return this._placeImmovableProperty;
  }
  public set placeImmovableProperty(value: boolean) {
    this._placeImmovableProperty = value;
  }
  public get choiceCourtTribunal(): boolean {
    return this._choiceCourtTribunal;
  }
  public set choiceCourtTribunal(value: boolean) {
    this._choiceCourtTribunal = value;
  }
  public get other(): {
    isCheck: boolean;
    note?: string;
  } {
    return this._other;
  }
  public set other(value: { isCheck: boolean; note?: string }) {
    this._other = value;
  }
}
