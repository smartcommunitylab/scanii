import { Injectable, NgZone } from "@angular/core";
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import {
  ClaimantCountryIdGenerator,
  DefendantCountryIdGenerator,
  LabelType,
  courtCountrySelectId,
} from "src/app/shared/constants/step-one.constants";
import { PromiseContent } from "../common/promise-content.model";
import { Claimant } from "./claimant.model";
import { Organisation } from "./organisation.model";
import { Citizen } from "./citizen.model";
import { Address } from "./address.model";
import { Contacts } from "./contacts.model";
import { RepresentativeOrganisation } from "./representative-organisation.model";
import { RepresentativeCitizen } from "./representative-citizen.model";
import { Defendant } from "./defendant.model";
import { Court } from "./court.model";
import { StepOne } from "./step-one.model";

@Injectable({
  providedIn: "root",
})
export class StepOneService {
  requiredValidator = Validators.required;
  europeanCountries: { value: string; label: string }[] = [];
  worldCountries: { value: string; label: string }[] = [];

  isCourtWorldCountrySelectVisible = false;
  onStableCourtSubscription: Subscription;

  claimants: UntypedFormArray = new UntypedFormArray([]);
  isClaimantWorldCountrySelectVisible = false;
  claimantRepresentatives: {
    id: number;
    label: string;
    labelType: LabelType;
    default: string;
    organisation: string;
    firstName: string;
    surname: string;
    address: string;
  }[] = [];
  onStableClaimantSubscription: Subscription;
  claimantRepresentativeOptionLabel: string;

  defendants: UntypedFormArray = new UntypedFormArray([]);
  isDefendantWorldCountrySelectVisible = false;
  defendantRepresentatives: {
    id: number;
    label: string;
    labelType: LabelType;
    default: string;
    organisation: string;
    firstName: string;
    surname: string;
    address: string;
  }[] = [];
  onStableDefendantSubscription: Subscription;
  defendantRepresentativeOptionLabel: string;

  court = this.fb.group({
    courtCountry: ["", [Validators.required]],
    courtCountryOther: [""],
    name: ["", [Validators.required]],
    street: ["", [Validators.required]],
    cityPostalCode: ["", [Validators.required]],
  });

  // claimantRepresentative = this.fb.group({
  //   surnameFirstNameOrganisation: [""],
  //   address: [""],
  //   postalCode: [""],
  //   city: [""],
  //   claimantRepresentativeCountry: [""],
  //   claimantRepresentativeCountryOther: [""],
  // });

  // defendantRepresentative = this.fb.group({
  //   surnameFirstNameOrganisation: [""],
  //   address: [""],
  //   postalCode: [""],
  //   city: [""],
  //   defendantRepresentativeCountry: [""],
  //   defendantRepresentativeCountryOther: [""],
  // });

  form = this.fb.group({
    caseNumber: ["", [Validators.required]],
    date: ["", [Validators.required]],
    court: this.court,
    claimants: this.fb.array([this.createClaimantFormGroup("claimant")]),
    defendants: this.fb.array([this.createDefendantFormGroup("defendant")]),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private zone: NgZone,
    private translateService: TranslateService
  ) {
    this.translateService
      .stream("stepOne.representativeOption")
      .subscribe((res) => {
        this.claimantRepresentativeOptionLabel = res;
        if (this.claimantRepresentatives.length > 0) {
          for (const representative of this.claimantRepresentatives) {
            representative.default = representative.default.replace(
              /^[^ ]+/,
              this.claimantRepresentativeOptionLabel
            );
            if (representative.labelType === LabelType.DEFAULT) {
              representative.label = representative.default;
            }
          }
        }
      });

    this.translateService
      .stream("stepOne.representativeOption")
      .subscribe((res) => {
        this.defendantRepresentativeOptionLabel = res;
        if (this.defendantRepresentatives.length > 0) {
          for (const representative of this.defendantRepresentatives) {
            representative.default = representative.default.replace(
              /^[^ ]+/,
              this.defendantRepresentativeOptionLabel
            );
            if (representative.labelType === LabelType.DEFAULT) {
              representative.label = representative.default;
            }
          }
        }
      });
  }

  validateOrganisationSurnameFirstName(
    formGroup: UntypedFormGroup
  ): { [key: string]: boolean } | null {
    const organisation = formGroup.get("organisation");
    const surname = formGroup.get("surname");
    const firstName = formGroup.get("firstName");

    if (
      (organisation.value && !surname.value && !firstName.value) ||
      (!organisation.value && surname.value && firstName.value)
    ) {
      return null;
    }
    return { organisationSurnameFirstNameError: true };
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

  getFormControl(formControlName: string): AbstractControl | null {
    const formGroupNames = this.findFormGroupNames(formControlName, this.form);
    let formGroup = this.form;
    for (let i = 0; i < formGroupNames.length; i++) {
      formGroup = formGroup.get(formGroupNames[i]) as UntypedFormGroup;
    }
    return formGroup.get(formControlName);
  }

  private findFormGroupNames(
    formElementName: string,
    formGroup: UntypedFormGroup,
    parentFormGroupNames: string[] = []
  ): string[] {
    if (formGroup.contains(formElementName)) {
      return parentFormGroupNames;
    }

    for (const nestedFormElementName in formGroup.controls) {
      const nestedFormElement = formGroup.get(nestedFormElementName);
      if (nestedFormElement instanceof UntypedFormGroup) {
        const nestedFormGroupNames = this.findFormGroupNames(
          formElementName,
          nestedFormElement,
          [...parentFormGroupNames, nestedFormElementName]
        );
        if (nestedFormGroupNames.length > 0) {
          return nestedFormGroupNames;
        }
      }
    }

    return [];
  }

  createClaimantFormGroup(value: string): UntypedFormGroup {
    if (value === "claimant") {
      //form group of the claimant
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
      //form group of the claimant's representative
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

  isStepOneFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.form.invalid) {
        this.markStepOneFormAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step1", isValid));
    });
  }

  markStepOneFormAsDirty() {
    this.form.get("caseNumber").markAsDirty({ onlySelf: true });
    this.form.get("date").markAsDirty({ onlySelf: true });
    this.markCourtFormAsDirty();
    this.markClaimantFormAsDirty();
    this.markDefendantFormAsDirty();
  }

  markCourtFormAsDirty() {
    Object.keys((this.form.get("court") as UntypedFormGroup).controls).forEach(
      (field) => {
        const formControl = this.form.get("court").get(field);

        if (field === "courtCountryOther") {
          if (this.isCourtWorldCountrySelectVisible) {
            formControl.markAsDirty({ onlySelf: true });
          }
        } else formControl.markAsDirty({ onlySelf: true });
      }
    );
  }

  markClaimantFormAsDirty() {
    this.claimants.controls.forEach((formGroup: UntypedFormGroup) => {
      Object.keys(formGroup.controls).forEach((field) => {
        const formControl = formGroup.get(field);

        if (field === "countryOther") {
          if (this.isClaimantWorldCountrySelectVisible) {
            formControl.markAsDirty({ onlySelf: true });
          }
        } else formControl.markAsDirty({ onlySelf: true });
      });
    });
  }

  markDefendantFormAsDirty() {
    this.defendants.controls.forEach((formGroup: UntypedFormGroup) => {
      Object.keys(formGroup.controls).forEach((field) => {
        const formControl = formGroup.get(field);

        if (field === "countryOther") {
          if (this.isDefendantWorldCountrySelectVisible) {
            formControl.markAsDirty({ onlySelf: true });
          }
        } else formControl.markAsDirty({ onlySelf: true });
      });
    });
  }

  addClaimantRepresentative(index: number) {
    const id = index;
    const label = this.getClaimantLabel(
      this.claimantRepresentatives.length + 1
    );
    this.claimantRepresentatives.push({
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

  removeClaimantRepresentative(index: number) {
    const objIndex = this.claimantRepresentatives.findIndex(
      (r) => r.id === index
    );
    this.claimantRepresentatives.splice(objIndex, 1);

    for (let i = objIndex; i < this.claimantRepresentatives.length; i++) {
      const number =
        parseInt(this.claimantRepresentatives[i].default.split(" ")[1]) - 1;
      this.claimantRepresentatives[i].default = this.getClaimantLabel(number);
      if (this.claimantRepresentatives[i].labelType === LabelType.DEFAULT) {
        this.claimantRepresentatives[i].label =
          this.claimantRepresentatives[i].default;
      }
    }

    for (let i = 0; i < this.claimants.length; i++) {
      if (!this.claimants.at(i).get("isRepresentative").value) {
        const value = this.claimants.at(i).get("representative").value;
        if (value !== "" && !isNaN(value)) {
          const number = parseInt(value);
          if (number === index) {
            this.claimants.at(i).get("representative").setValue("");
          } else if (number > index) {
            this.claimants
              .at(i)
              .get("representative")
              .setValue(value - 1);
          }
        } else continue;
      }
    }
  }

  getClaimantLabel(labelIndex: number) {
    const number = labelIndex < 10 ? "0" + labelIndex : labelIndex.toString();
    return this.claimantRepresentativeOptionLabel + " " + number;
  }

  getStepOne(): StepOne {
    const caseNumber = this.form.get("caseNumber").value;
    const date = this.form.get("date").value;
    const court = this.getCourt();
    const claimants = this.getClaimants();
    const defendants = this.getDefendants();

    return new StepOne(caseNumber, date, court, claimants, defendants);
  }

  getClaimants(): (Claimant | RepresentativeCitizen | RepresentativeOrganisation)[] {
    const claimants: (Claimant | RepresentativeCitizen | RepresentativeOrganisation)[] = [];
    const representativeIds: number[] = [];
    for (let i = 0; i < this.form.value.claimants.length; i++) {
      const claimant = this.form.value.claimants[i];
      if (!claimant.isRepresentative) {
        const address = this.getAddress(claimant);
        const contacts = this.getContacts(claimant);
        let obj: Organisation | Citizen;
        if (claimant.organisation !== "")
          obj = this.getOrganisation(claimant, address, contacts);
        else obj = this.getCitizen(claimant, address, contacts);
        let representative: RepresentativeCitizen | RepresentativeOrganisation;
        if (claimant.representative !== "") {
          //the index at which the representative of the claimant is located within the array being looped over is referred to as "claimant.representative".
          const index = parseInt(claimant.representative);
          representativeIds.push(index);
          representative = this.getRepresentative(
            this.form.value.claimants[index]
          );
        }
        claimants.push(
          new Claimant(obj, representative, claimant.otherDetails)
        );
      } else {
        // since there might be claimantRepresentatives who are not associated with a claimant, it is necessary to add them in the claimants array
        if (!representativeIds.includes(i)) {
          const address = this.getAddress(claimant);
          const contacts = this.getContacts(claimant);
          if (claimant.organisation !== "") {
            const representative = this.getRepresentativeOrganisation(
              claimant,
              address,
              contacts
            );
            claimants.push(representative);
          } else {
            const representative = this.getRepresentativeCitizen(
              claimant,
              address,
              contacts
            );
            claimants.push(representative);
          }
        }
      }
    }
    return claimants;
  }

  private getRepresentative(representative: any): RepresentativeCitizen | RepresentativeOrganisation {
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

  setStepOneForm(stepOne: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.resetAll();
      this.translateService
        .get(["europeanCountries", "worldCountries"])
        .subscribe((res) => {
          this.europeanCountries = res.europeanCountries;
          this.worldCountries = res.worldCountries;

          this.form.get("caseNumber").patchValue(stepOne.caseNumber);
          this.form.get("date").patchValue(stepOne.date);
          this.form.get("court").patchValue(stepOne.court);

          //claimants
          for (let i = 0; i < stepOne.claimants.length; i++) {
            const claimant = stepOne.claimants[i];

            if (!claimant.isRepresentative) {
              this.claimants.push(this.createClaimantFormGroup("claimant"));
              this.form.get("claimants").get(i.toString()).patchValue(claimant);
            } else {
              this.claimants.push(
                this.createClaimantFormGroup("representative")
              );
              this.addClaimantRepresentative(i);
              this.form.get("claimants").get(i.toString()).patchValue(claimant);
            }
          }

          //defendants
          for (let i = 0; i < stepOne.defendants.length; i++) {
            const defendant = stepOne.defendants[i];

            if (!defendant.isRepresentative) {
              this.defendants.push(this.createDefendantFormGroup("defendant"));
              this.form
                .get("defendants")
                .get(i.toString())
                .patchValue(defendant);
            } else {
              this.defendants.push(
                this.createDefendantFormGroup("representative")
              );
              this.addDefendantRepresentative(i);
              this.form
                .get("defendants")
                .get(i.toString())
                .patchValue(defendant);
            }
          }

          this.handleStableEvent(stepOne).then(() => {
            resolve();
          });
        });
    });
  }

  private handleStableEvent(stepOne: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableClaimantSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableClaimantSubscription) {
          this.onStableClaimantSubscription.unsubscribe();
        }

        this.triggerChangeEvent(courtCountrySelectId);

        for (let i = 0; i < stepOne.claimants.length; i++) {
          const obj = new ClaimantCountryIdGenerator(i);
          let id = "";
          if (!stepOne.claimants[i].isRepresentative) {
            id = obj.claimantCountryId;
          } else {
            id = obj.claimantRepresentativeCountryId;
          }
          this.triggerChangeEvent(id);
        }

        for (let i = 0; i < stepOne.defendants.length; i++) {
          const obj = new DefendantCountryIdGenerator(i);
          let id = "";
          if (!stepOne.defendants[i].isRepresentative) {
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
    this.form.reset();
    this.claimants.clear();
    this.defendants.clear();
    this.claimantRepresentatives = [];
    this.defendantRepresentatives = [];
    this.isClaimantWorldCountrySelectVisible = false;
    this.isDefendantWorldCountrySelectVisible = false;
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event("change");
    inputElement.dispatchEvent(event);
  }

  createDefendantFormGroup(value: string): UntypedFormGroup {
    if (value === "defendant") {
      //defendant form group
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
      //defendant's representative form group
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

  addDefendantRepresentative(index: number) {
    const id = index;
    const label = this.getDefendantLabel(
      this.defendantRepresentatives.length + 1
    );
    this.defendantRepresentatives.push({
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

  removeDefendantRepresentative(index: number) {
    const objIndex = this.defendantRepresentatives.findIndex(
      (r) => r.id === index
    );
    this.defendantRepresentatives.splice(objIndex, 1);

    for (let i = objIndex; i < this.defendantRepresentatives.length; i++) {
      const number =
        parseInt(this.defendantRepresentatives[i].default.split(" ")[1]) - 1;
      this.defendantRepresentatives[i].default = this.getDefendantLabel(number);
      if (this.defendantRepresentatives[i].labelType === LabelType.DEFAULT) {
        this.defendantRepresentatives[i].label =
          this.defendantRepresentatives[i].default;
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

  getDefendantLabel(labelIndex: number) {
    const number = labelIndex < 10 ? "0" + labelIndex : labelIndex.toString();
    return this.defendantRepresentativeOptionLabel + " " + number;
  }

  getDefendants(): (Defendant | RepresentativeCitizen | RepresentativeOrganisation)[] {
    const defendants: (Defendant | RepresentativeCitizen | RepresentativeOrganisation)[] = [];
    const representativeIds: number[] = [];
    for (let i = 0; i < this.form.value.defendants.length; i++) {
      const defendant = this.form.value.defendants[i];
      if (!defendant.isRepresentative) {
        const address = this.getAddress(defendant);
        const contacts = this.getContacts(defendant);
        let obj: Organisation | Citizen;
        if (defendant.organisation !== "")
          obj = this.getOrganisation(defendant, address, contacts);
        else obj = this.getCitizen(defendant, address, contacts);
        let representative: RepresentativeCitizen | RepresentativeOrganisation;
        if (defendant.representative !== "") {
          //the index at which the representative of the defendant is located within the array being looped over is referred to as "defendant.representative".
          const index = parseInt(defendant.representative);
          representativeIds.push(index);
          representative = this.getRepresentative(
            this.form.value.defendants[index]
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

  getCourt(): Court {
    const value = this.form.get("court").get("courtCountry").value;

    const countryId =
      value !== "other"
        ? value
        : this.form.get("court").get("courtCountryOther").value;

    let countryName = "";
    if (value !== "other") {
      const country = this.europeanCountries.find((c) => c.value === countryId);
      if (country) countryName = country.label;
    } else {
      const country = this.worldCountries.find((c) => c.value === countryId);
      if (country) countryName = country.label;
    }

    const name = this.form.get("court").get("name").value;
    const street = this.form.get("court").get("street").value;
    const cityPostalCode = this.form.get("court").get("cityPostalCode").value;

    return new Court(countryId, countryName, name, street, cityPostalCode);
  }
}
