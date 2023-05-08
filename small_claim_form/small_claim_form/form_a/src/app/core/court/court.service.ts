import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}
}
