import { StepTwoService } from "src/app/core/step-two/step-two.service";
import { AfterViewInit, Component, OnInit, Renderer2 } from "@angular/core";
import datepickerFactory from "jquery-datepicker";
import "chosen-js";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { Movement } from "src/app/core/common/movement.model";
import { Direction } from "src/app/shared/constants/direction.constants";
import { EventManagerService } from "src/app/shared/services/event-manager.service";
import { DatePipe } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PreviewModalComponent } from "src/app/shared/components/preview-modal/preview-modal.component";
import { ToastService } from "src/app/shared/services/toast.service";
import { FormGroup, UntypedFormGroup } from "@angular/forms";
declare const $: any;
datepickerFactory($);

@Component({
  selector: "app-step-two",
  templateUrl: "./step-two.component.html",
  styleUrls: ["./step-two.component.scss"],
  providers: [DatePipe],
})
export class StepTwoComponent implements OnInit {
  isLanguageSelectUsedForTheFirstTime = true;
  languageSelectPlaceholder: string = "";

  constructor(
    public stepTwoService: StepTwoService,
    private renderer: Renderer2,
    private translateService: TranslateService,
    private navbarService: NavbarService,
    private eventManager: EventManagerService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // this.stepTwoService.form.patchValue({
    //   judgmentOrSettlement: "judgment",
    //   doneAt: "Roma",
    //   date: "01/01/2021",
    // });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      const currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
      this.stepTwoService.form.get("date").setValue(currentDate);
      this.initDatepicker(event.lang);
    });
  }

  private initDatepicker(language: string) {
    let languageToUse = language;

    if (language === "en") {
      languageToUse = "en-GB";
    } else if (language === "mt") {
      languageToUse = "en-GB";
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
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2060",
        onClose: (value: string, inst: any) => {
          const formControlName =
            inst.input[0].attributes.formControlName.value;
          const formControl =
            this.stepTwoService.getFormControl(formControlName);
          formControl.setValue(value);
        },
      }
    );

    $("#dynformSCD2JudgmentDate").datepicker(options);
    $("#dynformSCD2WasJudgmentGivenAppealCourtDate").datepicker(options);
    $("#dynformSCD2CourtSettlementDate").datepicker(options);
    $("#dynformSCD2Date").datepicker(options);
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === "back") {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement("step1", Direction.BACK);
      this.eventManager.broadcast({
        name: "changeStep",
        content: movement,
      });
    }
  }

  openPreviewModal() {
    if (!this.stepTwoService.form.invalid) {
      this.toastService.hideErrorToast();
      const element = document.getElementById("step2-menu");
      element.querySelector("a div.validation-icon").classList.add("validated");
      const modalRef = this.modalService.open(PreviewModalComponent, {
        size: "xl",
        backdrop: "static",
        centered: true,
      });
      modalRef.result.then(
        () => {
          //this.loadAllUsers();
        },
        () => {
          //this.loadAllUsers();
        }
      );
    } else {
      this.stepTwoService.markStepTwoFormAsDirty(this.stepTwoService.form);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      this.toastService.showErrorToast();
      this.navbarService.addRemoveGreenTick("step2", false);
    }
  }

  onJudgmentSettlementRadioButtonsClick(
    event: any,
    divIdToExpand: string,
    extendibleInternalDivIds: string[],
    excludedFormControls?: string[]
  ) {
    const value = event.target.value;

    if (this.stepTwoService.areJudgmentSettlementRadioButtonsUnchecked) {
      this.stepTwoService.previousSelectedRadioButton = {
        value,
        divIdToExpand,
        extendibleInternalDivIds,
      };
      this.stepTwoService.currentSelectedRadioButton = {
        value,
        divIdToExpand,
        extendibleInternalDivIds,
      };
    } else {
      this.stepTwoService.previousSelectedRadioButton =
        this.stepTwoService.currentSelectedRadioButton;

      this.stepTwoService.currentSelectedRadioButton = {
        value,
        divIdToExpand,
        extendibleInternalDivIds,
      };
    }

    if (
      this.stepTwoService.currentSelectedRadioButton.value !==
      this.stepTwoService.previousSelectedRadioButton.value
    ) {
      this.manageJudgmentSettlementOptions(
        this.stepTwoService.previousSelectedRadioButton,
        excludedFormControls
      );
    }

    this.manageJudgmentSettlementOptions(
      this.stepTwoService.currentSelectedRadioButton,
      excludedFormControls
    );

    this.stepTwoService.areJudgmentSettlementRadioButtonsUnchecked =
      this.checkIfAllRadioButtonsAreUnchecked();
  }

  manageJudgmentSettlementOptions(
    radioButtonObj: any,
    excludedFormControls?: string[]
  ): void {
    //the name of the form control equals the value of the radio button
    const formGroup = this.stepTwoService.form.get(
      radioButtonObj.value
    ) as FormGroup;

    switch (radioButtonObj.value) {
      case "judgment":
        this.stepTwoService.judgmentRadioButton =
          !this.stepTwoService.judgmentRadioButton;

        if (this.stepTwoService.judgmentRadioButton) {
          this.addRequiredValidatorToFormElement(
            formGroup,
            excludedFormControls
          );

          //expand div
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);

          this.setJudgmentOrSettlementFormControl("judgment");
        } else {
          this.collapseDivsAndResetForm(radioButtonObj, formGroup);
        }
        break;
      case "settlement":
        this.stepTwoService.settlementRadioButton =
          !this.stepTwoService.settlementRadioButton;

        if (this.stepTwoService.settlementRadioButton) {
          this.addRequiredValidatorToFormElement(
            formGroup,
            excludedFormControls
          );

          //expand div
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);

          this.setJudgmentOrSettlementFormControl("settlement");
        } else {
          this.collapseDivsAndResetForm(radioButtonObj, formGroup);
        }
        break;
    }
  }

  expandSupersededJudgmentDiv(event: any) {
    const supersededJudgmentExpansion = this.stepTwoService.form
      .get("judgment")
      .get("supersededJudgmentExpansion") as UntypedFormGroup;

    if (event.target.checked) {
      this.addRequiredValidatorToFormElement(supersededJudgmentExpansion);

      document
        .getElementById("dynformSCD2WasJudgmentGivenAppealCourt_div")
        .classList.remove("df_collapsed");
    } else {
      document
        .getElementById("dynformSCD2WasJudgmentGivenAppealCourt_div")
        .classList.add("df_collapsed");

      this.removeRequiredValidatorFromFormElement(supersededJudgmentExpansion);
      supersededJudgmentExpansion.reset();
    }
  }

  private collapseDivsAndResetForm(radioButtonObj: any, formGroup: FormGroup) {
    //collapse divs
    const array = [
      radioButtonObj.divIdToExpand,
      ...radioButtonObj.extendibleInternalDivIds,
    ];
    for (const id of array) {
      if (id) {
        const elementToCollapse = document.getElementById(id);
        if (!elementToCollapse.classList.contains("df_collapsed")) {
          elementToCollapse.classList.add("df_collapsed");
        }
      }
    }

    formGroup.reset();
    this.removeRequiredValidatorFromFormElement(formGroup);

    this.setJudgmentOrSettlementFormControl("");
  }

  private setJudgmentOrSettlementFormControl(value: string) {
    this.stepTwoService.form.get("judgmentOrSettlement").setValue(value);
  }

  private checkIfAllRadioButtonsAreUnchecked(): boolean {
    if (
      !this.stepTwoService.judgmentRadioButton &&
      !this.stepTwoService.settlementRadioButton
    )
      return true;
    else return false;
  }

  private removeDfCollpasedClass(divId: string) {
    const element = document.getElementById(divId);
    element.classList.remove("df_collapsed");
  }

  private addRequiredValidatorToFormElement(
    formElement: UntypedFormGroup,
    excludedFormControls?: string[]
  ) {
    for (const formControlName in formElement.controls) {
      //if the excludedFormControls array is not specified, the required validator is added to all the form controls. Otherwise, it is added only to the form controls not specified in the array
      if (
        !excludedFormControls ||
        (excludedFormControls &&
          !excludedFormControls.includes(formControlName))
      ) {
        const formControl = formElement.get(formControlName);
        this.addRequiredValidatorToFormControl(formControl);
      }
    }
  }

  private removeRequiredValidatorFromFormElement(formElement: any) {
    if (formElement instanceof UntypedFormGroup) {
      for (const formControlName in formElement.controls) {
        const internalFormElement = formElement.get(formControlName);
        if (internalFormElement instanceof UntypedFormGroup) {
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
    formControl.addValidators(this.stepTwoService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidatorFromFormControl(formControl: any) {
    formControl.removeValidators(this.stepTwoService.requiredValidator);
    formControl.updateValueAndValidity();
  }
}
