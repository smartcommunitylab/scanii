import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { JhiEventManager } from 'ng-jhipster';
import { Movement } from 'src/app/core/common/movement.model';
import { CourtService } from 'src/app/core/court/court.service';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { Direction } from 'src/app/shared/constants/direction.constants';

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
    private translateService: TranslateService
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
    } else {
      this.courtService.markCourtFormAsDirty();
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
  }
}
