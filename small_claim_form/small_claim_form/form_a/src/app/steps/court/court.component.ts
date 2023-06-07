import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { JhiEventManager } from 'ng-jhipster';
import { Movement } from 'src/app/core/common/movement.model';
import { CourtService } from 'src/app/core/court/court.service';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { Direction } from 'src/app/shared/constants/direction.constants';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss'],
})
export class CourtComponent implements OnInit {
  europeanCountries: { value: string; label: string }[] = [];
  selectedCountry: string;

  constructor(
    public courtService: CourtService,
    private eventManager: JhiEventManager,
    public navbarService: NavbarService,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.europeanCountries = event.translations.europeanCountries;
      this.setFindCourtCountry();
    });
  }

  toggleFindCourt() {
    document.getElementById('find_court').classList.toggle('open');
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === 'back') {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement('step7', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
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
        behavior: 'auto',
      });
      this.toastService.showErrorToast();
    }
  }

  setFindCourtCountry() {
    const country = this.europeanCountries.find(
      (country) =>
        country.value === this.courtService.editForm.get('country').value
    );
    if (country) {
      this.selectedCountry = country.label;
    }
    if (this.courtService.editForm.get('country').value === 'GB')
      this.openModal('js_modal_form_disclaimer_court');
  }

  openModal(id: string) {
    document.body.style.overflow = 'hidden';
    document.getElementById(id).classList.add('active');
  }

  closeModal(id: string) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}
