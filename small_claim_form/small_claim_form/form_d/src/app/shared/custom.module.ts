import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  declarations: [
    PreviewModalComponent,
    SpinnerComponent,
    ErrorToastComponent,
  ],
  exports: [ErrorToastComponent, SpinnerComponent],
})
export class CustomModule {}
