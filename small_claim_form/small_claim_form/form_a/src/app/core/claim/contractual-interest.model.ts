import { To } from '../common/to.model';

export class ContractualInterest {
  private _interestPercentage?: number;
  private _percentagePointsAboveECB?: number;
  private _other?: string;
  private _fromDate: Date;
  private _to: To;

  constructor(
    fromDate: Date,
    to: To,
    interestPercentage?: number,
    percentagePointsAboveECB?: number,
    other?: string
  ) {
    this._fromDate = fromDate;
    this._to = to;
    if (interestPercentage) this._interestPercentage = interestPercentage;
    if (percentagePointsAboveECB)
      this._percentagePointsAboveECB = percentagePointsAboveECB;
    if (other) this._other = other;
  }

  public get interestPercentage(): number | undefined {
    return this._interestPercentage;
  }

  public get percentagePointsAboveECB(): number | undefined {
    return this._percentagePointsAboveECB;
  }

  public get other(): string | undefined {
    return this._other;
  }

  public get fromDate(): Date {
    return this._fromDate;
  }

  public get to(): To {
    return this._to;
  }
}
