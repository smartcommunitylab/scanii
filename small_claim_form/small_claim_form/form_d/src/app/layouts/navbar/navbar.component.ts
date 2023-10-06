import { Component, HostListener } from "@angular/core";
import * as enquire from "enquire.js";
import * as $ from "jquery";
import "jquery-sticky";
import { Subscription } from "rxjs";
import { Movement } from "src/app/core/common/movement.model";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { StepOneService } from "src/app/core/step-one/step-one.service";
import { StepTwoService } from "src/app/core/step-two/step-two.service";
import { EventManagerService } from "src/app/shared/services/event-manager.service";
import { TranslateConfigService } from "src/app/shared/services/translate-config.service";
import * as bootstrap from "bootstrap";
import { PromiseContent } from "src/app/core/common/promise-content.model";
import { FormD } from "src/app/core/common/form-D.model";
import { ToastService } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  triggerTabList: any;
  changeStepSubscription: Subscription | undefined;
  file?: File;
  isScreenSizeMdOrGreater: boolean;

  constructor(
    private eventManager: EventManagerService,
    public navbarService: NavbarService,
    private stepOneService: StepOneService,
    private stepTwoService: StepTwoService,
    private translateConfigService: TranslateConfigService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isScreenSizeMdOrGreater = window.innerWidth >= 768;

    document.addEventListener("click", () => {
      const stickySidebar = document.querySelector(".sticky-sidebar");
      if (stickySidebar) {
        const steps = document.querySelectorAll(".sticky-wrapper div ul li a");

        steps.forEach((step) => {
          this.blurChildren(step);
        });
      }
    });

    document.addEventListener("drag", () => {
      const stickySidebar = document.querySelector(".sticky-sidebar");
      if (stickySidebar) {
        const steps = document.querySelectorAll(".sticky-wrapper div ul li a");

        steps.forEach((step) => {
          this.blurChildren(step);
        });
      }
    });

    this.changeStepSubscription = this.eventManager.subscribe(
      "changeStep",
      (event: any) => this.manageNavigation(event)
    );

    this.triggerTabList = [].slice.call(
      document.querySelectorAll("#step-menu a")
    );

    this.triggerTabList.forEach((triggerEl: any) => {
      var tabTrigger = new bootstrap.Tab(triggerEl);
      triggerEl.addEventListener("click", (event: any) => {
        event.preventDefault();

        let element = event.target;
        let a = event.target;

        while (element.tagName !== "LI") {
          element = element.parentElement;
        }

        while (a.tagName !== "A") {
          a = a.parentElement;
        }

        const stepId = element.id.split("-")[0];

        if (stepId !== this.navbarService.currentStepId) {
          const previousStepNumber = this.getStepNumber(
            this.navbarService.currentStepId
          );
          const currentStepNumber = this.getStepNumber(stepId);

          if (currentStepNumber > previousStepNumber) {
            const promises = [];

            for (let i = previousStepNumber; i < currentStepNumber; i++) {
              const stepId = "step" + i;
              promises.push(this.navbarService.isStepValid(stepId));
            }

            Promise.all(promises).then((array: any) => {
              if (array.every((item: PromiseContent) => item.isValid)) {
                this.navbarService.previousStepId =
                  this.navbarService.currentStepId;
                this.navbarService.currentStepId = stepId;

                this.toastService.hideErrorToast();
                this.setActive(element);
                tabTrigger.show();
                this.scrollToTop();
                a.setAttribute("tabindex", "-1");

                array.forEach((item: PromiseContent) => {
                  this.navbarService.addRemoveGreenTick(
                    item.stepId,
                    item.isValid
                  );
                });
              } else {
                this.toastService.showErrorToast();

                const invalidStep = array.find(
                  (item: PromiseContent) => !item.isValid
                );
                this.navigateForward(
                  this.navbarService.currentStepId,
                  invalidStep!.stepId
                );

                this.navbarService.previousStepId =
                  this.navbarService.currentStepId;
                this.navbarService.currentStepId = invalidStep!.stepId;

                this.scrollToTop();

                const invalidStepIndex = array.findIndex(
                  (item: PromiseContent) => item.stepId === invalidStep!.stepId
                );
                array
                  .slice(0, invalidStepIndex + 1)
                  .forEach((item: PromiseContent) => {
                    this.navbarService.addRemoveGreenTick(
                      item.stepId,
                      item.isValid
                    );
                  });
              }
            });
          } else {
            const promises = [];

            for (let i = currentStepNumber; i <= previousStepNumber; i++) {
              const stepId = "step" + i;
              promises.push(this.navbarService.isStepValid(stepId));
            }

            Promise.all(promises).then((array: any) => {
              array.forEach((item: PromiseContent) => {
                this.navbarService.addRemoveGreenTick(
                  item.stepId,
                  item.isValid
                );
              });

              this.navbarService.previousStepId =
                this.navbarService.currentStepId;
              this.navbarService.currentStepId = stepId;

              this.toastService.hideErrorToast();
              this.setActive(element);
              tabTrigger.show();
              this.scrollToTop();
              a.setAttribute("tabindex", "-1");
            });
          }
        }
      });
    });

    //this.setClaimant();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any): void {
    this.isScreenSizeMdOrGreater = window.innerWidth >= 768;
  }

  setClaimant() {
    // const temporaryStorage: TemporaryStorageFacet =
    //   this.temporaryStorageService.forKey("claimant");
    // temporaryStorage.get().then((data: any) => {
    //   if (data && data.claimants.length > 0) {
    //     this.claimantService.setClaimantForm(data.claimants, false);
    //   }
    // });
  }

  blurChildren(element: any) {
    element.blur();

    if (element.children.length > 0) {
      for (let i = 0; i < element.children.length; i++) {
        this.blurChildren(element.children[i]);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.changeStepSubscription) {
      this.eventManager.destroy(this.changeStepSubscription);
    }
  }

  ngAfterViewInit(): void {
    var $stickyStuff = $(".sticky-sidebar");
    var $stickySidebar = $(".sticky-sidebar");

    if ($stickyStuff.length) {
      enquire.register("(min-width:48rem)", {
        match: function () {
          $stickyStuff.sticky({
            topSpacing: 220,
            bottomSpacing: $("footer").height(),
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
      $stickySidebar = $(".sidebar");

      enquire.register("(max-width:47.999rem)", {
        match: function () {
          $(window).on("scroll", function (e) {
            var scrollPos = $(window).scrollTop();
            var sidebartop = $stickySidebar.offset().top;
            var bottomSpacing = $("footer").height() + 25;
            var scrollBottom =
              $(document).height() -
              $(window).height() -
              $(window).scrollTop();

            if (scrollPos > sidebartop && !$SBisSticky) {
              $SBisSticky = true;
              $stickyTop = sidebartop;
              $stickySidebar.addClass("sticks");
            } else if (scrollPos < $stickyTop && $SBisSticky) {
              $SBisSticky = false;
              $stickyTop = 0;
              $stickySidebar.removeClass("sticks");
            }
          });
        },
        unmatch: function () {
          $(window).off("scroll");
        },
      });
    }
  }
  setActive(element: any): void {
    const list = document.getElementById("step-menu")?.children;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        const child = list[i];
        if (child !== element) {
          child.classList.remove("active");
          child.classList.add("incomplete");
        } else {
          element.classList.remove("incomplete");
          element.classList.add("active");
        }
      }
    }
  }

  manageNavigation(event: any): void {
    this.toastService.hideErrorToast();

    const movement = event.content as Movement;

    const destinationMenu = document.getElementById(
      movement.destinationStepId + "-menu"
    );
    const sourceMenu =
      movement.direction === "NEXT"
        ? destinationMenu?.previousElementSibling
        : destinationMenu?.nextElementSibling;
    const destinationTab = document.getElementById(movement.destinationStepId);
    const sourceTab =
      movement.direction === "NEXT"
        ? destinationTab?.previousElementSibling
        : destinationTab?.nextElementSibling;

    sourceMenu?.classList.remove("active");
    sourceMenu?.classList.add("incomplete");
    sourceMenu?.firstElementChild?.classList.remove("active");
    sourceMenu?.firstElementChild?.setAttribute("aria-selected", "false");
    sourceTab?.classList.remove("active");

    destinationMenu?.classList.remove("incomplete");
    destinationMenu?.classList.add("active");
    destinationMenu?.firstElementChild?.classList.add("active");
    destinationMenu?.firstElementChild?.setAttribute("aria-selected", "true");
    destinationTab?.classList.add("active");

    this.scrollToTop();

    // add validation icon
    if (movement.direction === "NEXT") {
      const id =
        "step" + (this.getStepNumber(movement.destinationStepId) - 1) + "-menu";
      const element = document.getElementById(id);
      element
        ?.querySelector("a div.validation-icon")
        ?.classList.add("validated");
    } else {
      const id = "step" + (this.getStepNumber(movement.destinationStepId) + 1);

      const element = document.getElementById(id + "-menu");

      this.navbarService.isStepValid(id).then((response: PromiseContent) => {
        if (response.isValid) {
          element
            ?.querySelector("a div.validation-icon")
            ?.classList.add("validated");
        } else {
          element
            ?.querySelector("a div.validation-icon")
            ?.classList.remove("validated");
        }
      });
    }
  }

  navigateForward(sourceStepId: string, destinationStepId: string) {
    const destinationMenu = document.getElementById(
      destinationStepId + "-menu"
    );
    const sourceMenu = document.getElementById(sourceStepId + "-menu");
    const destinationTab = document.getElementById(destinationStepId);
    const sourceTab = document.getElementById(sourceStepId);

    sourceMenu?.classList.remove("active");
    sourceMenu?.classList.add("incomplete");
    sourceMenu?.firstElementChild?.classList.remove("active");
    sourceMenu?.firstElementChild?.setAttribute("aria-selected", "false");
    sourceTab?.classList.remove("active");

    destinationMenu?.classList.remove("incomplete");
    destinationMenu?.classList.add("active");
    destinationMenu?.firstElementChild?.classList.add("active");
    destinationMenu?.firstElementChild?.setAttribute("aria-selected", "true");
    destinationTab?.classList.add("active");
  }

  private getStepNumber(stepId: string): number {
    const element = document.getElementById(stepId + "-menu");
    return parseInt(element?.getAttribute("data-step"));
  }

  openFileBrowser() {
    document.getElementById("loadDraft").click();
  }

  loadDraft(event: any): void {
    const file = event.target.files;
    this.file = file[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      const jsonData = JSON.parse(fileContent);
      this.setFormD(jsonData.form_D);
    };
    if (this.file) reader.readAsText(this.file);
  }

  private setFormD(data: FormD) {
    this.stepOneService
      .setStepOneForm(data.stepOne)
      .then(() => {
        return this.stepTwoService.setStepTwoForm(data.stepTwo);
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
    const event = new Event("click");
    element.dispatchEvent(event);
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }
}
