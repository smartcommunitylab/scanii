import { StepOneService } from "src/app/core/step-one/step-one.service";
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
import { AbstractControl, FormGroup, UntypedFormGroup } from "@angular/forms";
import { ToastService } from "src/app/shared/services/toast.service";
import { FORM_A_URL } from "src/app/app.constants";
declare const $: any;
datepickerFactory($);

@Component({
  selector: "app-step-one",
  templateUrl: "./step-one.component.html",
  styleUrls: ["./step-one.component.scss"],
  providers: [DatePipe],
})
export class StepOneComponent implements OnInit {
  formAUrl: string;

  constructor(
    public stepOneService: StepOneService,
    private renderer: Renderer2,
    private translateService: TranslateService,
    private navbarService: NavbarService,
    private eventManager: EventManagerService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formAUrl = FORM_A_URL;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      const currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
      this.stepOneService.form
        .get("secondPart")
        .get("date")
        .setValue(currentDate);
      this.initDatepicker(event.lang);
    });
  }

  showHideDiv(
    event: any,
    divIds: string[],
    referenceValues: string[],
    formControlName?: string,
    excludedFormControls?: string[]
  ) {
    const value = event.target.value;
    const elementToExpand = document.getElementById(divIds[0]);
    let formElement: AbstractControl;
    if (formControlName)
      formElement = this.stepOneService.getFormControl(formControlName);

    if (referenceValues.includes(value)) {
      if (elementToExpand.classList.contains("df_collapsed")) {
        if (formControlName) {
          if (formElement instanceof UntypedFormGroup) {
            const array = excludedFormControls ? excludedFormControls : [];
            this.addRequiredValidatorToFormElement(formElement, array);
          } else if (
            !excludedFormControls ||
            !excludedFormControls.includes(formControlName)
          ) {
            this.addRequiredValidatorToFormControl(formElement);
          }
        }

        //expand div
        elementToExpand.classList.remove("df_collapsed");
      }
    } else {
      //collapse divs
      for (const id of divIds) {
        const elementToCollapse = document.getElementById(id);
        if (!elementToCollapse.classList.contains("df_collapsed")) {
          elementToCollapse.classList.add("df_collapsed");
        }
      }

      if (formControlName) {
        formElement.reset();
        this.removeRequiredValidatorFromFormElement(formElement);
      }
    }
  }

  onClaimApprovalRadioButtonsClick(
    event: any,
    divIdToExpand: string,
    extendibleInternalDivIds: string[],
    excludedFormControls: string[]
  ) {
    const value = event.target.value;

    if (this.stepOneService.areAllClaimApprovalRadioButtonsUnchecked) {
      this.stepOneService.previousSelectedRadioButton = {
        value,
        divIdToExpand,
        extendibleInternalDivIds,
      };
      this.stepOneService.currentSelectedRadioButton = {
        value,
        divIdToExpand,
        extendibleInternalDivIds,
      };
    } else {
      this.stepOneService.previousSelectedRadioButton =
        this.stepOneService.currentSelectedRadioButton;

      this.stepOneService.currentSelectedRadioButton = {
        value,
        divIdToExpand,
        extendibleInternalDivIds,
      };
    }

    if (
      this.stepOneService.currentSelectedRadioButton.value !==
      this.stepOneService.previousSelectedRadioButton.value
    ) {
      this.manageClaimApprovalOptions(
        this.stepOneService.previousSelectedRadioButton,
        excludedFormControls
      );
    }

    this.manageClaimApprovalOptions(
      this.stepOneService.currentSelectedRadioButton,
      excludedFormControls
    );

    this.stepOneService.areAllClaimApprovalRadioButtonsUnchecked =
      this.checkIfAllRadioButtonsAreUnchecked();
  }

  manageClaimApprovalOptions(
    radioButtonObj: any,
    excludedFormControls: string[]
  ): void {
    const formGroup = this.stepOneService.form
      .get("secondPart")
      .get("negativePartialApproval") as FormGroup;

    switch (radioButtonObj.value) {
      case "yes":
        this.stepOneService.yesClaimApprovalRadioButton =
          !this.stepOneService.yesClaimApprovalRadioButton;

        if (this.stepOneService.yesClaimApprovalRadioButton)
          this.setClaimApprovalFormControl("yes");
        else this.setClaimApprovalFormControl("");
        break;
      case "no":
        this.stepOneService.noClaimApprovalRadioButton =
          !this.stepOneService.noClaimApprovalRadioButton;

        if (this.stepOneService.noClaimApprovalRadioButton) {
          this.addRequiredValidatorToFormElement(
            formGroup,
            excludedFormControls
          );

          //expand div
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);

          this.setClaimApprovalFormControl("no");
        }
        // in the case where the user selects the option with the value "no" and then selects the option with the value "partial", the expandable divs must remain open and not be collapsed
        else if (
          this.stepOneService.currentSelectedRadioButton.value !== "partial"
        ) {
          this.collapseDivsAndResetForm(radioButtonObj, formGroup);
        }
        break;
      case "partial":
        this.stepOneService.partialClaimApprovalRadioButton =
          !this.stepOneService.partialClaimApprovalRadioButton;

        if (this.stepOneService.partialClaimApprovalRadioButton) {
          this.addRequiredValidatorToFormElement(
            formGroup,
            excludedFormControls
          );

          //expand div
          this.removeDfCollpasedClass(radioButtonObj.divIdToExpand);

          this.setClaimApprovalFormControl("partial");
        }
        // in the case where the user selects the option with the value "partial" and then selects the option with the value "no", the expandable divs must remain open and not be collapsed
        else if (
          this.stepOneService.currentSelectedRadioButton.value !== "no"
        ) {
          this.collapseDivsAndResetForm(radioButtonObj, formGroup);
        }
        break;
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

    this.setClaimApprovalFormControl("");
  }

  private setClaimApprovalFormControl(value: string) {
    this.stepOneService.form
      .get("secondPart")
      .get("claimApproval")
      .setValue(value);
  }

  private checkIfAllRadioButtonsAreUnchecked(): boolean {
    if (
      !this.stepOneService.yesClaimApprovalRadioButton &&
      !this.stepOneService.noClaimApprovalRadioButton &&
      !this.stepOneService.partialClaimApprovalRadioButton
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
    formControl.addValidators(this.stepOneService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidatorFromFormControl(formControl: any) {
    formControl.removeValidators(this.stepOneService.requiredValidator);
    formControl.updateValueAndValidity();
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
            this.stepOneService.getFormControl(formControlName);
          formControl.setValue(value);
        },
      }
    );

    $("#dynformsSCC1P2Date").datepicker(options);
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === "back") {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement("step0", Direction.BACK);
      this.eventManager.broadcast({
        name: "changeStep",
        content: movement,
      });
    }
  }

  openPreviewModal() {
    if (!this.stepOneService.form.invalid) {
      this.toastService.hideErrorToast();

      const element = document.getElementById("step1-menu");
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
      this.stepOneService.markStepOneFormAsDirty(this.stepOneService.form);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      this.toastService.showErrorToast();
      this.navbarService.addRemoveGreenTick("step1", false);
    }
  }
}
