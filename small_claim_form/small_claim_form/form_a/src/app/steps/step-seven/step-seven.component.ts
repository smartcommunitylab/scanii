import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { JhiEventManager } from 'ng-jhipster';
import { Movement } from 'src/app/core/common/movement.model';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { StepSevenService } from 'src/app/core/step-seven/step-seven.service';
import { Direction } from 'src/app/shared/constants/direction.constants';
import datepickerFactory from 'jquery-datepicker';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
declare const $: any;
datepickerFactory($);
@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.scss'],
})
export class StepSevenComponent implements OnInit {
  europeanLanguages: { value: string; label: string }[] = [];

  constructor(
    public stepSevenService: StepSevenService,
    private eventManager: JhiEventManager,
    private navbarService: NavbarService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initDatepicker(event.lang);
      this.europeanLanguages = event.translations.europeanLanguages;
    });
    // this.stepSevenService.oralHearingForm.patchValue({
    //   oralHearingRequest: 'no',
    //   oralHearingPresence: 'no',
    // });
    // this.stepSevenService.documentAndCommunicationForm.patchValue({
    //   electronicCommunicationWithCourtTribunal: 'no',
    //   electronicCommunicationOther: 'no',
    // });
    // this.stepSevenService.certificateForm.patchValue({
    //   certificateRequest: 'no',
    // });
    // this.stepSevenService.dateAndSignatureForm.patchValue({
    //   city: 'Roma',
    //   date: '01/01/2021',
    //   sign: 'Mario Rossi',
    // });
  }

  initDatepicker(language: string) {
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
        onClose: (value: string) => {
          this.stepSevenService.dateAndSignatureForm
            .get('date')
            .setValue(value);
        },
      }
    );

    $('#dynformSCA8DateSignatureDate').datepicker(options);
  }

  onOralHearingChange(event: any, divIdToExpand: string) {
    const value = event.target.value;
    const element = document.getElementById(divIdToExpand);
    const formControl = this.stepSevenService.oralHearingForm.get(
      event.target.attributes.formControlName.value + 'Reasons'
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
      if (this.stepSevenService.isStepValid()) {
        this.navbarService.previousStepId = this.navbarService.currentStepId;
        this.navbarService.currentStepId = destinationStepId;
        const movement = new Movement('step8', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      } else {
        this.stepSevenService.markStepSevenFormsAsDirty();
      }
    } else if (value === 'back') {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement('step6', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
        content: movement,
      });
    }
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.stepSevenService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.stepSevenService.requiredValidator);
    formControl.updateValueAndValidity();
  }
}
