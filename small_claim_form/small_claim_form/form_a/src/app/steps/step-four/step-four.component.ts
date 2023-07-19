import { UntypedFormGroup, Validators } from '@angular/forms';
import { StepFourService } from '../../core/step-four/step-four.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventManagerService } from 'src/app/shared/services/event-manager.service';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { Movement } from 'src/app/core/common/movement.model';
import { Direction } from 'src/app/shared/constants/direction.constants';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import datepickerFactory from 'jquery-datepicker';
import { ToastService } from 'src/app/shared/services/toast.service';
declare const $: any;
datepickerFactory($);

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  constructor(
    public stepFourService: StepFourService,
    private eventManager: EventManagerService,
    private navbarService: NavbarService,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.stepFourService.crossborderNatureForm.patchValue({
      claimantCountry: 'ES',
      defendantCountry: 'IT',
      courtCountry: 'IT',
    });
    
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.stepFourService.europeanCountries = event.translations.europeanCountries;
      this.stepFourService.worldCountries = event.translations.worldCountries;
    });
  }

  expandWorldCountrySelect(event: any, worldCountrySelectId: string) {
    this.markSelectsAsDirty();

    const formControlName =
      event.target.getAttribute('formControlName') + 'Other';

    const formControl =
      this.stepFourService.crossborderNatureForm.get(formControlName);

    const value = event.target.value;

    const element = document.getElementById(worldCountrySelectId);

    if (value === 'other') {
      if (element.classList.contains('df_collapsed')) {
        element.classList.remove('df_collapsed');
        this.addRequiredValidator(formControl);
      }
    } else {
      if (!element.classList.contains('df_collapsed')) {
        element.classList.add('df_collapsed');
        this.stepFourService.crossborderNatureForm
          .get(formControlName)
          .setValue('');
        this.removeRequiredValidator(formControl);
      }
      if (value === 'GB') this.openModal('js_modal_form_disclaimer_step_four');
    }
  }

  private markSelectsAsDirty(): void {
    if (
      this.stepFourService.crossborderNatureForm.get('claimantCountry')
        .value !== '' &&
      this.stepFourService.crossborderNatureForm.get('defendantCountry')
        .value !== '' &&
      this.stepFourService.crossborderNatureForm.get('courtCountry')
        .value !== ''
    ) {
      if (
        !this.stepFourService.crossborderNatureForm.get('claimantCountry').dirty
      ) {
        this.stepFourService.crossborderNatureForm
          .get('claimantCountry')
          .markAsDirty();
      }
      if (
        !this.stepFourService.crossborderNatureForm.get('defendantCountry')
          .dirty
      ) {
        this.stepFourService.crossborderNatureForm
          .get('defendantCountry')
          .markAsDirty();
      }
      if (
        !this.stepFourService.crossborderNatureForm.get('courtCountry')
          .dirty
      ) {
        this.stepFourService.crossborderNatureForm
          .get('courtCountry')
          .markAsDirty();
      }
    }
  }

  onPaymentMethodChange(event: any, divIdToExpand?: string) {
    const value = event.target.value;

    if (this.stepFourService.areAllRadioButtonsUnchecked) {
      const divId = divIdToExpand ? divIdToExpand : '';
      this.stepFourService.previousSelectedRadioButton = {
        value,
        divIdToExpand: divId,
      };
      this.stepFourService.currentSelectedRadioButton = {
        value,
        divIdToExpand: divId,
      };
    } else {
      const divId = divIdToExpand ? divIdToExpand : '';
      this.stepFourService.previousSelectedRadioButton =
        this.stepFourService.currentSelectedRadioButton;
      this.stepFourService.currentSelectedRadioButton = {
        value,
        divIdToExpand: divId,
      };
    }

    if (
      this.stepFourService.currentSelectedRadioButton.value !==
      this.stepFourService.previousSelectedRadioButton.value
    ) {
      this.managePaymentMethods(
        this.stepFourService.previousSelectedRadioButton
      );
    }

    this.managePaymentMethods(this.stepFourService.currentSelectedRadioButton);

    this.stepFourService.areAllRadioButtonsUnchecked =
      this.checkIfAllRadioButtonsAreUnchecked();
  }

  managePaymentMethods(radioButtonObj: any): void {
    switch (radioButtonObj.value) {
      case 'bankTransfer':
        this.stepFourService.bankTransferRadioButton =
          !this.stepFourService.bankTransferRadioButton;
        break;
      case 'creditCard':
        this.stepFourService.creditCardRadioButton =
          !this.stepFourService.creditCardRadioButton;
        if (this.stepFourService.creditCardRadioButton) {
          this.addRequiredValidators(radioButtonObj.value);
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);
        } else {
          this.addDfCollpasedClass(radioButtonObj.divIdToExpand);
          this.removeRequiredValidators(radioButtonObj.value);
          this.resetFormGroup(radioButtonObj.value);
        }
        break;
      case 'directDebit':
        this.stepFourService.directDebitRadioButton =
          !this.stepFourService.directDebitRadioButton;
        if (this.stepFourService.directDebitRadioButton) {
          this.addRequiredValidators(radioButtonObj.value);
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);
        } else {
          this.addDfCollpasedClass(radioButtonObj.divIdToExpand);
          this.removeRequiredValidators(radioButtonObj.value);
          this.resetFormGroup(radioButtonObj.value);
        }
        break;
      case 'other':
        this.stepFourService.otherRadioButton =
          !this.stepFourService.otherRadioButton;
        if (this.stepFourService.otherRadioButton) {
          this.addRequiredValidators(radioButtonObj.value);
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);
        } else {
          this.addDfCollpasedClass(radioButtonObj.divIdToExpand);
          this.removeRequiredValidators(radioButtonObj.value);
          this.resetFormGroup(radioButtonObj.value);
        }
        break;
    }
  }

  checkIfAllRadioButtonsAreUnchecked(): boolean {
    if (
      !this.stepFourService.bankTransferRadioButton &&
      !this.stepFourService.creditCardRadioButton &&
      !this.stepFourService.directDebitRadioButton &&
      !this.stepFourService.otherRadioButton
    )
      return true;
    else return false;
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.stepFourService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.stepFourService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private addRequiredValidators(value: string) {
    const formGroup = this.stepFourService.bankDetailsForm
      .get('applicationFeePayment')
      .get(value) as UntypedFormGroup;
    for (const key in formGroup.controls) {
      const formControl = formGroup.get(key);
      formControl.setValidators(this.stepFourService.requiredValidator);
      formControl.updateValueAndValidity();
    }
  }

  resetFormGroup(value: string) {
    this.stepFourService.bankDetailsForm
      .get('applicationFeePayment')
      .get(value)
      .reset();
  }

  removeRequiredValidators(value: string) {
    const formGroup = this.stepFourService.bankDetailsForm
      .get('applicationFeePayment')
      .get(value) as UntypedFormGroup;
    for (const key in formGroup.controls) {
      const formControl = formGroup.get(key);
      formControl.clearValidators();
      formControl.setErrors(null);
      formControl.updateValueAndValidity();
    }
  }

  removeDfCollpasedClass(divId: string) {
    const element = document.getElementById(divId);
    element.classList.remove('df_collapsed');
  }

  addDfCollpasedClass(divId: string) {
    const element = document.getElementById(divId);
    element.classList.add('df_collapsed');
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === 'next') {
      if (
        !this.stepFourService.crossborderNatureForm.invalid &&
        !this.stepFourService.bankDetailsForm.invalid
      ) {
        this.navbarService.previousStepId = this.navbarService.currentStepId;
        this.navbarService.currentStepId = destinationStepId;
        const movement = new Movement('step5', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      } else {
        this.stepFourService.markStepFourFormsAsDirty();
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
      const movement = new Movement('step3', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
        content: movement,
      });
    }
  }

  private initDatepickers(language: string) {
    let languageToUse = language;

    if (language === 'en') {
      languageToUse = 'en-GB';
    } else if (language === 'mt') {
      languageToUse = 'en-GB';
    }

    import(`jquery-datepicker/i18n/jquery.ui.datepicker-${languageToUse}`)
      .then((response) => {
        response.default($);
      })
      .catch((error) => {
        console.error(error);
      });

    var options = $.extend(
      {},
      {
        dateFormat: 'MM/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2060',
        showButtonPanel: false,
        onClose: (value: string) => {
          this.stepFourService.bankDetailsForm
            .get('applicationFeePayment')
            .get('creditCard')
            .get('cardExpireDate')
            .setValue(value);
        },
      }
    );

    $('#dynformSCA5ExpiryDate').datepicker(options);
  }

  private openModal(id: string) {
    document.body.style.overflow = 'hidden';
    document.getElementById(id).classList.add('active');
  }

  closeModal(id: string) {
    document.body.style.overflow = 'auto';
    document.getElementById(id).classList.remove('active');
  }
}
