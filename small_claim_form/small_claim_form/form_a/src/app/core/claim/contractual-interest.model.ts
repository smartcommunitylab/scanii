import { To } from '../common/to.model';

export class ContractualInterest {
  private interestPercentage?: number;
  private percentagePointsAboveECB?: number;
  private other?: string;
  private fromDate: Date;
  private to: To;

  constructor(
    fromDate: Date,
    to: To,
    interestPercentage?: number,
    percentagePointsAboveECB?: number,
    other?: string
  ) {
    this.fromDate = fromDate;
    this.to = to;
    if (interestPercentage) this.interestPercentage = interestPercentage;
    if (percentagePointsAboveECB)
      this.percentagePointsAboveECB = percentagePointsAboveECB;
    if (other) this.other = other;
  }
}
