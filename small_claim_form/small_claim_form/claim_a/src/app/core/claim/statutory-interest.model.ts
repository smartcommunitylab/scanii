import { To } from '../common/to.model';

export class StatutoryInterest {
  private fromDate: Date;
  private to: To;

  constructor(fromDate: Date, to: To) {
    this.fromDate = fromDate;
    this.to = to;
  }
}
