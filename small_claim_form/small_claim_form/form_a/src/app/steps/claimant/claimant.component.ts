import { NavbarService } from '../../core/navbar/navbar.service';
import { ClaimantService } from '../../core/claimant/claimant.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import 'chosen-js';
import { LabelType } from '../../shared/constants/claimant.constants';
import { Direction } from 'src/app/shared/constants/direction.constants';
import { Movement } from 'src/app/core/common/movement.model';
import { EventManagerService } from 'src/app/shared/services/event-manager.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  TemporaryStorageFacet,
  TemporaryStorageService,
} from 'src/app/shared/services/temporary-storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-claimant',
  templateUrl: './claimant.component.html',
  styleUrls: ['./claimant.component.scss'],
})
export class ClaimantComponent implements OnInit {
  selectedOption: string;
  onStableSubscription: Subscription;
  temporaryStorage: TemporaryStorageFacet;

  constructor(
    public claimantService: ClaimantService,
    private eventManager: EventManagerService,
    private navbarService: NavbarService,
    private translateService: TranslateService,
    private zone: NgZone,
    private temporaryStorageService: TemporaryStorageService,
    private toastService: ToastService
  ) {
    this.temporaryStorage = temporaryStorageService.forKey('claimant');
  }

  ngOnInit(): void {
    this.claimantService.claimants = this.claimantService.editForm.get(
      'claimants'
    ) as FormArray;

    // this.claimantService.claimants.controls[0].patchValue({
    //   firstName: 'John',
    //   surname: 'Doe',
    //   street: '123 Main Street',
    //   postalCode: '12345',
    //   city: 'New York',
    //   country: 'IT',
    // });

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.claimantService.europeanCountries =
        event.translations.europeanCountries;
      this.claimantService.worldCountries = event.translations.worldCountries;
    });

    // this.claimantService.editForm.valueChanges.subscribe((value) => {
    //   this.temporaryStorage.set(value);
    // });
  }

  openModal(id: string) {
    document.body.style.overflow = 'hidden';
    document.getElementById(id).classList.add('active');
  }

  closeModal(id: string) {
    document.body.style.overflow = 'auto';
    document.getElementById(id).classList.remove('active');
  }

  addAnotherClaimant(index?: number) {
    this.claimantService.claimants = this.claimantService.editForm.get(
      'claimants'
    ) as FormArray;
    if (this.selectedOption === 'claimant') {
      //create a new claimant
      const formGroup = this.claimantService.createFormGroup('claimant');

      this.claimantService.claimants.push(formGroup);
    } else if (this.selectedOption === 'representative') {
      //create a new representative
      this.claimantService.claimants.push(
        this.claimantService.createFormGroup('representative')
      );
      this.claimantService.addRepresentative(
        this.claimantService.claimants.length - 1
      );
    }

    if (index !== undefined) {
      this.claimantService.claimants
        .at(index)
        .get('representative')
        .setValue((this.claimantService.claimants.length - 1).toString());
    }

    this.closeModal('js_modal_add_claimant');

    for (let i = 0; i < this.claimantService.claimants.length - 1; i++) {
      const element = document.getElementById('al_block_claimant' + i);
      if (element.classList.contains('open')) element.classList.remove('open');
    }

    this.onStableSubscription = this.zone.onStable.subscribe(() => {
      if (this.onStableSubscription) {
        this.onStableSubscription.unsubscribe();
      }
      window['processClaimantDefendantRepresentativeConcept'](
        'step1',
        'http://scanii.org/domain/claimant.personalIdNumber',
        true
      );

      if (this.selectedOption === 'claimant') {
        window['processClaimantDefendantRepresentativeConcept'](
          'step1',
          'http://scanii.org/domain/claimant.otherDetails',
          true
        );
      }

      this.selectedOption = undefined;
    });
  }

  private addRequiredValidator(formControl: any) {
    formControl.addValidators(this.claimantService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  private removeRequiredValidator(formControl: any) {
    formControl.removeValidators(this.claimantService.requiredValidator);
    formControl.updateValueAndValidity();
  }

  removeClaimant(index: number) {
    this.claimantService.claimants = this.claimantService.editForm.get(
      'claimants'
    ) as FormArray;

    if (
      this.claimantService.claimants.at(index).get('isRepresentative').value
    ) {
      this.claimantService.removeRepresentative(index);
    }

    for (const representative of this.claimantService.representatives) {
      if (representative.id > index) representative.id--;
    }

    this.claimantService.claimants.removeAt(index);
  }

  toggleClaimantVisibility(index: number) {
    const element = document.getElementById('al_block_claimant' + index);
    if (!element.classList.contains('open')) element.classList.add('open');
    else element.classList.remove('open');
  }

  expandWorldCountrySelect(value: string, index: number, isClaimant: boolean) {
    const id = isClaimant
      ? 'claimantWorldCountrySelect' + index
      : 'claimantRepresentativeWorldCountrySelect' + index;

    const element = document.getElementById(id).firstElementChild;
    const formControl = this.claimantService.claimants
      .at(index)
      .get('countryOther');

    if (value === 'other') {
      if (element.classList.contains('df_collapsed')) {
        element.classList.remove('df_collapsed');
        this.initWorldCountrySelect(index, isClaimant);
        this.addRequiredValidator(formControl);
        this.claimantService.isWorldCountrySelectVisible = true;
      }
    } else {
      if (!element.classList.contains('df_collapsed')) {
        element.classList.add('df_collapsed');
        this.resetWorldCountrySelect(index, isClaimant);
        this.removeRequiredValidator(formControl);
        this.claimantService.isWorldCountrySelectVisible = false;
      }
      if (value === 'GB') this.openModal('js_modal_form_disclaimer_claimant');
    }
  }

  initWorldCountrySelect(index: number, isClaimant: boolean) {
    const clazz = isClaimant
      ? '.dynformSCA2ClaimantCountryOther' + index
      : '.dynformSCA2ClaimantRepresentativeCountryOther' + index;
    var $select = $(clazz);

    if (!$select.hasClass('chosen-container')) {
      $select.chosen({
        width: '100%',
        inherit_select_classes: true,
        search_contains: true,
        display_disabled_options: false,
      });
      $select.chosen().change((event: any, data: any) => {
        this.claimantService.claimants
          .at(index)
          .get('countryOther')
          .setValue(data.selected);
      });
    }
  }

  resetWorldCountrySelect(index: number, isClaimant: boolean) {
    const clazz = isClaimant
      ? '.dynformSCA2ClaimantCountryOther' + index
      : '.dynformSCA2ClaimantRepresentativeCountryOther' + index;
    var $select = $(clazz);

    $select.val('').trigger('chosen:updated');

    this.claimantService.claimants.at(index).get('countryOther').setValue('');
  }

  markOrganisationSurnameFirstNameAsDirty(index: number) {
    const formGroup = this.claimantService.claimants.at(index);
    if (!formGroup.get('organisation').dirty)
      formGroup.get('organisation').markAsDirty();
    if (!formGroup.get('surname').dirty) formGroup.get('surname').markAsDirty();
    if (!formGroup.get('firstName').dirty)
      formGroup.get('firstName').markAsDirty();
  }

  onRepresentativeChange(value: string, index: number) {
    if (value === 'dynform_add_new_representative') {
      this.selectedOption = 'representative';
      this.addAnotherClaimant(index);
    }
  }

  onRepresentativeOrganisationChange(event: any, index: number) {
    const value = event.target.value;
    const representative = this.claimantService.representatives.find(
      (r) => r.id === index
    );
    representative.organisation = value;
    if (!this.claimantService.claimants.at(index).get('organisation').invalid) {
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
    const representative = this.claimantService.representatives.find(
      (r) => r.id === index
    );
    representative[field] = value;
    if (
      !this.claimantService.claimants.at(index).get('firstName').invalid &&
      !this.claimantService.claimants.at(index).get('surname').invalid
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

  onChangeRepresentativeAddress(event: any, index: number) {
    const value = event.target.value;
    const representative = this.claimantService.representatives.find(
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
    if (!this.claimantService.editForm.invalid) {
      this.navbarService.previousStepId = this.navbarService.currentStepId;
      this.navbarService.currentStepId = destinationStepId;
      if (value === 'next') {
        const movement = new Movement('step2', Direction.NEXT);
        this.eventManager.broadcast({
          name: 'changeStep',
          content: movement,
        });
      }
    } else {
      this.claimantService.markAsDirty();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
      this.toastService.showErrorToast();
    }
  }
}
