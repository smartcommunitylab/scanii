import { Component, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { EventManagerService } from "src/app/shared/services/event-manager.service";
import { Movement } from "src/app/core/common/movement.model";
import { CourtService } from "src/app/core/court/court.service";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { Direction } from "src/app/shared/constants/direction.constants";
import { ToastService } from "src/app/shared/services/toast.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PreviewModalComponent } from "src/app/preview/preview-modal/preview-modal.component";
import { LoginModalComponent } from "src/app/preview/login-modal/login-modal.component";
import { LoginService } from "src/app/core/login/login.service";
import { PreviewModalService } from "src/app/core/preview/preview-modal.service";
import { TokenService } from "src/app/core/login/token.service";
import { ClaimDetailsService } from "src/app/core/claim-details/claim-details.service";
import { Claim } from "src/app/core/preview/claim.model";

@Component({
  selector: "app-court",
  templateUrl: "./court.component.html",
  styleUrls: ["./court.component.scss"],
})
export class CourtComponent implements OnInit {
  selectedCountry: string;
  pdfFileId: number;
  jsonFileId: number;
  showSpinner = false;

  constructor(
    public courtService: CourtService,
    private eventManager: EventManagerService,
    public navbarService: NavbarService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private previewModalService: PreviewModalService,
    private tokenService: TokenService,
    private claimDetailsService: ClaimDetailsService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.courtService.europeanCountries =
        event.translations.europeanCountries;
      this.setFindCourtCountry();
    });
    
    // this.courtService.editForm.patchValue({
    //   country: "IT",
    //   name: "County Court Business Centre",
    //   street: "St Katharine’s House",
    // });
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

      const element = document.getElementById("step8-menu");
      element.querySelector("a div.validation-icon").classList.add("validated");

      const previewModal = this.modalService.open(PreviewModalComponent, {
        size: "xl",
        backdrop: "static",
        centered: true,
      });

      //clone the content of the modal to be able to generate the PDF
      previewModal.shown.subscribe(() => {
        this.previewModalService.cloneAlreadyChanged = false;
        const preview = document.getElementById("preview");
        this.previewModalService.previewElementClone = preview.cloneNode(
          true
        ) as HTMLElement;
      });

      previewModal.result.then(
        () => {
          if (this.tokenService.getToken()) {
            this.showSpinner = true;
          }

          previewModal.hidden.subscribe(() => {
            if (!this.tokenService.getToken()) {
              this.openLoginModal();
            } else {
              this.uploadPdf();
            }
          });
        },
        () => {}
      );
    } else {
      this.courtService.markCourtFormAsDirty();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      this.toastService.showErrorToast();
      this.navbarService.addRemoveGreenTick("step8", false);
    }
  }

  openLoginModal() {
    const loginModal = this.modalService.open(LoginModalComponent, {
      size: "md",
      backdrop: "static",
      centered: true,
    });
    loginModal.result.then(
      () => {
        this.showSpinner = true;

        loginModal.hidden.subscribe(() => {
          this.uploadPdf();
        });
      },
      () => {}
    );
  }

  uploadPdf() {
    this.previewModalService.generatePdf(false).then((file) => {
      if (file) {
        this.courtService.uploadFile(file).subscribe(
          (response) => {
            this.pdfFileId = parseInt(response.data.id);
            this.uploadJson();
          },
          (error) => {
            this.showSpinner = false;
            console.error("Error while uploading the PDF file: ", error);
          }
        );
      } else {
        this.showSpinner = false;
        console.error("PDF file is null. Upload failed.");
      }
    });
  }

  uploadJson() {
    const jsonFile: File = this.navbarService.getJsonFile();
    if (jsonFile) {
      this.courtService.uploadFile(jsonFile).subscribe(
        (response) => {
          this.jsonFileId = parseInt(response.data.id);
          this.createClaim();
        },
        (error) => {
          this.showSpinner = false;
          console.error("Error while uploading the JSON file: ", error);
        }
      );
    } else {
      this.showSpinner = false;
      console.error("JSON file is null. Upload failed.");
    }
  }

  createClaim() {
    const description =
      this.claimDetailsService.editForm.get("detailsOfClaim").value;
    const claimant = this.tokenService.getClaimant();
    const defendant = "";
    const amount = "0";

    if (claimant) {
      const claim = new Claim(claimant, defendant, amount, description, [
        this.pdfFileId,
        this.jsonFileId,
      ]);
      const obj = { data: claim };
      this.courtService.createClaim(obj).subscribe(
        (response) => {
          this.showSpinner = false;
        },
        (error) => {
          this.showSpinner = false;
          console.error("Error while creating the claim: ", error);
        }
      );
    } else {
      this.showSpinner = false;
    }
  }
}
