import { TranslateService } from '@ngx-translate/core';
import { Injectable, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import { Claimant } from './claimant.model';
import { Organisation } from '../common/organisation.model';
import { Citizen } from '../common/citizen.model';
import { Address } from '../common/address.model';
import { Contacts } from '../common/contacts.model';
import {
  CountryIdGenerator,
  LabelType,
} from 'src/app/shared/constants/claimant.constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaimantService {
  requiredValidator = Validators.required;

  editForm = this.fb.group({
    claimants: this.fb.array([this.createFormGroup('claimant')]),
  });
  claimants: FormArray = new FormArray([]);
  isWorldCountrySelectVisible = false;
  representatives: {
    id: number;
    label: string;
    labelType: LabelType;
    default: string;
    organisation: string;
    firstName: string;
    surname: string;
    address: string;
  }[] = [];
  onStableSubscription: Subscription;
  representativeOptionLabel: string;

  constructor(
    private fb: FormBuilder,
    private zone: NgZone,
    private translateService: TranslateService
  ) {
    this.translateService
      .stream('claimant.representativeOption')
      .subscribe((res) => {
        this.representativeOptionLabel = res;
        if (this.representatives.length > 0) {
          for (const representative of this.representatives) {
            representative.default = representative.default.replace(
              /^[^ ]+/,
              this.representativeOptionLabel
            );
            if (representative.labelType === LabelType.DEFAULT) {
              representative.label = representative.default;
            }
          }
        }
      });
  }

  createFormGroup(value: string): FormGroup {
    if (value === 'claimant') {
      const formGroup = this.fb.group(
        {
          organisation: [''],
          surname: [''],
          firstName: [''],
          identificationCode: [''],
          street: ['', [Validators.required]],
          postalCode: ['', [Validators.required]],
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
          countryOther: [''],
          phoneNumber: [''],
          email: [''],
          representative: [''],
          otherDetails: [''],
          isRepresentative: [false],
        },
        { validator: this.validateOrganisationSurnameFirstName }
      );
      return formGroup;
    } else if (value === 'representative') {
      const formGroup = this.fb.group(
        {
          organisation: [''],
          surname: [''],
          firstName: [''],
          identificationCode: [''],
          street: ['', [Validators.required]],
          postalCode: ['', [Validators.required]],
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
          countryOther: [''],
          phoneNumber: [''],
          email: [''],
          isRepresentative: [true],
        },
        { validator: this.validateOrganisationSurnameFirstName }
      );
      return formGroup;
    }
  }

  validateOrganisationSurnameFirstName(
    formGroup: FormGroup
  ): { [key: string]: boolean } | null {
    const organisation = formGroup.get('organisation');
    const surname = formGroup.get('surname');
    const firstName = formGroup.get('firstName');

    const setFormControlValidity = (
      formGroup: FormGroup,
      formControlName: string,
      isValid: boolean
    ) => {
      if (isValid) {
        formGroup.get(formControlName).setErrors(null);
      } else {
        formGroup.get(formControlName).setErrors({ invalid: true });
      }
    };

    if (
      (organisation.value && !surname.value && !firstName.value) ||
      (!organisation.value && surname.value && firstName.value)
    ) {
      setFormControlValidity(formGroup, 'organisation', true);
      setFormControlValidity(formGroup, 'surname', true);
      setFormControlValidity(formGroup, 'firstName', true);
      return null;
    }

    setFormControlValidity(formGroup, 'organisation', false);
    setFormControlValidity(formGroup, 'surname', false);
    setFormControlValidity(formGroup, 'firstName', false);
    return { validateOrganisationSurnameFirstName: true };
  }

  isClaimantFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.get('claimants').invalid) {
        this.markAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step1', isValid));
    });
  }

  markAsDirty() {
    this.claimants.controls.forEach((formGroup: FormGroup) => {
      Object.keys(formGroup.controls).forEach((field) => {
        const formControl = formGroup.get(field);
        if (field === 'countryOther') {
          if (this.isWorldCountrySelectVisible) {
            formControl.markAsDirty({ onlySelf: true });
          }
        } else formControl.markAsDirty({ onlySelf: true });
      });
    });
  }

  addRepresentative(index: number) {
    const id = index;
    const label = this.getLabel(this.representatives.length + 1);
    this.representatives.push({
      id,
      label,
      labelType: LabelType.DEFAULT,
      default: label,
      organisation: '',
      firstName: '',
      surname: '',
      address: '',
    });
  }

  removeRepresentative(index: number) {
    const objIndex = this.representatives.findIndex((r) => r.id === index);
    this.representatives.splice(objIndex, 1);

    for (let i = objIndex; i < this.representatives.length; i++) {
      const number =
        parseInt(this.representatives[i].default.split(' ')[1]) - 1;
      this.representatives[i].default = this.getLabel(number);
      if (this.representatives[i].labelType === LabelType.DEFAULT) {
        this.representatives[i].label = this.representatives[i].default;
      }
    }

    for (let i = 0; i < this.claimants.length; i++) {
      if (!this.claimants.at(i).get('isRepresentative').value) {
        const value = this.claimants.at(i).get('representative').value;
        if (value !== '' && !isNaN(value)) {
          const number = parseInt(value);
          if (number === index) {
            this.claimants.at(i).get('representative').setValue('');
          } else if (number > index) {
            this.claimants
              .at(i)
              .get('representative')
              .setValue(value - 1);
          }
        } else continue;
      }
    }
  }

  getLabel(labelIndex: number) {
    const number = labelIndex < 10 ? '0' + labelIndex : labelIndex.toString();
    return this.representativeOptionLabel + ' ' + number;
  }

  getClaimants(): Claimant[] {
    const claimants: Claimant[] = [];
    for (const c of this.editForm.value.claimants) {
      if (!c.isRepresentative) {
        const address = this.getAddress(c);
        const contacts = this.getContacts(c);
        let claimant: Organisation | Citizen;
        if (c.organisation !== '')
          claimant = this.getOrganisation(c, address, contacts);
        else claimant = this.getCitizen(c, address, contacts);
        let representative: Organisation | Citizen;
        if (c.representative !== '') {
          //the index at which the representative of the claimant is located within the array being looped over is referred to as "c.representative".
          const index = parseInt(c.representative);
          representative = this.getRepresentative(
            this.editForm.value.claimants[index]
          );
        }
        claimants.push(new Claimant(claimant, representative, c.otherDetails));
      }
    }
    return claimants;
  }

  private getRepresentative(representative: any): Organisation | Citizen {
    const address = this.getAddress(representative);
    const contacts = this.getContacts(representative);
    if (representative.organisation !== '')
      return this.getOrganisation(representative, address, contacts);
    else return this.getCitizen(representative, address, contacts);
  }

  private getOrganisation(
    obj: any,
    address: Address,
    contacts: Contacts
  ): Organisation {
    return new Organisation(
      obj.organisation,
      address,
      obj.identificationCode,
      contacts
    );
  }

  private getCitizen(obj: any, address: Address, contacts: Contacts): Citizen {
    return new Citizen(
      obj.firstName,
      obj.surname,
      address,
      obj.identificationCode,
      contacts
    );
  }

  private getAddress(obj: any): Address {
    return new Address(obj.street, obj.postalCode, obj.city, obj.country);
  }

  private getContacts(obj: any): Contacts {
    return new Contacts(obj.phoneNumber, obj.email);
  }

  setClaimantForm(claimants: any[]): Promise<void> {
    this.resetAll();
    for (let i = 0; i < claimants.length; i++) {
      const claimant = claimants[i];

      if (!claimant.isRepresentative) {
        this.claimants.push(this.createFormGroup('claimant'));
        this.editForm.get('claimants').get(i.toString()).setValue(claimant);
      } else {
        this.claimants.push(this.createFormGroup('representative'));
        this.addRepresentative(i);
        this.editForm.get('claimants').get(i.toString()).setValue(claimant);
      }
    }

    return this.handleStableEvent(claimants);
  }

  private handleStableEvent(claimants: any[]): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }
        for (let i = 0; i < claimants.length; i++) {
          const obj = new CountryIdGenerator(i);
          let id = '';
          if (!claimants[i].isRepresentative) {
            id = obj.claimantCountryId;
          } else {
            id = obj.claimantRepresentativeCountryId;
          }
          this.triggerChangeEvent(id);
        }
        resolve();
      });
    });
  }

  private resetAll() {
    this.editForm.reset();
    this.claimants.clear();
    this.representatives = [];
    this.isWorldCountrySelectVisible = false;
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  }
}
