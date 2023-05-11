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
import { CourtService } from 'src/app/core/court/court.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  triggerTabList: any;
  changeStepSubscription: Subscription;
  file?: File;

  constructor(
    private eventManager: JhiEventManager,
    public navbarService: NavbarService,
    private claimantService: ClaimantService,
    private defendantService: DefendantService,
    private jurisdictionService: JurisdictionService,
    private stepFourService: StepFourService,
    private claimService: ClaimService,
    private claimDetailsService: ClaimDetailsService,
    private stepSevenService: StepSevenService,
    private courtService: CourtService,
  ) {}

  ngOnInit(): void {
    this.changeStepSubscription = this.eventManager.subscribe(
      'changeStep',
      (event: any) => this.manageNavigation(event)
    );

    this.triggerTabList = [].slice.call(
      document.querySelectorAll('#step-menu a')
    );

    this.triggerTabList.forEach((triggerEl: any) => {
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

            Promise.all(promises).then((array: PromiseContent[]) => {
              if (array.every((item: PromiseContent) => item.isValid)) {
                this.navbarService.previousStepId =
                  this.navbarService.currentStepId;
                this.navbarService.currentStepId = stepId;

                this.setActive(element);

                tabTrigger.show();

                window['showPdf'](currentStepNumber);

                this.addRemoveValidatedClass(array);
              } else {
                const invalidStep = array.find(
                  (item: PromiseContent) => !item.isValid
                );

                this.navigateForward(
                  this.navbarService.currentStepId,
                  invalidStep.stepId
                );

                this.navbarService.previousStepId =
                  this.navbarService.currentStepId;
                this.navbarService.currentStepId = invalidStep.stepId;

                const invalidStepNumber = this.getStepNumber(
                  invalidStep.stepId
                );
                window['showPdf'](invalidStepNumber);

                const invalidStepIndex = array.findIndex(
                  (item: PromiseContent) => item.stepId === invalidStep.stepId
                );
                this.addRemoveValidatedClass(array.slice(0, invalidStepIndex));
              }
            });
          } else {
            const promises = [];

            for (let i = currentStepNumber; i <= previousStepNumber; i++) {
              const stepId = 'step' + i;
              promises.push(this.navbarService.isStepValid(stepId));
            }

            Promise.all(promises).then((array: PromiseContent[]) => {
              this.addRemoveValidatedClass(array);

              this.navbarService.previousStepId =
                this.navbarService.currentStepId;
              this.navbarService.currentStepId = stepId;

              this.setActive(element);
              tabTrigger.show();

              window['showPdf'](currentStepNumber);
            });
          }
        }
      });
    });
  }

  addRemoveValidatedClass(array: PromiseContent[]) {
    array.forEach((item: PromiseContent) => {
      const element = document.getElementById(item.stepId + '-menu');
      if (item.isValid) {
        element
          .querySelector('a div.validation-icon')
          .classList.add('validated');
      } else {
        element
          .querySelector('a div.validation-icon')
          .classList.remove('validated');
      }
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

    if (movement.direction === 'NEXT') {
      const id =
        'step' + (this.getStepNumber(movement.destinationStepId) - 1) + '-menu';
      const element = document.getElementById(id);
      element.querySelector('a div.validation-icon').classList.add('validated');
    } else {
      const id = 'step' + (this.getStepNumber(movement.destinationStepId) + 1);

      const element = document.getElementById(id + '-menu');

      this.navbarService.isStepValid(id).then((response: PromiseContent) => {
        if (response.isValid) {
          element
            .querySelector('a div.validation-icon')
            .classList.add('validated');
        } else {
          element
            .querySelector('a div.validation-icon')
            .classList.remove('validated');
        }
      });
    }
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
      .then(() => {
        return this.courtService.setCourtForm(data.court);
      })
      .then(() => {
        this.moveToFirstStep();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  private moveToFirstStep() {
    const element = this.triggerTabList[0];
    const event = new Event('click');
    element.dispatchEvent(event);
  }
}
