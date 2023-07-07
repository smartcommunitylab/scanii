import { Component, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { EventManagerService } from "src/app/shared/services/event-manager.service";
import { Movement } from "src/app/core/common/movement.model";
import { CourtService } from "src/app/core/court/court.service";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { Direction } from "src/app/shared/constants/direction.constants";
import { ToastService } from "src/app/shared/services/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PreviewModalComponent } from "src/app/shared/components/preview-modal/preview-modal.component";

@Component({
  selector: "app-court",
  templateUrl: "./court.component.html",
  styleUrls: ["./court.component.scss"],
})
export class CourtComponent implements OnInit {
  selectedCountry: string;

  constructor(
    public courtService: CourtService,
    private eventManager: EventManagerService,
    public navbarService: NavbarService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.courtService.europeanCountries =
        event.translations.europeanCountries;
      this.setFindCourtCountry();
    });
    this.courtService.editForm.patchValue({
      country: "IT",
      name: "County Court Business Centre",
      street: "St Katharine’s House",
    });
  }

  toggleFindCourt() {
    document.getElementById("find_court").classList.toggle("open");
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === "back") {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement("step7", Direction.BACK);
      this.eventManager.broadcast({
        name: "changeStep",
        content: movement,
      });
    }
  }

  generateJson() {
    if (!this.courtService.editForm.invalid) {
      this.navbarService.generateJson();
    } else {
      this.courtService.markCourtFormAsDirty();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      this.toastService.showErrorToast();
    }
  }

  setFindCourtCountry() {
    const country = this.courtService.europeanCountries.find(
      (country) =>
        country.value === this.courtService.editForm.get("country").value
    );
    if (country) {
      this.selectedCountry = country.label;
    }
    if (this.courtService.editForm.get("country").value === "GB")
      this.openModal("js_modal_form_disclaimer_court");
  }

  openModal(id: string) {
    document.body.style.overflow = "hidden";
    document.getElementById(id).classList.add("active");
  }

  closeModal(id: string) {
    document.getElementById(id).classList.remove("active");
    document.body.style.overflow = "auto";
  }

  openPreviewModal() {
    if (!this.courtService.editForm.invalid) {
      this.toastService.hideErrorToast();

      const element = document.getElementById('step8-menu');
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
      this.courtService.markCourtFormAsDirty();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      this.toastService.showErrorToast();
    }
  }
}
