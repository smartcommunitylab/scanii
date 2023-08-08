import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ClaimForMoney } from "src/app/core/claim/claim-for-money.model";
import { ClaimService } from "src/app/core/claim/claim.service";
import { ClaimingInterestOnCost } from "src/app/core/claim/claiming-interest-on-cost.model";
import { ClaimingInterest } from "src/app/core/claim/claiming-interest.model";
import { OtherClaim } from "src/app/core/claim/other-claim.model";
import { Claimant } from "src/app/core/claimant/claimant.model";
import { ClaimantService } from "src/app/core/claimant/claimant.service";
import { Citizen } from "src/app/core/common/citizen.model";
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
import { FormA } from "src/app/core/common/form-A.model";
import { PreviewModalService } from "src/app/core/preview/preview-modal.service";

@Component({
  selector: "app-preview-modal",
  templateUrl: "./preview-modal.component.html",
  styleUrls: ["./preview-modal.component.scss"],
})
export class PreviewModalComponent implements OnInit {
  formA: FormA;
  claimants: (Claimant | Representative)[] = [];
  defendants: (Defendant | Representative)[] = [];
  crossBorderNature: CrossborderNature;
  claimForMoney: ClaimForMoney;
  otherClaim: OtherClaim;
  claimingInterest: ClaimingInterest;
  claimingInterestOnCost: ClaimingInterestOnCost;
  certificate: Certificate;
  court: Court;

  constructor(
    private activeModal: NgbActiveModal,
    public navbarService: NavbarService,
    private claimantService: ClaimantService,
    private defendantService: DefendantService,
    private stepFourService: StepFourService,
    private claimService: ClaimService,
    private stepSevenService: StepSevenService,
    private courtService: CourtService,
    public previewModalService: PreviewModalService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.formA = this.navbarService.getFormA();
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

  cancel(): void {
    this.activeModal.dismiss();
  }

  submit(): void {
    this.activeModal.close();
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
}
