import { element } from 'protractor';
import { JhiEventManager } from 'ng-jhipster';
import { ClaimService } from '../../core/claim/claim.service';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { Direction } from 'src/app/shared/constants/direction.constants';
import { Movement } from 'src/app/core/common/movement.model';
import datepickerFactory from 'jquery-datepicker';
import { AbstractControl, FormGroup } from '@angular/forms';
declare const $: any;
datepickerFactory($);
import 'chosen-js';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss'],
})
export class ClaimComponent implements OnInit {
  europeanCurrencies: { value: string; label: string }[] = [];
  worldCurrencies: { value: string; label: string }[] = [];
  worldAndHistoricalCurrencies: { value: string; label: string }[] = [];

  constructor(
    public claimService: ClaimService,
    private eventManager: JhiEventManager,
    private navbarService: NavbarService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // this.claimService.editForm.patchValue({
    //   claimForMoney: 'no',
    //   otherClaim: 'no',
    //   claimingCostProceedings: 'no',
    //   claimingInterest: 'no',
    //   claimingInterestOnCost: 'no',
    // });
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initDatepicker(event.lang);
      this.europeanCurrencies = event.translations.europeanCurrencies;
      this.worldCurrencies = event.translations.worldCurrencies;
      this.worldAndHistoricalCurrencies = event.translations.worldAndHistoricalCurrencies;
    });
  }

  private initDatepicker(language: string) {
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
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2060',
        onClose: (value: string, inst: any) => {
          const formControlName =
            inst.input[0].attributes.formControlName.value;
          const formControl = this.claimService.getFormControl(formControlName);
          formControl.markAsDirty();
          formControl.setValue(value);
        },
      }
    );

    $('#dynformSCA6ClaimingContractualDate').datepicker(options);
    $('#dynformSCA6ClaimingContractualToDate').datepicker(options);
    $('#dynformSCA6ClaimingStatutoryDate').datepicker(options);
    $('#dynformSCA6ClaimingStatutoryToDate').datepicker(options);
    $('#dynformSCA6ClaimingInterestCostDate').datepicker(options);
    $('#dynformSCA6ClaimingInterestCostToDate').datepicker(options);
  }

  showHideOtherCurrencyDiv(
    event: any,
    divIdToExpand: string,
    referenceValue: string,
    selectIds: string[],
    radioButtonLabel: 'claimForMoney' | 'otherClaim'
  ) {
    const value = event.target.value;
    const elementToExpand = document.getElementById(divIdToExpand);

    const otherCurrencySelectFormControlName =
      event.target.attributes.formControlName.value + 'Other';

    const otherCurrencySelectFormControl = this.claimService.getFormControl(
      otherCurrencySelectFormControlName
    );

    if (value === referenceValue) {
      if (elementToExpand.classList.contains('df_collapsed')) {
        for (const id of selectIds) {
          this.initCurrencyOtherSelect(id);
        }

        let isHistoricalCurrenciesCheckboxChecked = false;
        if (radioButtonLabel === 'claimForMoney') {
          if (this.claimService.areIncludedClaimForMoneyHistoricalCurrencies) {
            isHistoricalCurrenciesCheckboxChecked = true;
          }
        } else {
          if (this.claimService.areIncludedOtherClaimHistoricalCurrencies) {
            isHistoricalCurrenciesCheckboxChecked = true;
          }
        }

        this.includeHistoricalCurrencies(
          isHistoricalCurrenciesCheckboxChecked,
          selectIds[0],
          selectIds[1],
          radioButtonLabel
        );

        this.addRequiredValidatorToFormControl(otherCurrencySelectFormControl);

        elementToExpand.classList.remove('df_collapsed');
      }
    } else {
      if (!elementToExpand.classList.contains('df_collapsed')) {
        elementToExpand.classList.add('df_collapsed');
        const historicalCurrencySelectFormControlName =
          event.target.attributes.formControlName.value + 'Historical';
        const historicalCurrencyCheckboxFormControlName =
          event.target.attributes.formControlName.value + 'HistoricalCheckbox';

        const historicalCurrencySelectFormControl =
          this.claimService.getFormControl(
            historicalCurrencySelectFormControlName
          );
        this.claimService
          .getFormControl(historicalCurrencyCheckboxFormControlName)
          .reset();

        for (const id of selectIds) {
          this.resetCurrencyOtherSelect(id);
        }

        this.removeRequiredValidatorFromFormControl(
          otherCurrencySelectFormControl
        );
        this.removeRequiredValidatorFromFormControl(
          historicalCurrencySelectFormControl
        );

        if (radioButtonLabel === 'claimForMoney')
          this.claimService.areIncludedClaimForMoneyHistoricalCurrencies =
            false;
        else
          this.claimService.areIncludedOtherClaimHistoricalCurrencies = false;
      }
    }
  }

  showHideDiv(
    event: any,
    divIds: string[],
    referenceValue: string,
    formControlName: string,
    excludedFormControls?: string[]
  ) {
    const value = event.target.value;
    const elementToExpand = document.getElementById(divIds[0]);
    const formElement = this.claimService.getFormControl(formControlName);

    if (value === referenceValue) {
      if (elementToExpand.classList.contains('df_collapsed')) {
        if (formElement instanceof FormGroup) {
          const array = excludedFormControls ? excludedFormControls : [];
          this.addRequiredValidatorToFormElement(formElement, array);
        } else this.addRequiredValidatorToFormControl(formElement);

        //expand div
        elementToExpand.classList.remove('df_collapsed');
      }
    } else {
      //collapse divs
      for (const id of divIds) {
        const elementToCollapse = document.getElementById(id);
        if (!elementToCollapse.classList.contains('df_collapsed')) {
          elementToCollapse.classList.add('df_collapsed');
        }
      }

      formElement.reset();

      this.removeRequiredValidatorFromFormElement(formElement);
    }
  }

  showHideDivs(
    divIdToExpand: string,
    divIdsToCollapse: string[],
    formControlNameToExpand: string,
    formControlNameToCollapse: string,
    excludedFormControlsToExpand?: string[]
  ) {
    const elementToExpand = document.getElementById(divIdToExpand);
    const controlToExpand = this.claimService.getFormControl(
      formControlNameToExpand
    );
    const controlToCollapse = this.claimService.getFormControl(
      formControlNameToCollapse
    );

    //collapse divs
    for (const id of divIdsToCollapse) {
      const elementToCollapse = document.getElementById(id);
      if (!elementToCollapse.classList.contains('df_collapsed')) {
        elementToCollapse.classList.add('df_collapsed');
      }
    }

    controlToCollapse.reset();

    this.removeRequiredValidatorFromFormElement(controlToCollapse);

    //expand div
    if (controlToExpand instanceof FormGroup) {
      const array = excludedFormControlsToExpand
        ? excludedFormControlsToExpand
        : [];
      this.addRequiredValidatorToFormElement(controlToExpand, array);
    } else this.addRequiredValidatorToFormControl(controlToExpand);
    elementToExpand.classList.remove('df_collapsed');
  }

  private initCurrencyOtherSelect(id: string) {
    var $select = $('#' + id);

    if (!$select.hasClass('chosen-container')) {
      $select.chosen({
        width: '100%',
        inherit_select_classes: true,
        search_contains: true,
        display_disabled_options: false,
      });
      $select.chosen().change((event: any, data: any) => {
        const formControlName = event.target.attributes.formControlName.value;
        this.claimService
          .getFormControl(formControlName)
          ?.setValue(data.selected);
      });
    }
  }

  private resetCurrencyOtherSelect(id: string) {
    var $select = $('#' + id);

    $select.val('').trigger('chosen:updated');

    const element = document.getElementById(id) as HTMLElement;
    const formControlName = element.attributes['formControlName'].value;
    this.claimService.getFormControl(formControlName)?.reset();
  }

  includeHistoricalCurrencies(
    isChecked: boolean,
    otherCurrencySelectId: string,
    historicalCurrencySelectId: string,
    radioButtonLabel: 'claimForMoney' | 'otherClaim'
  ) {
    if (isChecked) {
      if (radioButtonLabel === 'claimForMoney')
        this.claimService.areIncludedClaimForMoneyHistoricalCurrencies = true;
      else this.claimService.areIncludedOtherClaimHistoricalCurrencies = true;
    } else {
      if (radioButtonLabel === 'claimForMoney')
        this.claimService.areIncludedClaimForMoneyHistoricalCurrencies = false;
      else this.claimService.areIncludedOtherClaimHistoricalCurrencies = false;
    }

    const otherCurrencySelectFormControl = this.claimService.getFormControl(
      document.getElementById(otherCurrencySelectId).attributes[
        'formControlName'
      ].value
    );

    let historicalCurrencySelectFormControl: AbstractControl | null = null;
    const historicalCurrencySelect = document.getElementById(
      historicalCurrencySelectId
    );
    historicalCurrencySelectFormControl = this.claimService.getFormControl(
      historicalCurrencySelect.attributes['formControlName'].value
    );

    if (isChecked) {
      $('#' + otherCurrencySelectId)
        .nextAll('.chosen-container')
        .hide();
      this.removeRequiredValidatorFromFormControl(
        otherCurrencySelectFormControl
      );

      this.resetCurrencyOtherSelect(otherCurrencySelectId);
      this.addRequiredValidatorToFormControl(
        historicalCurrencySelectFormControl
      );
      $('#' + historicalCurrencySelectId)
        .nextAll('.chosen-container')
        .show();
    } else {
      this.addRequiredValidatorToFormControl(otherCurrencySelectFormControl);
      $('#' + otherCurrencySelectId)
        .nextAll('.chosen-container')
        .show();

      $('#' + historicalCurrencySelectId)
        .nextAll('.chosen-container')
        .hide();
      this.removeRequiredValidatorFromFormControl(
        historicalCurrencySelectFormControl
      );
      this.resetCurrencyOtherSelect(historicalCurrencySelectId);
    }
  }

  private addRequiredValidatorToFormElement(
    formElement: FormGroup,
    excludedFormControls: string[]
  ) {
    for (const formControlName in formElement.controls) {
      if (!excludedFormControls.includes(formControlName)) {
        const formControl = formElement.get(formControlName);
        this.addRequiredValidatorToFormControl(formControl);
      }
    }
  }

  private removeRequiredValidatorFromFormElement(formElement: any) {
    if (formElement instanceof FormGroup) {
      for (const formControlName in formElement.controls) {
        const internalFormElement = formElement.get(formControlName);
        if (internalFormElement instanceof FormGroup) {
          this.removeRequiredValidatorFromFormElement(internalFormElement);
        } else {
          this.removeRequiredValidatorFromFormControl(internalFormElement);
        }
      }
    } else {
      this.removeRequiredValidatorFromFormControl(formElement);
    }
  }

  private addRequiredValidatorToFormControl(formControl: any) {
    formControl.addValidators(this.claimService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidatorFromFormControl(formControl: any) {
    formControl.removeValidators(this.claimService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === 'next') {
      if (!this.claimService.editForm.invalid) {
        this.navbarService.previousStepId = this.navbarService.currentStepId;
        this.navbarService.currentStepId = destinationStepId;
        const movement = new Movement('step6', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      } else {
        this.claimService.markClaimFormAsDirty(this.claimService.editForm);
      }
    } else if (value === 'back') {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement('step4', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
        content: movement,
      });
    }
  }
}
