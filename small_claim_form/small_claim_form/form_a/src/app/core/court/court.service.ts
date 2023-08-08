import { Injectable, NgZone } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { PromiseContent } from "../common/promise-content.model";
import { Court } from "./court.model";
import { HttpClient } from "@angular/common/http";
import { SERVER_API_URL } from "src/app/app.constants";
import { Claim } from "../preview/claim.model";

@Injectable({
  providedIn: "root",
})
export class CourtService {
  editForm = this.fb.group({
    country: ["", [Validators.required]],
    name: ["", [Validators.required]],
    street: ["", [Validators.required]],
    postalCode: [""],
    city: [""],
  });
  europeanCountries: { value: string; label: string }[] = [];
  onStableSubscription: Subscription;

  constructor(
    private fb: UntypedFormBuilder,
    private zone: NgZone,
    private httpClient: HttpClient
  ) {}

  isCourtFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        this.markCourtFormAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent("step8", isValid));
    });
  }

  markCourtFormAsDirty() {
    for (const formElementName in this.editForm.controls) {
      const formElement = this.editForm.get(formElementName);
      this.markAsDirty(formElement);
    }
  }

  private markAsDirty(formElement: AbstractControl) {
    if (formElement instanceof UntypedFormGroup) {
      for (const nestedFormElementName in formElement.controls) {
        const nestedFormElement = formElement.get(nestedFormElementName);
        if (nestedFormElement instanceof UntypedFormGroup) {
          this.markAsDirty(nestedFormElement);
        } else {
          nestedFormElement.markAsDirty({
            onlySelf: true,
          });
        }
      }
    } else {
      formElement.markAsDirty({
        onlySelf: true,
      });
    }
  }

  setCourtForm(court: any): Promise<void> {
    this.resetAll();
    this.editForm.patchValue(court);
    return this.handleStableEvent();
  }

  private handleStableEvent(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.onStableSubscription = this.zone.onStable.subscribe(() => {
        if (this.onStableSubscription) {
          this.onStableSubscription.unsubscribe();
        }

        this.triggerChangeEvent("dynformSCA1CourtCountry");

        resolve();
      });
    });
  }

  getCourt(): Court {
    const countryId = this.editForm.get("country").value;

    let countryName = "";
    const country = this.europeanCountries.find(
      (country) => country.value === countryId
    );
    if (country) countryName = country.label;

    const name = this.editForm.get("name").value;
    const street = this.editForm.get("street").value;
    const postalCode = this.editForm.get("postalCode").value;
    const city = this.editForm.get("city").value;

    return new Court(countryId, countryName, name, street, postalCode, city);
  }

  private resetAll() {
    this.editForm.reset();
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event("change");
    inputElement.dispatchEvent(event);
  }

  uploadFile(dataBlock: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", dataBlock);
    return this.httpClient.post<any>(
      SERVER_API_URL + "documents/upload/raw",
      formData
    );
  }

  createClaim(claim: any): Observable<any> {
    return this.httpClient.post(SERVER_API_URL + "claims/v1/claims", claim);
  }
}
