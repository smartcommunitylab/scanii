import { To } from '../common/to.model';
import { From } from './from.model';

export class ClaimingInterestOnCost {
  private _isYes: boolean;
  private _from?: From;
  private _to?: To;

  constructor(isYes: boolean, from?: From, to?: To) {
    this._isYes = isYes;
    if (from) this._from = from;
    if (to) this._to = to;
  }

  public get isYes(): boolean {
    return this._isYes;
  }

  public get from(): From | undefined {
    return this._from;
  }

  public get to(): To | undefined {
    return this._to;
  }

}
