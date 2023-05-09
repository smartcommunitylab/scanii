import { DateAndSignature } from './../../core/step-seven/date-and-signature.model';
import { FinalForm } from './../../core/common/final-form.model';
import { NavbarService } from '../../core/navbar/navbar.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as enquire from 'enquire.js';
import * as $ from 'jquery';
import 'jquery-sticky';
import { Movement } from 'src/app/core/common/movement.model';
import { PromiseContent } from 'src/app/core/common/promise-content.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { ClaimantService } from 'src/app/core/claimant/claimant.service';
import { DefendantService } from 'src/app/core/defendant/defendant.service';
import { JurisdictionService } from 'src/app/core/jurisdiction/jurisdiction.service';
import { ClaimService } from 'src/app/core/claim/claim.service';
import { ClaimDetailsService } from 'src/app/core/claim-details/claim-details.service';
import { StepSevenService } from 'src/app/core/step-seven/step-seven.service';
import { StepFourService } from 'src/app/core/step-four/step-four.service';
import { IntermediateForm } from 'src/app/core/common/intermediate-form.model';
import exportFromJSON from 'export-from-json';
import { Form } from 'src/app/core/common/form.model';
import { CourtService } from 'src/app/core/court/court.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  changeStepSubscription: Subscription;
  file?: File;

  constructor(
    private eventManager: JhiEventManager,
    private navbarService: NavbarService,
    private claimantService: ClaimantService,
    private defendantService: DefendantService,
    private jurisdictionService: JurisdictionService,
    private stepFourService: StepFourService,
    private claimService: ClaimService,
    private claimDetailsService: ClaimDetailsService,
    private stepSevenService: StepSevenService,
    private courtService: CourtService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.changeStepSubscription = this.eventManager.subscribe(
      'changeStep',
      (event: any) => this.manageNavigation(event)
    );

    var triggerTabList = [].slice.call(
      document.querySelectorAll('#step-menu a')
    );

    triggerTabList.forEach((triggerEl: any) => {
      var tabTrigger = new bootstrap.Tab(triggerEl);
      triggerEl.addEventListener('click', (event: any) => {
        event.preventDefault();

        let element = event.target;

        while (element.tagName !== 'LI') {
          element = element.parentElement;
        }

        const stepId = element.id.split('-')[0];

        if (stepId !== this.navbarService.currentStepId) {
          const previousStepNumber = this.getStepNumber(
            this.navbarService.currentStepId
          );
          const currentStepNumber = this.getStepNumber(stepId);
          if (currentStepNumber > previousStepNumber) {
            const promises = [];
            for (let i = previousStepNumber; i < currentStepNumber; i++) {
              const stepId = 'step' + i;
              promises.push(this.navbarService.isStepValid(stepId));
            }
            Promise.all(promises).then((arry: PromiseContent[]) => {
              if (arry.every((item: PromiseContent) => item.isValid)) {
                this.navbarService.previousStepId =
                  this.navbarService.currentStepId;
                this.navbarService.currentStepId = stepId;
                this.setActive(element);
                tabTrigger.show();
              } else {
                const invalidStep = arry.find(
                  (item: PromiseContent) => !item.isValid
                );
                this.navigateForward(
                  this.navbarService.currentStepId,
                  invalidStep.stepId
                );
                this.navbarService.previousStepId =
                  this.navbarService.currentStepId;
                this.navbarService.currentStepId = invalidStep.stepId;
              }
            });
          } else {
            this.navbarService.previousStepId =
              this.navbarService.currentStepId;
            this.navbarService.currentStepId = stepId;
            this.setActive(element);
            tabTrigger.show();
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.changeStepSubscription) {
      this.eventManager.destroy(this.changeStepSubscription);
    }
  }

  ngAfterViewInit(): void {
    var $stickyStuff = $('.sticky-sidebar');
    var $stickySidebar = $('.sticky-sidebar');

    if ($stickyStuff.length) {
      enquire.register('(min-width:48rem)', {
        match: function () {
          $stickyStuff.sticky({
            topSpacing: 182.78,
            bottomSpacing: $('footer').height() + 25,
          });
        },
        unmatch: function () {
          $stickyStuff.unstick();
        },
      });
    }

    var $stickyTop = 0;
    var $SBisSticky = false;

    if ($stickySidebar.length) {
      $stickySidebar = $('.sidebar');

      enquire.register('(max-width:48rem)', {
        match: function () {
          $(window).on('scroll', function (e) {
            var scrollPos = $(window).scrollTop();
            var sidebartop = $stickySidebar.offset().top - 147.28;
            var bottomSpacing = $('footer').height() + 25;
            var scrollBottom =
              $(document).height() - $(window).height() - $(window).scrollTop();

            if (scrollPos > sidebartop && !$SBisSticky) {
              $SBisSticky = true;
              $stickyTop = sidebartop;
              $stickySidebar.addClass('sticks');
            } else if (scrollPos < $stickyTop && $SBisSticky) {
              $SBisSticky = false;
              $stickyTop = 0;
              $stickySidebar.removeClass('sticks');
            }
          });
        },
        unmatch: function () {
          $(window).off('scroll');
        },
      });
    }
  }
  setActive(element: any): void {
    const list = document.getElementById('step-menu').children;
    for (let i = 0; i < list.length; i++) {
      const child = list[i];
      if (child !== element) {
        child.classList.remove('active');
        child.classList.add('incomplete');
      } else {
        element.classList.remove('incomplete');
        element.classList.add('active');
      }
    }
  }

  manageNavigation(event: any): void {
    const movement = event.content as Movement;

    const destinationMenu = document.getElementById(
      movement.destinationStepId + '-menu'
    );
    const sourceMenu =
      movement.direction === 'NEXT'
        ? destinationMenu.previousElementSibling
        : destinationMenu.nextElementSibling;
    const destinationTab = document.getElementById(movement.destinationStepId);
    const sourceTab =
      movement.direction === 'NEXT'
        ? destinationTab.previousElementSibling
        : destinationTab.nextElementSibling;

    sourceMenu.classList.remove('active');
    sourceMenu.classList.add('incomplete');
    sourceMenu.firstElementChild.classList.remove('active');
    sourceMenu.firstElementChild.setAttribute('aria-selected', 'false');
    sourceTab.classList.remove('active');

    destinationMenu.classList.remove('incomplete');
    destinationMenu.classList.add('active');
    destinationMenu.firstElementChild.classList.add('active');
    destinationMenu.firstElementChild.setAttribute('aria-selected', 'true');
    destinationTab.classList.add('active');
  }

  navigateForward(sourceStepId: string, destinationStepId: string) {
    const destinationMenu = document.getElementById(
      destinationStepId + '-menu'
    );
    const sourceMenu = document.getElementById(sourceStepId + '-menu');
    const destinationTab = document.getElementById(destinationStepId);
    const sourceTab = document.getElementById(sourceStepId);

    sourceMenu.classList.remove('active');
    sourceMenu.classList.add('incomplete');
    sourceMenu.firstElementChild.classList.remove('active');
    sourceMenu.firstElementChild.setAttribute('aria-selected', 'false');
    sourceTab.classList.remove('active');

    destinationMenu.classList.remove('incomplete');
    destinationMenu.classList.add('active');
    destinationMenu.firstElementChild.classList.add('active');
    destinationMenu.firstElementChild.setAttribute('aria-selected', 'true');
    destinationTab.classList.add('active');
  }

  private getStepNumber(stepId: string): number {
    const element = document.getElementById(stepId + '-menu');
    return parseInt(element.getAttribute('data-step'));
  }

  generateJson(): void {
    const fileName = `${this.formatDate(new Date())}_${
      this.translateService.currentLang
    }`;

    exportFromJSON({
      data: { form_A: this.getIntermediateForm() },
      fileName,
      exportType: exportFromJSON.types.json,
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}${month}${year}`;
  }

  private getIntermediateForm(): IntermediateForm {
    const intermediateForm = new IntermediateForm();
    intermediateForm.claimants = this.claimantService.editForm.value.claimants;
    intermediateForm.defendants =
      this.defendantService.editForm.value.defendants;
    intermediateForm.jurisdiction = this.jurisdictionService.editForm.value;

    this.stepFourService.crossborderNatureForm.get('courtCountry').enable();
    this.stepFourService.crossborderNatureForm
      .get('courtCountryOther')
      .enable();

    intermediateForm.crossborderNature =
      this.stepFourService.crossborderNatureForm.value;

    this.stepFourService.crossborderNatureForm.get('courtCountry').disable();
    this.stepFourService.crossborderNatureForm
      .get('courtCountryOther')
      .disable();

    intermediateForm.bankDetails = this.getBankDetailsObj();
    intermediateForm.claim = this.claimService.editForm.value;
    intermediateForm.claimDetails = this.claimDetailsService.editForm.value;
    intermediateForm.oralHearing = this.stepSevenService.oralHearingForm.value;
    intermediateForm.documentAndCommunication =
      this.stepSevenService.documentAndCommunicationForm.value;
    intermediateForm.certificate = this.stepSevenService.certificateForm.value;
    intermediateForm.dateAndSignature =
      this.stepSevenService.dateAndSignatureForm.value;
    intermediateForm.court = this.courtService.editForm.value;
    return intermediateForm;
  }

  private getBankDetailsObj() {
    const bankDetailsObj = this.stepFourService.bankDetailsForm.value;
    if (this.stepFourService.bankTransferRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'bankTransfer';
    else if (this.stepFourService.creditCardRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'creditCard';
    else if (this.stepFourService.directDebitRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'directDebit';
    else if (this.stepFourService.otherRadioButton)
      bankDetailsObj.applicationFeePayment.paymentMethod = 'other';
    else bankDetailsObj.applicationFeePayment.paymentMethod = '';
    return bankDetailsObj;
  }

  openFileBrowser() {
    document.getElementById('loadDraft').click();
  }

  loadDraft(file: File): void {
    this.file = file[0];

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      const jsonData = JSON.parse(fileContent);
      this.setClaimForm(jsonData.form_A);
    };

    if (this.file) reader.readAsText(this.file);
  }

  private setClaimForm(data: IntermediateForm) {
    this.claimantService
      .setClaimantForm(data.claimants)
      .then(() => {
        return this.defendantService.setDefendantForm(data.defendants);
      })
      .then(() => {
        return this.jurisdictionService.setJurisdictionForm(data.jurisdiction);
      })
      .then(() => {
        return this.stepFourService.setStepFourForms(
          data.crossborderNature,
          data.bankDetails
        );
      })
      .then(() => {
        return this.claimService.setClaimForm(data.claim);
      })
      .then(() => {
        return this.claimDetailsService.setClaimDetailsForm(data.claimDetails);
      })
      .then(() => {
        return this.stepSevenService.setStepSevenForms(
          data.oralHearing,
          data.documentAndCommunication,
          data.certificate,
          data.dateAndSignature
        );
      })
      .catch((error) => {
        // Handle any errors here
      });
  }
}
