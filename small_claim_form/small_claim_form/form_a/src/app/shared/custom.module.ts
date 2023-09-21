import { NgModule } from "@angular/core";
import { ErrorToastComponent } from "./components/error-toast/error-toast.component";
import { WarningToastComponent } from "./components/warning-toast/warning-toast.component";
import { PreviewModalComponent } from "../preview/preview-modal/preview-modal.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { LoginModalComponent } from '../preview/login-modal/login-modal.component';
import { UploadResultModalComponent } from './components/upload-result-modal/upload-result-modal.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  declarations: [
    ErrorToastComponent,
    WarningToastComponent,
    PreviewModalComponent,
    SpinnerComponent,
    LoginModalComponent,
    UploadResultModalComponent,
  ],
  exports: [ErrorToastComponent, WarningToastComponent, SpinnerComponent],
})
export class CustomModule {}
