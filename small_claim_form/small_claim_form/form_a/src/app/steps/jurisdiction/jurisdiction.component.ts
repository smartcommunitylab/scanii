import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Movement } from 'src/app/core/common/movement.model';
import { JurisdictionService } from 'src/app/core/jurisdiction/jurisdiction.service';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { Direction } from 'src/app/shared/constants/direction.constants';

@Component({
  selector: 'app-jurisdiction',
  templateUrl: './jurisdiction.component.html',
  styleUrls: ['./jurisdiction.component.scss'],
})
export class JurisdictionComponent implements OnInit, AfterViewInit {
  constructor(
    public jurisdictionService: JurisdictionService,
    private eventManager: JhiEventManager,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  expandOther(event: any) {
    if (event.target.checked) {
      this.addRequiredValidator(
        this.jurisdictionService.editForm.get('otherText')
      );
      document
        .getElementById('dynformSCA4Other_div')
        .classList.remove('df_collapsed');
    } else {
      document
        .getElementById('dynformSCA4Other_div')
        .classList.add('df_collapsed');
      this.removeRequiredValidator(
        this.jurisdictionService.editForm.get('otherText')
      );
      this.jurisdictionService.editForm.get('otherText').reset();
    }
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.jurisdictionService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.jurisdictionService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === 'next') {
      if (!this.jurisdictionService.editForm.invalid) {
        this.navbarService.previousStepId = this.navbarService.currentStepId;
        this.navbarService.currentStepId = destinationStepId;
        const movement = new Movement('step4', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      } else {
        if (this.jurisdictionService.editForm.get('otherCheckbox').value)
          this.jurisdictionService.markOtherTextAsDirty();
        else this.jurisdictionService.markCheckboxesAsDirty();
      }
    } else if (value === 'back') {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement('step2', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
        content: movement,
      });
    }
  }
}