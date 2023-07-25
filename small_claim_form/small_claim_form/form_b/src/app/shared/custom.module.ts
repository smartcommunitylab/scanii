import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
    SpinnerComponent
  ],
  exports: [],
})
export class CustomModule {}
