import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  errorToast!: Toast;
  isErrorToastShown = false;
  isSidebarActive = true;

  constructor() {}

  showErrorToast() {
    if (!this.isErrorToastShown) {
      document.getElementById("error_toast").classList.remove("exiting_arrow");

      this.errorToast.show();

      this.isErrorToastShown = true;

      //add entrance animation
      document.getElementById('error_toast').style.animation =
        'entrance_animation 0.7s linear';
    }
  }

  hideErrorToast() {
    if (this.isErrorToastShown) {
      this.isErrorToastShown = false;
      //deactivate sidebar menu to avoid animation bugs
      this.isSidebarActive = false;

      //add exiting animation
      this.addToastexiting_animation();

      //wait for the animation to finish and hide the toast
      setTimeout(() => {
        this.errorToast.hide();
        this.isSidebarActive = true;
      }, 630);
    }
  }

  private addToastexiting_animation() {
    document.getElementById('error_toast').style.animation =
      'exiting_animation 0.7s linear';
    document.getElementById('error_toast').classList.add('exiting_arrow');
  }
}
