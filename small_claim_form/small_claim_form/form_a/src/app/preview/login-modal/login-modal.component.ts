import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Login } from "src/app/core/login/login.model";
import { LoginService } from "src/app/core/login/login.service";
import { Alert } from "bootstrap";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent {
  isAlertVisible = false;
  loginFailed: string;
  checkCredentials: string;

  form = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private loginService: LoginService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService
      .stream(["login.failed", "login.checkCredentials"])
      .subscribe((res) => {
        this.loginFailed = res["login.failed"];
        this.checkCredentials = res["login.checkCredentials"];
      });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  login() {
    if (this.form.invalid) {
      if (!this.isAlertVisible) {
        this.appendAlert();
      }
    } else {
      const credentials: Login = {
        username: this.form.get("username").value,
        password: this.form.get("password").value,
      };

      const timeoutId = setTimeout(() => {
        this.appendAlert();
      }, 500);

      this.loginService.login(credentials).subscribe(
        () => {
          clearTimeout(timeoutId);

          this.activeModal.close();
          this.closeAlert();
        },
        () => {
          clearTimeout(timeoutId);
          this.appendAlert();
        }
      );
    }
  }

  private appendAlert(): void {
    this.isAlertVisible = true;

    const alertPlaceholder = document.getElementById("alert-placeholder");

    alertPlaceholder.innerHTML = [
      `<div class="alert alert-danger alert-dismissible fade show d-flex justify-content-between pe-2" id="alert" role="alert">`,
      `   <span class="pe-2"> <strong>` +
        this.loginFailed +
        `</strong> <br>` +
        this.checkCredentials +
        ` </span>`,
      '   <button type="button" class="btn-close btn-close-alert align-self-center" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    const alert = document.getElementById("alert");
    alert.addEventListener("closed.bs.alert", (event) => {
      this.isAlertVisible = false;
    });
  }

  private closeAlert(): void {
    this.isAlertVisible = false;
    const alert = Alert.getOrCreateInstance("#alert");
    if (alert._element) {
      alert.close();
    }
  }
}
