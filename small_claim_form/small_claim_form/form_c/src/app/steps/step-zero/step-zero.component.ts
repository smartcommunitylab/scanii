import { Component } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { Movement } from "src/app/core/common/movement.model";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { Direction } from "src/app/shared/constants/direction.constants";
import { EventManagerService } from "src/app/shared/services/event-manager.service";

@Component({
  selector: "app-step-zero",
  templateUrl: "./step-zero.component.html",
  styleUrls: ["./step-zero.component.scss"],
})
export class StepZeroComponent {
  constructor(
    private navbarService: NavbarService,
    private eventManager: EventManagerService
  ) {}

  changeStep(value: string, destinationStepId: string) {
    this.navbarService.previousStepId = this.navbarService.currentStepId;
    this.navbarService.currentStepId = destinationStepId;
    if (value === "next") {
      const movement = new Movement("step1", Direction.NEXT);
      this.eventManager.broadcast({
        name: "changeStep",
        content: movement,
      });
    }
  }
}
