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
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.stepTwoService.form.patchValue({
      expiryDate: "01/01/2021",
      languages: ["00", "01", "cinese"],
      statement: "Statement",
      doneAt: "Trento",
    });

    this.renderer.listen("window", "DOMContentLoaded", () => {
      this.initLanguagesSelect();
    });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      const currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
      this.stepTwoService.form.get("date").setValue(currentDate);
      this.initDatepicker(event.lang);
      this.stepTwoService.europeanLanguages =
        event.translations.europeanLanguages;

      setTimeout(() => {
        $("#dynformSCB2Language").trigger("chosen:updated");

        this.stepTwoService.setLanguagesSelect();
      }, 100);
    });

    this.translateService
      .stream(["stepTwo.select", "stepTwo.other", "stepTwo.specify"])
      .subscribe((response) => {
        this.languageSelectPlaceholder = response["stepTwo.select"];
        document.getElementById("chosen-text").innerText =
          response["stepTwo.other"];
        document
          .getElementById("chosen-text-input")
          .setAttribute("placeholder", response["stepTwo.specify"]);
      });
  }

  private initLanguagesSelect() {
    const id = "#dynformSCB2Language";
    const $select = $(id);

    $select.chosen({
      width: "100%",
      hide_results_on_select: false,
      max_selected_options: 3,
    });

    // append the text field that allows to add a new language
    $("#dynformSCB2LanguageContainer .chosen-drop").append(
      `<div class="input-group chosen-input-group">
        <span class="input-group-text chosen-input-group-text" id="chosen-text">Other</span>
        <input type="text" class="form-control chosen-input" id="chosen-text-input" placeholder="Please select">
        <button class="btn" type="button" id="chosen-button"></button>
      </div>`
    );

    // click event for button with id "chosen-button"
    const chosenButton = document.getElementById("chosen-button");
    this.renderer.listen(chosenButton, "click", (event: any) => {
      document.getElementById("chosen-button").blur();
      this.addOption(event);
    });

    // change event for select with id "dynformSCB2Language"
    $select.chosen().change((event: any, data: any) => {
      if (this.isLanguageSelectUsedForTheFirstTime) {
        this.isLanguageSelectUsedForTheFirstTime = false;
        this.markLanguagesStatementAsDirty();
      }
      this.onLanguageSelectChange($select, data);
    });
  }

  private addOption(event: any) {
    const value = event.target.previousElementSibling.value;
    const optionHTML = '<option value="' + value + '" class="added-option">' + value + "</option>";

    if (value) {
      $("#dynformSCB2Language").append(optionHTML).trigger("chosen:updated");
      $(".chosen-input").val("");
    }
  }

  onLanguageSelectChange($select: any, data: any) {
    const selectedOptions = $select.val() as string[];

    if (data.selected) {
      this.stepTwoService.form
        .get("languages")
        .setValue([
          ...this.stepTwoService.form.get("languages").value,
          data.selected,
        ]);
    } else if (data.deselected) {
      const languages = this.stepTwoService.form.get("languages")
        .value as string[];
      const index = languages.indexOf(data.deselected);
      if (index > -1) {
        languages.splice(index, 1);
        this.stepTwoService.form.get("languages").setValue([...languages]);
      }
    }

    this.stepTwoService.form.updateValueAndValidity();

    if (selectedOptions.length === 3) {
      $select.trigger("chosen:close");
    }
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
          const formControl = this.stepTwoService.form.get(formControlName);
          formControl.setValue(value);
        },
      }
    );

    $("#dynformSCB2Date").datepicker(options);
    $("#dynformSCB2DoneDate").datepicker(options);
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
      // this.toastService.hideErrorToast();
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
      this.stepTwoService.markStepTwoFormAsDirty();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      //this.toastService.showErrorToast();
    }
  }

  markLanguagesStatementAsDirty() {
    if (!this.stepTwoService.form.get("languages").dirty)
      this.stepTwoService.form.get("languages").markAsDirty();

    if (!this.stepTwoService.form.get("statement").dirty)
      this.stepTwoService.form.get("statement").markAsDirty();
  }
}
