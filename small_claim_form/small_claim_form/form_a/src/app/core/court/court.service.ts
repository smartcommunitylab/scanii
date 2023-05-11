import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PromiseContent } from '../common/promise-content.model';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  editForm = this.fb.group({
    country: ['', [Validators.required]],
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    postalCode: [''],
    city: [''],
  });

  constructor(private fb: FormBuilder, private zone: NgZone) {}

  onStableSubscription: Subscription;

  isCourtFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        this.markCourtFormAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step8', isValid));
    });
  }

  markCourtFormAsDirty() {
    for (const formElementName in this.editForm.controls) {
      const formElement = this.editForm.get(formElementName);
      this.markAsDirty(formElement);
    }
  }

  private markAsDirty(formElement: AbstractControl) {
    if (formElement instanceof FormGroup) {
      for (const nestedFormElementName in formElement.controls) {
        const nestedFormElement = formElement.get(nestedFormElementName);
        if (nestedFormElement instanceof FormGroup) {
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

        this.triggerChangeEvent('dynformSCA1CourtCountry');

        resolve();
      });
    });
  }

  private resetAll() {
    this.editForm.reset();
  }

  private triggerChangeEvent(id: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    const event = new Event('change');
    inputElement.dispatchEvent(event);
  }

}
