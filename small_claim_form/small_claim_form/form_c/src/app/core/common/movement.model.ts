import { Direction } from "src/app/shared/constants/direction.constants";

export class Movement {
  private _destinationStepId: string;
  private _direction: Direction;

  constructor(destinationStepId: string, direction: Direction) {
    this._destinationStepId = destinationStepId;
    this._direction = direction;
  }

  get destinationStepId(): string {
    return this._destinationStepId;
  }

  get direction(): Direction {
    return this._direction;
  }
}
