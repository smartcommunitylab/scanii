import { Component, NgZone, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { StepOneService } from "src/app/core/step-one/step-one.service";
import datepickerFactory from "jquery-datepicker";
import 'chosen-js';
import { Subscription } from "rxjs";
import { EventManagerService } from "src/app/shared/services/event-manager.service";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { UntypedFormArray } from "@angular/forms";
import { LabelType } from "src/app/shared/constants/step-one.constants";
import { Direction } from "src/app/shared/constants/direction.constants";
import { Movement } from "src/app/core/common/movement.model";
import { ToastService } from "src/app/shared/services/toast.service";
declare const $: any;
datepickerFactory($);
@Component({
  selector: "app-step-one",
  templateUrl: "./step-one.component.html",
  styleUrls: ["./step-one.component.scss"],
})
export class StepOneComponent implements OnInit {
  claimantSelectedOption: string;
  onStableClaimantSubscription: Subscription;
  defendantSelectedOption: string;
  onStableDefendantSubscription: Subscription;

  constructor(
    public stepOneService: StepOneService,
    private translateService: TranslateService,
    private eventManager: EventManagerService,
    private navbarService: NavbarService,
    private zone: NgZone,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.stepOneService.claimants = this.stepOneService.form.get(
      "claimants"
    ) as UntypedFormArray;

    this.stepOneService.defendants = this.stepOneService.form.get(
      "defendants"
    ) as UntypedFormArray;

    // this.stepOneService.form.patchValue({
    //   caseNumber: "123456789",
    //   date: "01/01/2021",
    //   court: {
    //     courtCountry: "2",
    //     name: "Tribunale di Roma",
    //     street: "123 Main Street",
    //     cityPostalCode: "12345 New York",
    //   },
    // });

    // this.stepOneService.claimants.controls[0].patchValue({
    //   firstName: "John",
    //   surname: "Doe",
    //   street: "123 Main Street",
    //   postalCode: "12345",
    //   city: "New York",
    //   country: "2",
    // });

    // this.stepOneService.defendants.controls[0].patchValue({
    //   firstName: "John",
    //   surname: "Doe",
    //   street: "123 Main Street",
    //   postalCode: "12345",
    //   city: "New York",
    //   country: "2",
    // });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initDatepicker(event.lang);
      this.stepOneService.europeanCountries =
        event.translations.europeanCountries;
      this.stepOneService.worldCountries = event.translations.worldCountries;
    });
  }

  initDatepicker(language: string) {
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
        onClose: (value: string) => {
          this.stepOneService.form.get("date")?.setValue(value);
        },
      }
    );

    $("#dynformSCB1ReceivedByTheCourtTribunalOnDate").datepicker(options);
  }

  expandCourtWorldCountrySelect(event: any, worldCountrySelectId: string) {
    const value = event.target.value;

    const element = document.getElementById(worldCountrySelectId);

    if (value === "other") {
      if (element?.classList.contains("df_collapsed")) {
        const formControlName =
          event.target.getAttribute("formControlName") + "Other";
        const formControl = this.stepOneService.getFormControl(formControlName);

        element.classList.remove("df_collapsed");
        this.addRequiredValidator(formControl);
        this.stepOneService.isCourtWorldCountrySelectVisible = true;
      }
    } else {
      if (!element?.classList.contains("df_collapsed")) {
        element?.classList.add("df_collapsed");

        const formControlName =
          event.target.getAttribute("formControlName") + "Other";
        const formControl = this.stepOneService.getFormControl(formControlName);

        formControl?.reset();
        this.removeRequiredValidator(formControl);
        this.stepOneService.isCourtWorldCountrySelectVisible = false;
      }
      if (value === "28") this.openModal("js_modal_form_disclaimer_step_one");
    }
  }

  openModal(id: string) {
    document.body.style.overflow = "hidden";
    document.getElementById(id)?.classList.add("active");
  }

  closeModal(id: string) {
    document.body.style.overflow = "auto";
    document.getElementById(id)?.classList.remove("active");
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.stepOneService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.stepOneService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  // markOrganisationSurnameFirstNameAsDirty(formControlName: string) {
  //   const formGroup = this.stepOneService.getFormControl(formControlName);
  //   if (!formGroup?.get("organisation")?.dirty)
  //     formGroup?.get("organisation")?.markAsDirty();
  //   if (!formGroup?.get("surname")?.dirty)
  //     formGroup?.get("surname")?.markAsDirty();
  //   if (!formGroup?.get("firstName")?.dirty)
  //     formGroup?.get("firstName")?.markAsDirty();
  // }

  markClaimantOrganisationSurnameFirstNameAsDirty(index: number) {
    const formGroup = this.stepOneService.claimants.at(index);
    if (!formGroup.get("organisation").dirty)
      formGroup.get("organisation").markAsDirty();
    if (!formGroup.get("surname").dirty) formGroup.get("surname").markAsDirty();
    if (!formGroup.get("firstName").dirty)
      formGroup.get("firstName").markAsDirty();
  }

  addAnotherClaimant(index?: number) {
    this.stepOneService.claimants = this.stepOneService.form.get(
      "claimants"
    ) as UntypedFormArray;
    if (this.claimantSelectedOption === "claimant") {
      //create a new claimant
      const formGroup = this.stepOneService.createClaimantFormGroup("claimant");

      this.stepOneService.claimants.push(formGroup);
    } else if (this.claimantSelectedOption === "representative") {
      //create a new representative
      this.stepOneService.claimants.push(
        this.stepOneService.createClaimantFormGroup("representative")
      );
      this.stepOneService.addClaimantRepresentative(
        this.stepOneService.claimants.length - 1
      );
    }

    if (index !== undefined) {
      this.stepOneService.claimants
        .at(index)
        .get("representative")
        .setValue((this.stepOneService.claimants.length - 1).toString());
    }

    this.closeModal("js_modal_add_claimant");

    for (let i = 0; i < this.stepOneService.claimants.length - 1; i++) {
      const element = document.getElementById("al_block_claimant" + i);
      if (element.classList.contains("open")) element.classList.remove("open");
    }

    this.claimantSelectedOption = undefined;
  }

  removeClaimant(index: number) {
    this.stepOneService.claimants = this.stepOneService.form.get(
      "claimants"
    ) as UntypedFormArray;

    if (this.stepOneService.claimants.at(index).get("isRepresentative").value) {
      this.stepOneService.removeClaimantRepresentative(index);
    }

    for (const representative of this.stepOneService.claimantRepresentatives) {
      if (representative.id > index) representative.id--;
    }

    this.stepOneService.claimants.removeAt(index);
  }

  toggleClaimantVisibility(index: number) {
    const element = document.getElementById("al_block_claimant" + index);
    if (!element.classList.contains("open")) element.classList.add("open");
    else element.classList.remove("open");
  }

  expandClaimantWorldCountrySelect(
    event: any,
    index: number,
    isClaimant: boolean
  ) {
    const value = event.target.value;

    const id = isClaimant
      ? "claimantWorldCountrySelect" + index
      : "claimantRepresentativeWorldCountrySelect" + index;

    const element = document.getElementById(id).firstElementChild;
    const formControl = this.stepOneService.claimants
      .at(index)
      .get("countryOther");

    if (value === "other") {
      if (element.classList.contains("df_collapsed")) {
        element.classList.remove("df_collapsed");
        this.initClaimantWorldCountrySelect(index, isClaimant);
        this.addRequiredValidator(formControl);
        this.stepOneService.isClaimantWorldCountrySelectVisible = true;
      }
    } else {
      if (!element.classList.contains("df_collapsed")) {
        element.classList.add("df_collapsed");
        this.resetClaimantWorldCountrySelect(index, isClaimant);
        this.removeRequiredValidator(formControl);
        this.stepOneService.isClaimantWorldCountrySelectVisible = false;
      }
      if (value === "28") this.openModal("js_modal_form_disclaimer_step_one");
    }
  }

  initClaimantWorldCountrySelect(index: number, isClaimant: boolean) {
    const clazz = isClaimant
      ? ".dynformSCB1ClaimantCountryOther" + index
      : ".dynformSCB1ClaimantRepresentativeCountryOther" + index;
    var $select = $(clazz);

    if (!$select.hasClass("chosen-container")) {
      $select.chosen({
        width: "100%",
        inherit_select_classes: true,
        search_contains: true,
        display_disabled_options: false,
      });
      $select.chosen().change((event: any, data: any) => {
        this.stepOneService.claimants
          .at(index)
          .get("countryOther")
          .setValue(data.selected);
      });
    }
  }

  resetClaimantWorldCountrySelect(index: number, isClaimant: boolean) {
    const clazz = isClaimant
      ? ".dynformSCB1ClaimantCountryOther" + index
      : ".dynformSCB1ClaimantRepresentativeCountryOther" + index;
    var $select = $(clazz);

    $select.val("").trigger("chosen:updated");

    this.stepOneService.claimants.at(index).get("countryOther").setValue("");
  }

  onClaimantRepresentativeChange(event: any, index: number) {
    const value = event.target.value;

    if (value === "dynform_add_new_representative") {
      this.claimantSelectedOption = "representative";
      this.addAnotherClaimant(index);
    }
  }

  onClaimantRepresentativeOrganisationChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.stepOneService.claimantRepresentatives.find(
      (r) => r.id === index
    );
    representative.organisation = value;
    if (!this.stepOneService.claimants.at(index).get("organisation").invalid) {
      if (representative.organisation === "") {
        if (representative.firstName !== "" && representative.surname !== "") {
          const fullName =
            representative.firstName + " " + representative.surname;
          representative.label =
            representative.address !== ""
              ? fullName + " (" + representative.address + ")"
              : fullName;
          representative.labelType = LabelType.FULL_NAME;
        } else {
          representative.label = representative.default;
          representative.labelType = LabelType.DEFAULT;
        }
      } else {
        representative.label =
          representative.address !== ""
            ? representative.organisation + " (" + representative.address + ")"
            : representative.organisation;
        representative.labelType = LabelType.ORGANISATION;
      }
    }
  }

  onClaimantRepresentativeSurnameFirstNameChange(
    event: any,
    index: number,
    field: string
  ) {
    const value = event.target.value;
    const representative = this.stepOneService.claimantRepresentatives.find(
      (r) => r.id === index
    );
    representative[field] = value;
    if (
      !this.stepOneService.claimants.at(index).get("firstName").invalid &&
      !this.stepOneService.claimants.at(index).get("surname").invalid
    ) {
      if (representative.firstName !== "" && representative.surname !== "") {
        const fullName =
          representative.firstName + " " + representative.surname;
        representative.label =
          representative.address !== ""
            ? fullName + " (" + representative.address + ")"
            : fullName;
        representative.labelType = LabelType.FULL_NAME;
      } else {
        if (representative.organisation !== "") {
          representative.label =
            representative.address !== ""
              ? representative.organisation +
                " (" +
                representative.address +
                ")"
              : representative.organisation;
          representative.labelType = LabelType.ORGANISATION;
        } else {
          representative.label = representative.default;
          representative.labelType = LabelType.DEFAULT;
        }
      }
    }
  }

  onClaimantRepresentativeAddressChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.stepOneService.claimantRepresentatives.find(
      (r) => r.id === index
    );
    representative.address = value;

    if (representative.label.includes(" (")) {
      representative.label = representative.label.split(" (")[0];
    }
    if (representative.address !== "") {
      representative.label =
        representative.label + " (" + representative.address + ")";
    }
  }

  addAnotherDefendant(index?: number) {
    this.stepOneService.defendants = this.stepOneService.form.get(
      "defendants"
    ) as UntypedFormArray;
    if (this.defendantSelectedOption === "defendant") {
      //create a new claimant
      const formGroup =
        this.stepOneService.createDefendantFormGroup("defendant");

      this.stepOneService.defendants.push(formGroup);
    } else if (this.defendantSelectedOption === "representative") {
      //create a new representative
      this.stepOneService.defendants.push(
        this.stepOneService.createDefendantFormGroup("representative")
      );
      this.stepOneService.addDefendantRepresentative(
        this.stepOneService.defendants.length - 1
      );
    }

    if (index !== undefined) {
      this.stepOneService.defendants
        .at(index)
        .get("representative")
        .setValue((this.stepOneService.defendants.length - 1).toString());
    }

    this.closeModal("js_modal_add_defendant");

    for (let i = 0; i < this.stepOneService.defendants.length - 1; i++) {
      const element = document.getElementById("al_block_defendant" + i);
      if (element.classList.contains("open")) element.classList.remove("open");
    }

    this.defendantSelectedOption = undefined;
  }

  removeDefendant(index: number) {
    this.stepOneService.defendants = this.stepOneService.form.get(
      "defendants"
    ) as UntypedFormArray;

    if (
      this.stepOneService.defendants.at(index).get("isRepresentative").value
    ) {
      this.stepOneService.removeDefendantRepresentative(index);
    }

    for (const representative of this.stepOneService.defendantRepresentatives) {
      if (representative.id > index) representative.id--;
    }

    this.stepOneService.defendants.removeAt(index);
  }

  toggleDefendantVisibility(index: number) {
    const element = document.getElementById("al_block_defendant" + index);
    if (!element.classList.contains("open")) element.classList.add("open");
    else element.classList.remove("open");
  }

  expandDefendantWorldCountrySelect(
    event: any,
    index: number,
    isDefendant: boolean
  ) {
    const value = event.target.value;

    const id = isDefendant
      ? "defendantWorldCountrySelect" + index
      : "defendantRepresentativeWorldCountrySelect" + index;

    const element = document.getElementById(id).firstElementChild;
    const formControl = this.stepOneService.defendants
      .at(index)
      .get("countryOther");

    if (value === "other") {
      if (element.classList.contains("df_collapsed")) {
        element.classList.remove("df_collapsed");
        this.initDefendantWorldCountrySelect(index, isDefendant);
        this.addRequiredValidator(formControl);
        this.stepOneService.isDefendantWorldCountrySelectVisible = true;
      }
    } else {
      if (!element.classList.contains("df_collapsed")) {
        element.classList.add("df_collapsed");
        this.resetDefendantWorldCountrySelect(index, isDefendant);
        this.removeRequiredValidator(formControl);
        this.stepOneService.isDefendantWorldCountrySelectVisible = false;
      }
      if (value === "28") this.openModal("js_modal_form_disclaimer_step_one");
    }
  }

  initDefendantWorldCountrySelect(index: number, isDefendant: boolean) {
    const clazz = isDefendant
      ? ".dynformSCB1DefendantCountryOther" + index
      : ".dynformSCB1DefendantRepresentativeCountryOther" + index;
    var $select = $(clazz);

    if (!$select.hasClass("chosen-container")) {
      $select.chosen({
        width: "100%",
        inherit_select_classes: true,
        search_contains: true,
        display_disabled_options: false,
      });
      $select.chosen().change((event: any, data: any) => {
        this.stepOneService.defendants
          .at(index)
          .get("countryOther")
          .setValue(data.selected);
      });
    }
  }

  resetDefendantWorldCountrySelect(index: number, isDefendant: boolean) {
    const clazz = isDefendant
      ? ".dynformSCB1DefendantCountryOther" + index
      : ".dynformSCB1DefendantRepresentativeCountryOther" + index;
    var $select = $(clazz);

    $select.val("").trigger("chosen:updated");

    this.stepOneService.defendants.at(index).get("countryOther").setValue("");
  }

  markDefendantOrganisationSurnameFirstNameAsDirty(index: number) {
    const formGroup = this.stepOneService.defendants.at(index);
    if (!formGroup.get("organisation").dirty)
      formGroup.get("organisation").markAsDirty();
    if (!formGroup.get("surname").dirty) formGroup.get("surname").markAsDirty();
    if (!formGroup.get("firstName").dirty)
      formGroup.get("firstName").markAsDirty();
  }

  onDefendantRepresentativeChange(event: any, index: number) {
    const value = event.target.value;
    if (value === "dynform_add_new_representative") {
      this.defendantSelectedOption = "representative";
      this.addAnotherDefendant(index);
    }
  }

  onDefendantRepresentativeOrganisationChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.stepOneService.defendantRepresentatives.find(
      (r) => r.id === index
    );
    representative.organisation = value;
    if (!this.stepOneService.defendants.at(index).get("organisation").invalid) {
      if (representative.organisation === "") {
        if (representative.firstName !== "" && representative.surname !== "") {
          const fullName =
            representative.firstName + " " + representative.surname;
          representative.label =
            representative.address !== ""
              ? fullName + " (" + representative.address + ")"
              : fullName;
          representative.labelType = LabelType.FULL_NAME;
        } else {
          representative.label = representative.default;
          representative.labelType = LabelType.DEFAULT;
        }
      } else {
        representative.label =
          representative.address !== ""
            ? representative.organisation + " (" + representative.address + ")"
            : representative.organisation;
        representative.labelType = LabelType.ORGANISATION;
      }
    }
  }

  onDefendantRepresentativeSurnameFirstNameChange(
    event: any,
    index: number,
    field: string
  ) {
    const value = event.target.value;
    const representative = this.stepOneService.defendantRepresentatives.find(
      (r) => r.id === index
    );
    representative[field] = value;
    if (
      !this.stepOneService.defendants.at(index).get("firstName").invalid &&
      !this.stepOneService.defendants.at(index).get("surname").invalid
    ) {
      if (representative.firstName !== "" && representative.surname !== "") {
        const fullName =
          representative.firstName + " " + representative.surname;
        representative.label =
          representative.address !== ""
            ? fullName + " (" + representative.address + ")"
            : fullName;
        representative.labelType = LabelType.FULL_NAME;
      } else {
        if (representative.organisation !== "") {
          representative.label =
            representative.address !== ""
              ? representative.organisation +
                " (" +
                representative.address +
                ")"
              : representative.organisation;
          representative.labelType = LabelType.ORGANISATION;
        } else {
          representative.label = representative.default;
          representative.labelType = LabelType.DEFAULT;
        }
      }
    }
  }

  onDefendantRepresentativeAddressChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.stepOneService.defendantRepresentatives.find(
      (r) => r.id === index
    );
    representative.address = value;

    if (representative.label.includes(" (")) {
      representative.label = representative.label.split(" (")[0];
    }
    if (representative.address !== "") {
      representative.label =
        representative.label + " (" + representative.address + ")";
    }
  }

  changeStep(value: string, destinationStepId: string) {
    if (!this.stepOneService.form.invalid) {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      if (value === "next") {
        const movement = new Movement("step2", Direction.NEXT);
        this.eventManager.broadcast({
          name: "changeStep",
          content: movement,
        });
      }
    } else {
      this.stepOneService.markStepOneFormAsDirty();
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
