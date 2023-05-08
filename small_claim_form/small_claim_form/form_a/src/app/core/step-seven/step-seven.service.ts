import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';

@Injectable({
  providedIn: 'root',
})
export class StepSevenService {
  requiredValidator = Validators.required;

  oralHearingForm = this.fb.group({
    oralHearingRequest: ['', [Validators.required]],
    oralHearingRequestReasons: [''],
    oralHearingPresence: ['', [Validators.required]],
    oralHearingPresenceReasons: [''],
  });
  documentAndCommunicationForm = this.fb.group({
    electronicCommunicationWithCourtTribunal: ['', [Validators.required]],
    electronicCommunicationOther: [[''], [Validators.required]],
  });
  certificateForm = this.fb.group({
    certificateRequest: ['', [Validators.required]],
    language: [''],
  });
  dateAndSignatureForm = this.fb.group({
    city: ['', [Validators.required]],
    date: ['', [Validators.required]],
    sign: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  isStepValid(): boolean {
    return (
      this.oralHearingForm.valid &&
      this.documentAndCommunicationForm.valid &&
      this.certificateForm.valid &&
      this.dateAndSignatureForm.valid
    );
  }

  isStepSevenFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (!this.isStepValid()) {
        // if (this.editForm.get('otherCheckbox').value)
        //   this.markOtherTextAsDirty();
        // else this.markCheckboxesAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step7', isValid));
    });
  }

}
