import { Injectable, NgZone } from "@angular/core";
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { PromiseContent } from "../common/promise-content.model";
import {
  CountryIdGenerator,
  LabelType,
} from "src/app/shared/constants/defendant.constants";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Defendant } from "./defendant.model";
import { Representative } from "../common/representative.model";
import { Organisation } from "../common/organisation.model";
import { Citizen } from "../common/citizen.model";
import { Address } from "../common/address.model";
import { Contacts } from "../common/contacts.model";
import { RepresentativeOrganisation } from "../common/representative-organisation.model";
import { RepresentativeCitizen } from "../common/representative-citizen.model";

@Injectable({
  providedIn: "root",
})
export class DefendantService {
  requiredValidator = Validators.required;

  editForm = this.fb.group({
    defendants: this.fb.array([this.createFormGroup("defendant")]),
  });
  defendants: UntypedFormArray = new UntypedFormArray([]);
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
  europeanCountries: { value: string; label: string }[] = [];
  worldCountries: { value: string; label: string }[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private zone: NgZone,
    private translateService: TranslateService
  ) {
    this.translateService
      .stream("defendant.representativeOption")
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

  createFormGroup(value: string): UntypedFormGroup {
    if (value === "defendant") {
      //form group of the defendant
      const formGroup = this.fb.group(
        {
          organisation: [""],
          surname: [""],
          firstName: [""],
          identificationCode: [""],
          street: ["", [Validators.required]],
          postalCode: ["", [Validators.required]],
          city: ["", [Validators.required]],
          country: ["", [Validators.required]],
          countryOther: [""],
          phoneNumber: ["", [this.phoneNumberValidator]],
          email: ["", [Validators.email]],
          representative: [""],
          otherDetails: [""],
          isRepresentative: [false],
        },
        { validator: this.validateOrganisationSurnameFirstName }
      );
      return formGroup;
    } else {
      //form group of the defendant's representative
      const formGroup = this.fb.group(
        {
          organisation: [""],
          surname: [""],
          firstName: [""],
          identificationCode: [""],
          street: ["", [Validators.required]],
          postalCode: ["", [Validators.required]],
          city: ["", [Validators.required]],
          country: ["", [Validators.required]],
          countryOther: [""],
          phoneNumber: ["", [this.phoneNumberValidator]],
          email: ["", [Validators.email]],
          isRepresentative: [true],
        },
        { validator: this.validateOrganisationSurnameFirstName }
      );
      return formGroup;
    }
  }

  validateOrganisationSurnameFirstName(
    formGroup: UntypedFormGroup
  ): { [key: string]: boolean } | null {
    const organisation = formGroup.get("organisation");
    const surname = formGroup.get("surname");
    const firstName = formGroup.get("firstName");

    const setFormControlValidity = (
      formGroup: UntypedFormGroup,
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
      setFormControlValidity(formGroup, "organisation", true);
      setFormControlValidity(formGroup, "surname", true);
      setFormControlValidity(formGroup, "firstName", true);
      return null;
    }

    setFormControlValidity(formGroup, "organisation", false);
    setFormControlValidity(formGroup, "surname", false);
    setFormControlValidity(formGroup, "firstName", false);
    return { validateOrganisationSurnameFirstName: true };
  }

  isDefendantFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.get("defendants").invalid) {
        this.markAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step2", isValid));
    });
  }

  phoneNumberValidator(
    control: UntypedFormControl
  ): { [key: string]: any } | null {
    //const phoneNumberPattern = /^(\+\d{1,5}\s?)?(?:\d{3}[ ]?\d{3}[ ]?\d{4}|\d{10})$/;
    const phoneNumberPattern = /^[\d+\s]*$/;
    if (control.value && !phoneNumberPattern.test(control.value.trim())) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  markAsDirty() {
    this.defendants.controls.forEach((formGroup: UntypedFormGroup) => {
      Object.keys(formGroup.controls).forEach((field) => {
        const formControl = formGroup.get(field);
        if (field === "countryOther") {
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
      organisation: "",
      firstName: "",
      surname: "",
      address: "",
    });
  }

  removeRepresentative(index: number) {
    const objIndex = this.representatives.findIndex((r) => r.id === index);
    this.representatives.splice(objIndex, 1);

    for (let i = objIndex; i < this.representatives.length; i++) {
      const number =
        parseInt(this.representatives[i].default.split(" ")[1]) - 1;
      this.representatives[i].default = this.getLabel(number);
      if (this.representatives[i].labelType === LabelType.DEFAULT) {
        this.representatives[i].label = this.representatives[i].default;
      }
    }

    for (let i = 0; i < this.defendants.length; i++) {
      if (!this.defendants.at(i).get("isRepresentative").value) {
        const value = this.defendants.at(i).get("representative").value;
        if (value !== "" && !isNaN(value)) {
          const number = parseInt(value);
          if (number === index) {
            this.defendants.at(i).get("representative").setValue("");
          } else if (number > index) {
            this.defendants
              .at(i)
              .get("representative")
              .setValue(value - 1);
          }
        } else continue;
      }
    }
  }

  getLabel(labelIndex: number) {
    const number = labelIndex < 10 ? "0" + labelIndex : labelIndex.toString();
    return this.representativeOptionLabel + " " + number;
  }

  getDefendants(): (Defendant | Representative)[] {
    const defendants: (Defendant | Representative)[] = [];
    const representativeIds: number[] = [];
    for (let i = 0; i < this.editForm.value.defendants.length; i++) {
      const defendant = this.editForm.value.defendants[i];
      if (!defendant.isRepresentative) {
        const address = this.getAddress(defendant);
        const contacts = this.getContacts(defendant);
        let obj: Organisation | Citizen;
        if (defendant.organisation !== "")
          obj = this.getOrganisation(defendant, address, contacts);
        else obj = this.getCitizen(defendant, address, contacts);
        let representative: Representative;
        if (defendant.representative !== "") {
          //the index at which the representative of the defendant is located within the array being looped over is referred to as "defendant.representative".
          const index = parseInt(defendant.representative);
          representativeIds.push(index);
          representative = this.getRepresentative(
            this.editForm.value.defendants[index]
          );
        }
        defendants.push(
          new Defendant(obj, representative, defendant.otherDetails)
        );
      } else {
        // since there might be representatives who are not associated with a defendant, it is necessary to add them in the defendants array
        if (!representativeIds.includes(i)) {
          const address = this.getAddress(defendant);
          const contacts = this.getContacts(defendant);
          if (defendant.organisation !== "") {
            const representative = this.getRepresentativeOrganisation(
              defendant,
              address,
              contacts
            );
            defendants.push(representative);
          } else {
            const representative = this.getRepresentativeCitizen(
              defendant,
              address,
              contacts
            );
            defendants.push(representative);
          }
        }
      }
    }
    return defendants;
  }

  private getRepresentative(representative: any): Representative {
    const address = this.getAddress(representative);
    const contacts = this.getContacts(representative);
    if (representative.organisation !== "")
      return this.getRepresentativeOrganisation(
        representative,
        address,
        contacts
      );
    else
      return this.getRepresentativeCitizen(representative, address, contacts);
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

  private getRepresentativeOrganisation(
    obj: any,
    address: Address,
    contacts: Contacts
  ): RepresentativeOrganisation {
    return new RepresentativeOrganisation(
      obj.organisation,
      address,
      obj.identificationCode,
      contacts
    );
  }

  private getRepresentativeCitizen(
    obj: any,
    address: Address,
    contacts: Contacts
  ): RepresentativeCitizen {
    return new RepresentativeCitizen(
      obj.firstName,
      obj.surname,
      address,
      obj.identificationCode,
      contacts
    );
  }

  private getAddress(obj: any): Address {
    const countryId = obj.country !== "other" ? obj.country : obj.countryOther;

    let countryName = "";
    if (obj.country !== "other") {
      const country = this.europeanCountries.find((c) => c.value === countryId);
      if (country) countryName = country.label;
    } else {
      const country = this.worldCountries.find((c) => c.value === countryId);
      if (country) countryName = country.label;
    }

    return new Address(
      obj.street,
      obj.postalCode,
      obj.city,
      countryId,
      countryName
    );
  }

  private getContacts(obj: any): Contacts {
    return new Contacts(obj.phoneNumber, obj.email);
  }

  setDefendantForm(
    defendants: any[],
    addInformation: boolean = true
  ): Promise<void> {
    this.resetAll();
    for (let i = 0; i < defendants.length; i++) {
      const defendant = defendants[i];

      if (!defendant.isRepresentative) {
        this.defendants.push(this.createFormGroup("defendant"));
        this.editForm.get("defendants").get(i.toString()).patchValue(defendant);
      } else {
        this.defendants.push(this.createFormGroup("representative"));
        this.addRepresentative(i);
        this.editForm.get("defendants").get(i.toString()).patchValue(defendant);
      }
    }

    return this.handleStableEvent(defendants, addInformation);
  }

  private handleStableEvent(
    defendants: any[],
    addInformation: boolean
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        if (addInformation) {
          window["processClaimantDefendantRepresentativeConcept"](
            "step2",
            "http://scanii.org/domain/defendant.personalIdNumber"
          );
          window["processClaimantDefendantRepresentativeConcept"](
            "step2",
            "http://scanii.org/domain/defendant.otherDetails"
          );
        }

        for (let i = 0; i < defendants.length; i++) {
          const obj = new CountryIdGenerator(i);
          let id = "";
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
    const event = new Event("change");
    inputElement.dispatchEvent(event);
  }
}
