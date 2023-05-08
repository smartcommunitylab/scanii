import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PromiseContent } from '../common/promise-content.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimDetailsService {
  requiredValidator = Validators.required;

  editForm = this.fb.group({
    detailsOfClaim: ['', [Validators.required]],
    writtenEvidence: ['', [Validators.required]],
    writtenEvidenceText: [''],
    witnesses: ['', [Validators.required]],
    witnessesText: [''],
    otherClaimDetails: ['', [Validators.required]],
    otherClaimDetailsText: [''],
  });

  constructor(private fb: FormBuilder) { }

  isClaimDetailsFormValid(): Promise<PromiseContent> {
    return new Promise((resolve) => {
      let isValid = false;
      if (this.editForm.invalid) {
        // if (this.editForm.get('otherCheckbox').value)
        //   this.markOtherTextAsDirty();
        // else this.markCheckboxesAsDirty();
        isValid = false;
      } else {
        isValid = true;
      }
      resolve(new PromiseContent('step6', isValid));
    });
  }
}
