import { NgModule } from "@angular/core";
import { ErrorToastComponent } from "./components/error-toast/error-toast.component";
import { WarningToastComponent } from "./components/warning-toast/warning-toast.component";
import { PreviewModalComponent } from "./components/preview-modal/preview-modal.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";

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
  ],
  exports: [ErrorToastComponent, WarningToastComponent, SpinnerComponent],
})
export class CustomModule {}
