import { Injectable } from "@angular/core";
import { Toast } from "bootstrap";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  errorToast!: Toast;
  isErrorToastVisible = false;

  constructor() {}

  showErrorToast() {
    if (!this.isErrorToastVisible) {
      this.errorToast.show();
      this.isErrorToastVisible = true;
    }
  }

  hideErrorToast() {
    if (this.isErrorToastVisible) {
      this.errorToast.hide();
      this.isErrorToastVisible = false;
    }
  }
}
