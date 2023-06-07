import { Injectable, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';
import {
  CountryIdGenerator,
  LabelType,
} from 'src/app/shared/constants/defendant.constants';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DefendantService {
  requiredValidator = Validators.required;

  editForm = this.fb.group({
    defendants: this.fb.array([this.createFormGroup('defendant')]),
  });
  defendants: FormArray = new FormArray([]);
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
      .stream('defendant.representativeOption')
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
    if (value === 'defendant') {
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
          email: ['', [Validators.email]],
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
          email: ['', [Validators.email]],
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

  isDefendantFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.get('defendants').invalid) {
        this.markAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step2', isValid));
    });
  }

  markAsDirty() {
    this.defendants.controls.forEach((formGroup: FormGroup) => {
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

    for (let i = 0; i < this.defendants.length; i++) {
      if (!this.defendants.at(i).get('isRepresentative').value) {
        const value = this.defendants.at(i).get('representative').value;
        if (value !== '' && !isNaN(value)) {
          const number = parseInt(value);
          if (number === index) {
            this.defendants.at(i).get('representative').setValue('');
          } else if (number > index) {
            this.defendants
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

  setDefendantForm(defendants: any[]): Promise<void> {
    this.resetAll();
    for (let i = 0; i < defendants.length; i++) {
      const defendant = defendants[i];

      if (!defendant.isRepresentative) {
        this.defendants.push(this.createFormGroup('defendant'));
        this.editForm.get('defendants').get(i.toString()).setValue(defendant);
      } else {
        this.defendants.push(this.createFormGroup('representative'));
        this.addRepresentative(i);
        this.editForm.get('defendants').get(i.toString()).setValue(defendant);
      }
    }

    return this.handleStableEvent(defendants);
  }

  private handleStableEvent(defendants: any[]): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }
        for (let i = 0; i < defendants.length; i++) {
          const obj = new CountryIdGenerator(i);
          let id = '';
          if (!defendants[i].isRepresentative) {
            id = obj.defendantCountryId;
          } else {
            id = obj.defendantRepresentativeCountryId;
          }
          this.triggerChangeEvent(id);
        }
        resolve();
      });
    });
  }

  private resetAll() {
    this.editForm.reset();
    this.defendants.clear();
    this.representatives = [];
    this.isWorldCountrySelectVisible = false;
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  }
}
