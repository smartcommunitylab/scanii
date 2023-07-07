import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EventManagerService } from 'src/app/shared/services/event-manager.service';
import { ClaimDetailsService } from 'src/app/core/claim-details/claim-details.service';
import { Movement } from 'src/app/core/common/movement.model';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { Direction } from 'src/app/shared/constants/direction.constants';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss'],
})
export class ClaimDetailsComponent implements OnInit {
  constructor(
    public claimDetailsService: ClaimDetailsService,
    private eventManager: EventManagerService,
    private navbarService: NavbarService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.claimDetailsService.editForm.patchValue({
      detailsOfClaim: 'Crime',
      writtenEvidence: 'no',
      witnesses: 'no',
      otherClaimDetails: 'no',
    });
  }

  onClaimDetailsRadioButtonChange(event: any, divIdToExpand: string) {
    const value = event.target.value;
    const element = document.getElementById(divIdToExpand);
    const formControl = this.claimDetailsService.editForm.get(
      event.target.attributes.formControlName.value + 'Text'
    );
    if (value === 'yes') {
      this.addRequiredValidator(formControl);
      element.classList.remove('df_collapsed');
    } else if (value === 'no') {
      element.classList.add('df_collapsed');
      this.removeRequiredValidator(formControl);
      formControl.reset();
    }
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === 'next') {
      if (!this.claimDetailsService.editForm.invalid) {
        this.navbarService.previousStepId = this.navbarService.currentStepId;
        this.navbarService.currentStepId = destinationStepId;
        const movement = new Movement('step7', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      } else {
        this.claimDetailsService.markClaimDetailsFormAsDirty();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
        this.toastService.showErrorToast();
      }
    } else if (value === 'back') {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement('step5', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
        content: movement,
      });
    }
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.claimDetailsService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.claimDetailsService.requiredValidator);
    formControl.updateValueAndValidity();
  }
}
