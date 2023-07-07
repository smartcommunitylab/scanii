import { NgModule } from '@angular/core';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';
import { LibraryModule } from './shared.libs.module';
import { WarningToastComponent } from './components/warning-toast/warning-toast.component';
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [LibraryModule],
  declarations: [ErrorToastComponent, WarningToastComponent, PreviewModalComponent, SpinnerComponent],
  exports: [LibraryModule, ErrorToastComponent, WarningToastComponent, SpinnerComponent],
})
export class CustomModule {}
