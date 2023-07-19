import { Component } from '@angular/core';
import { EXTERNAL_URI, INTERNAL_URI } from 'src/app/app.constants';
import { TranslateConfigService } from 'src/app/shared/services/translate-config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  constructor(private translateConfigService: TranslateConfigService) {
    const currentLang = this.translateConfigService.getDefaultLanguage();
    this.translateConfigService.setLanguage(currentLang);

    window.addEventListener('message', this.listener.bind(this), false);
  }

  private listener(event: MessageEvent) {
    if (event.origin === EXTERNAL_URI) {
      this.translateConfigService.setLanguage(event.data);
    }
  }

  send() {
    // TODO
    //window.parent.postMessage('', EXTERNAL_URI);
  }
}
