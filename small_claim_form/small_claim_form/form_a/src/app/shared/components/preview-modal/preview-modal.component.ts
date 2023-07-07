import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import jsPDF from "jspdf";
import { ClaimForMoney } from "src/app/core/claim/claim-for-money.model";
import { ClaimService } from "src/app/core/claim/claim.service";
import { ClaimingInterestOnCost } from "src/app/core/claim/claiming-interest-on-cost.model";
import { ClaimingInterest } from "src/app/core/claim/claiming-interest.model";
import { OtherClaim } from "src/app/core/claim/other-claim.model";
import { Claimant } from "src/app/core/claimant/claimant.model";
import { ClaimantService } from "src/app/core/claimant/claimant.service";
import { Citizen } from "src/app/core/common/citizen.model";
import { IntermediateForm } from "src/app/core/common/intermediate-form.model";
import { Organisation } from "src/app/core/common/organisation.model";
import { RepresentativeCitizen } from "src/app/core/common/representative-citizen.model";
import { RepresentativeOrganisation } from "src/app/core/common/representative-organisation.model";
import { Representative } from "src/app/core/common/representative.model";
import { Court } from "src/app/core/court/court.model";
import { CourtService } from "src/app/core/court/court.service";
import { Defendant } from "src/app/core/defendant/defendant.model";
import { DefendantService } from "src/app/core/defendant/defendant.service";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { CrossborderNature } from "src/app/core/step-four/crossborder-nature.model";
import { StepFourService } from "src/app/core/step-four/step-four.service";
import { Certificate } from "src/app/core/step-seven/certificate.model";
import { StepSevenService } from "src/app/core/step-seven/step-seven.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-preview-modal",
  templateUrl: "./preview-modal.component.html",
  styleUrls: ["./preview-modal.component.scss"],
})
export class PreviewModalComponent implements OnInit {
  pdf: jsPDF;
  intermediateForm: IntermediateForm;
  claimants: (Claimant | Representative)[] = [];
  defendants: (Defendant | Representative)[] = [];
  crossBorderNature: CrossborderNature;
  claimForMoney: ClaimForMoney;
  otherClaim: OtherClaim;
  claimingInterest: ClaimingInterest;
  claimingInterestOnCost: ClaimingInterestOnCost;
  certificate: Certificate;
  court: Court;
  showSpinner = false;
  subscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    public navbarService: NavbarService,
    private claimantService: ClaimantService,
    private defendantService: DefendantService,
    private stepFourService: StepFourService,
    private claimService: ClaimService,
    private stepSevenService: StepSevenService,
    private courtService: CourtService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.pdf = new jsPDF("p", "pt", "a4");
    this.intermediateForm = this.navbarService.getIntermediateForm();
    this.claimants = this.claimantService.getClaimants();
    this.defendants = this.defendantService.getDefendants();
    this.crossBorderNature = this.stepFourService.getCrossborderNature();
    this.claimForMoney = this.claimService.getClaimForMoney();
    this.otherClaim = this.claimService.getOtherClaim();
    this.claimingInterest = this.claimService.getClaimingInterest();
    this.claimingInterestOnCost = this.claimService.getClaimingInterestOnCost();
    this.certificate = this.stepSevenService.getCertificate();
    this.court = this.courtService.getCourt();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  isClaimant(obj: Claimant | Representative): boolean {
    return obj instanceof Claimant;
  }

  isDefendant(obj: Defendant | Representative): boolean {
    return obj instanceof Defendant;
  }

  isCitizen(obj: Citizen | Organisation): boolean {
    return obj instanceof Citizen;
  }

  isRepresentativeCitizen(
    obj: RepresentativeCitizen | RepresentativeOrganisation
  ): boolean {
    return obj instanceof RepresentativeCitizen;
  }

  downloadPdf(): void {
    this.showSpinner = true;

    const content = document.getElementById("content");
    //const margin = 5;

    setTimeout(() => {
      this.pdf.html(content, {
        callback: (pdf) => {
          pdf.save(this.getFileName());
          this.showSpinner = false;
        },
        width: this.pdf.internal.pageSize.getWidth(),
        windowWidth: 950,
        autoPaging: "text",
        fontFaces: [
          {
            family: "FontAwesome",
            weight: "bold",
            src: [
              {
                url: "assets/fonts/liberation/LiberationSans-Bold.ttf",
                format: "truetype",
              },
            ],
          },
          {
            family: "FontAwesome",
            weight: "normal",
            src: [
              {
                url: "assets/fonts/liberation/LiberationSans-Regular.ttf",
                format: "truetype",
              },
            ],
          },
        ],
        //margin: [margin, 0, margin, 0],
      });
    }, 100);
  }

  private getFileName(): string {
    return `SC_A_${this.formatDate(
      new Date()
    )}_${this.translateService.currentLang.toUpperCase()}`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}${month}${year}`;
  }
}
