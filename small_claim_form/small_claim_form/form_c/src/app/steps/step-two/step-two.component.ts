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
import { PreviewModalComponent } from "src/app/preview/preview-modal/preview-modal.component";
import { AbstractControl, FormGroup, UntypedFormGroup } from "@angular/forms";
import { ToastService } from "src/app/shared/services/toast.service";
import { FORM_A_URL } from "src/app/app.constants";
declare const $: any;
datepickerFactory($);

@Component({
  selector: "app-step-two",
  templateUrl: "./step-two.component.html",
  styleUrls: ["./step-two.component.scss"],
  providers: [DatePipe],
})
export class StepTwoComponent implements OnInit {
  formAUrl: string;

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
    // this.stepTwoService.firstPart.patchValue({
    //   claimant: "John Doe",
    //   defendant: "Jane Doe",
    //   court: "Court of Magistrates (Malta)",
    //   claim: "Money",
    //   caseNumber: "123456789",
    // });

    // this.stepTwoService.secondPart.patchValue({
    //   claimApproval: "yes",
    //   oralHearingRequest: "no",
    //   oralHearingPhysicallyPresence: "no",
    //   proceedingsCostClaim: "no",
    //   counterclaim: "no",
    //   electronicJudgmentAgreement: "no",
    //   electronicCommunicationAgreement: "no",
    //   doneAt: "Valletta",
    // });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      const currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
      this.stepTwoService.form
        .get("secondPart")
        .get("date")
        .setValue(currentDate);
      this.initDatepicker(event.lang);
    });
    
    this.formAUrl = FORM_A_URL;
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
      formElement = this.stepTwoService.getFormControl(formControlName);

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

    if (this.stepTwoService.areAllClaimApprovalRadioButtonsUnchecked) {
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
      this.manageClaimApprovalOptions(
        this.stepTwoService.previousSelectedRadioButton,
        excludedFormControls
      );
    }

    this.manageClaimApprovalOptions(
      this.stepTwoService.currentSelectedRadioButton,
      excludedFormControls
    );

    this.stepTwoService.areAllClaimApprovalRadioButtonsUnchecked =
      this.checkIfAllRadioButtonsAreUnchecked();
  }

  manageClaimApprovalOptions(
    radioButtonObj: any,
    excludedFormControls: string[]
  ): void {
    const formGroup = this.stepTwoService.form
      .get("secondPart")
      .get("negativePartialApproval") as FormGroup;

    switch (radioButtonObj.value) {
      case "yes":
        this.stepTwoService.yesClaimApprovalRadioButton =
          !this.stepTwoService.yesClaimApprovalRadioButton;

        if (this.stepTwoService.yesClaimApprovalRadioButton)
          this.setClaimApprovalFormControl("yes");
        else this.setClaimApprovalFormControl("");
        break;
      case "no":
        this.stepTwoService.noClaimApprovalRadioButton =
          !this.stepTwoService.noClaimApprovalRadioButton;

        if (this.stepTwoService.noClaimApprovalRadioButton) {
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
          this.stepTwoService.currentSelectedRadioButton.value !== "partial"
        ) {
          this.collapseDivsAndResetForm(radioButtonObj, formGroup);
        }
        break;
      case "partial":
        this.stepTwoService.partialClaimApprovalRadioButton =
          !this.stepTwoService.partialClaimApprovalRadioButton;

        if (this.stepTwoService.partialClaimApprovalRadioButton) {
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
          this.stepTwoService.currentSelectedRadioButton.value !== "no"
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
    this.stepTwoService.form
      .get("secondPart")
      .get("claimApproval")
      .setValue(value);
  }

  private checkIfAllRadioButtonsAreUnchecked(): boolean {
    if (
      !this.stepTwoService.yesClaimApprovalRadioButton &&
      !this.stepTwoService.noClaimApprovalRadioButton &&
      !this.stepTwoService.partialClaimApprovalRadioButton
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
    formControl.addValidators(this.stepTwoService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidatorFromFormControl(formControl: any) {
    formControl.removeValidators(this.stepTwoService.requiredValidator);
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
            this.stepTwoService.getFormControl(formControlName);
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
}
