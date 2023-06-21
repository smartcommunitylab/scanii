import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import 'chosen-js';
import { LabelType } from '../../shared/constants/defendant.constants';
import { Movement } from 'src/app/core/common/movement.model';
import { Direction } from 'src/app/shared/constants/direction.constants';
import { EventManagerService } from 'src/app/shared/services/event-manager.service';
import { DefendantService } from 'src/app/core/defendant/defendant.service';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-defendant',
  templateUrl: './defendant.component.html',
  styleUrls: ['./defendant.component.scss'],
})
export class DefendantComponent implements OnInit {
  selectedOption: string;
  europeanCountries: { value: string; label: string }[] = [];
  worldCountries: { value: string; label: string }[] = [];
  onStableSubscription: Subscription;

  constructor(
    public defendantService: DefendantService,
    private eventManager: EventManagerService,
    private navbarService: NavbarService,
    private translateService: TranslateService,
    private zone: NgZone,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.defendantService.defendants = this.defendantService.editForm.get(
      'defendants'
    ) as FormArray;

    // this.defendantService.defendants.controls[0].patchValue({
    //   firstName: 'John',
    //   surname: 'Doe',
    //   street: '123 Main Street',
    //   postalCode: '12345',
    //   city: 'New York',
    //   country: 'IT',
    // });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.europeanCountries = event.translations.europeanCountries;
      this.worldCountries = event.translations.worldCountries;
    });
  }

  openModal(id: string) {
    document.body.style.overflow = 'hidden';
    document.getElementById(id).classList.add('active');
  }

  closeModal(id: string) {
    document.body.style.overflow = 'auto';
    document.getElementById(id).classList.remove('active');
  }

  addAnotherDefendant(index?: number) {
    this.defendantService.defendants = this.defendantService.editForm.get(
      'defendants'
    ) as FormArray;
    if (this.selectedOption === 'defendant') {
      //create a new claimant
      const formGroup = this.defendantService.createFormGroup('defendant');

      this.defendantService.defendants.push(formGroup);
    } else if (this.selectedOption === 'representative') {
      //create a new representative
      this.defendantService.defendants.push(
        this.defendantService.createFormGroup('representative')
      );
      this.defendantService.addRepresentative(
        this.defendantService.defendants.length - 1
      );
    }

    if (index !== undefined) {
      this.defendantService.defendants
        .at(index)
        .get('representative')
        .setValue((this.defendantService.defendants.length - 1).toString());
    }

    this.closeModal('js_modal_add_defendant');

    for (let i = 0; i < this.defendantService.defendants.length - 1; i++) {
      const element = document.getElementById('al_block_defendant' + i);
      if (element.classList.contains('open')) element.classList.remove('open');
    }

    this.onStableSubscription = this.zone.onStable.subscribe(() => {
      if (this.onStableSubscription) {
        this.onStableSubscription.unsubscribe();
      }
      window['processClaimantDefendantRepresentativeConcept'](
        'step2',
        'http://scanii.org/domain/defendant.personalIdNumber',
        true
      );

      if (this.selectedOption === 'defendant') {
        window['processClaimantDefendantRepresentativeConcept'](
          'step2',
          'http://scanii.org/domain/defendant.otherDetails',
          true
        );
      }

      this.selectedOption = undefined;
    });
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.defendantService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.defendantService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  removeDefendant(index: number) {
    this.defendantService.defendants = this.defendantService.editForm.get(
      'defendants'
    ) as FormArray;

    if (
      this.defendantService.defendants.at(index).get('isRepresentative').value
    ) {
      this.defendantService.removeRepresentative(index);
    }

    for (const representative of this.defendantService.representatives) {
      if (representative.id > index) representative.id--;
    }

    this.defendantService.defendants.removeAt(index);
  }

  toggleDefendantVisibility(index: number) {
    const element = document.getElementById('al_block_defendant' + index);
    if (!element.classList.contains('open')) element.classList.add('open');
    else element.classList.remove('open');
  }

  expandWorldCountrySelect(value: string, index: number, isDefendant: boolean) {
    const id = isDefendant
      ? 'defendantWorldCountrySelect' + index
      : 'defendantRepresentativeWorldCountrySelect' + index;

    const element = document.getElementById(id).firstElementChild;
    const formControl = this.defendantService.defendants
      .at(index)
      .get('countryOther');

    if (value === 'other') {
      if (element.classList.contains('df_collapsed')) {
        element.classList.remove('df_collapsed');
        this.initWorldCountrySelect(index, isDefendant);
        this.addRequiredValidator(formControl);
        this.defendantService.isWorldCountrySelectVisible = true;
      }
    } else {
      if (!element.classList.contains('df_collapsed')) {
        element.classList.add('df_collapsed');
        this.resetWorldCountrySelect(index, isDefendant);
        this.removeRequiredValidator(formControl);
        this.defendantService.isWorldCountrySelectVisible = false;
      }
      if (value === 'GB') this.openModal('js_modal_form_disclaimer_defendant');
    }
  }

  initWorldCountrySelect(index: number, isDefendant: boolean) {
    const clazz = isDefendant
      ? '.dynformSCA2DefendantCountryOther' + index
      : '.dynformSCA2DefendantRepresentativeCountryOther' + index;
    var $select = $(clazz);

    if (!$select.hasClass('chosen-container')) {
      $select.chosen({
        width: '100%',
        inherit_select_classes: true,
        search_contains: true,
        display_disabled_options: false,
      });
      $select.chosen().change((event: any, data: any) => {
        this.defendantService.defendants
          .at(index)
          .get('countryOther')
          .setValue(data.selected);
      });
    }
  }

  resetWorldCountrySelect(index: number, isDefendant: boolean) {
    const clazz = isDefendant
      ? '.dynformSCA2DefendantCountryOther' + index
      : '.dynformSCA2DefendantRepresentativeCountryOther' + index;
    var $select = $(clazz);

    $select.val('').trigger('chosen:updated');

    this.defendantService.defendants.at(index).get('countryOther').setValue('');
  }

  markOrganisationSurnameFirstNameAsDirty(index: number) {
    const formGroup = this.defendantService.defendants.at(index);
    if (!formGroup.get('organisation').dirty)
      formGroup.get('organisation').markAsDirty();
    if (!formGroup.get('surname').dirty) formGroup.get('surname').markAsDirty();
    if (!formGroup.get('firstName').dirty)
      formGroup.get('firstName').markAsDirty();
  }

  onRepresentativeChange(value: string, index: number) {
    if (value === 'dynform_add_new_representative') {
      this.selectedOption = 'representative';
      this.addAnotherDefendant(index);
    }
  }

  onRepresentativeOrganisationChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.defendantService.representatives.find(
      (r) => r.id === index
    );
    representative.organisation = value;
    if (
      !this.defendantService.defendants.at(index).get('organisation').invalid
    ) {
      if (representative.organisation === '') {
        if (representative.firstName !== '' && representative.surname !== '') {
          const fullName =
            representative.firstName + ' ' + representative.surname;
          representative.label =
            representative.address !== ''
              ? fullName + ' (' + representative.address + ')'
              : fullName;
          representative.labelType = LabelType.FULL_NAME;
        } else {
          representative.label = representative.default;
          representative.labelType = LabelType.DEFAULT;
        }
      } else {
        representative.label =
          representative.address !== ''
            ? representative.organisation + ' (' + representative.address + ')'
            : representative.organisation;
        representative.labelType = LabelType.ORGANISATION;
      }
    }
  }

  onRepresentativeSurnameFirstNameChange(
    event: any,
    index: number,
    field: string
  ) {
    const value = event.target.value;
    const representative = this.defendantService.representatives.find(
      (r) => r.id === index
    );
    representative[field] = value;
    if (
      !this.defendantService.defendants.at(index).get('firstName').invalid &&
      !this.defendantService.defendants.at(index).get('surname').invalid
    ) {
      if (representative.firstName !== '' && representative.surname !== '') {
        const fullName =
          representative.firstName + ' ' + representative.surname;
        representative.label =
          representative.address !== ''
            ? fullName + ' (' + representative.address + ')'
            : fullName;
        representative.labelType = LabelType.FULL_NAME;
      } else {
        if (representative.organisation !== '') {
          representative.label =
            representative.address !== ''
              ? representative.organisation +
                ' (' +
                representative.address +
                ')'
              : representative.organisation;
          representative.labelType = LabelType.ORGANISATION;
        } else {
          representative.label = representative.default;
          representative.labelType = LabelType.DEFAULT;
        }
      }
    }
  }

  onRepresentativeAddressChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.defendantService.representatives.find(
      (r) => r.id === index
    );
    representative.address = value;

    if (representative.label.includes(' (')) {
      representative.label = representative.label.split(' (')[0];
    }
    if (representative.address !== '') {
      representative.label =
        representative.label + ' (' + representative.address + ')';
    }
  }

  changeStep(value: string, destinationStepId: string) {
    if (value === 'next') {
      if (!this.defendantService.editForm.invalid) {
        this.navbarService.previousStepId = this.navbarService.currentStepId;
        this.navbarService.currentStepId = destinationStepId;
        const movement = new Movement('step3', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      } else {
        this.defendantService.markAsDirty();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
        this.toastService.showErrorToast();
      }
    } else if (value === 'back') {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      const movement = new Movement('step1', Direction.BACK);
      this.eventManager.broadcast({
        name: 'changeStep',
        content: movement,
      });
    }
  }
}
