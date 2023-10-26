import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ErrorToastComponent } from "./components/error-toast/error-toast.component";
import { WarningToastComponent } from "./components/warning-toast/warning-toast.component";
import { UploadResultModalComponent } from "./components/upload-result-modal/upload-result-modal.component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  declarations: [
    SpinnerComponent,
    ErrorToastComponent,
    WarningToastComponent,
    UploadResultModalComponent,
  ],
  exports: [ErrorToastComponent, WarningToastComponent, SpinnerComponent],
})
export class CustomModule {}
