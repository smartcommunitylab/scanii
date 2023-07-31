import { Component, OnInit } from '@angular/core';
import { Toast } from "bootstrap";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss']
})
export class ErrorToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.initialize();
    document
      .getElementById("close_error_toast_button")
      .addEventListener("click", () => this.toastService.hideErrorToast());
  }

  initialize() {
    const toastElement = document.getElementById("error_toast") as HTMLElement;
    this.toastService.errorToast = new Toast(toastElement);
  }

  // isWarningToastVisible() {
  //   return window["getIsWarningStepVisible"]();
  // }
}
