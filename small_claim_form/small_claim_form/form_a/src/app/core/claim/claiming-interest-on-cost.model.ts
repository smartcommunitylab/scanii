import { To } from '../common/to.model';
import { From } from './from.model';

export class ClaimingInterestOnCost {
  private isYes: boolean;
  private from?: From;
  private to?: To;

  constructor(isYes: boolean, from?: From, to?: To) {
    this.isYes = isYes;
    if (from) this.from = from;
    if (to) this.to = to;
  }
}
