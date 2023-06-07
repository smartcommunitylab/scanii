import { NgModule } from '@angular/core';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';
import { LibraryModule } from './shared.libs.module';
import { WarningToastComponent } from './components/warning-toast/warning-toast.component';

@NgModule({
  imports: [LibraryModule],
  declarations: [ErrorToastComponent, WarningToastComponent],
  exports: [LibraryModule, ErrorToastComponent, WarningToastComponent],
})
export class CustomModule {}
