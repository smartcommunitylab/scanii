import { Direction } from 'src/app/shared/constants/direction.constants';

export class Movement {
  constructor(public destinationStepId: string, public direction: Direction) {}
}
