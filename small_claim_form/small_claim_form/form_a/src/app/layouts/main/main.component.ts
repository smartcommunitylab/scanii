import { Component, OnInit } from '@angular/core';
import { IFRAME_URL, ORIGIN_URL } from 'src/app/app.constants';
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
    if (event.origin === ORIGIN_URL) {
      this.translateConfigService.setLanguage(event.data);
    }
  }

  send() {
    // TODO
    //window.parent.postMessage('', IFRAME_URL);
  }
}
