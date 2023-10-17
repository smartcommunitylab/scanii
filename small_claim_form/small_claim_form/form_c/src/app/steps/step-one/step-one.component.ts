import { Component } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { Movement } from "src/app/core/common/movement.model";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { Direction } from "src/app/shared/constants/direction.constants";
import { EventManagerService } from "src/app/shared/services/event-manager.service";

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent {
  constructor(
    private navbarService: NavbarService,
    private eventManager: EventManagerService
  ) {}

  changeStep(value: string, destinationStepId: string) {
    this.navbarService.previousStepId = this.navbarService.currentStepId;
    this.navbarService.currentStepId = destinationStepId;
    if (value === "next") {
      const movement = new Movement("step2", Direction.NEXT);
      this.eventManager.broadcast({
        name: "changeStep",
        content: movement,
      });
    }
  }
}
