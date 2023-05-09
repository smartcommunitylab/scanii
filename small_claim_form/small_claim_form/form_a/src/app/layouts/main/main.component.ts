import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IFRAME_URL } from 'src/app/app.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  language: string = 'en';

  constructor(
    private translateService: TranslateService
  ) {
    this.translateService.use(this.language);

    window.addEventListener('message', this.listener.bind(this), false);
  }

  private listener(event: MessageEvent) {
    if (event.origin === IFRAME_URL) {
      this.language = event.data;
      this.translateService.use(this.language);
    }
  }

  send() {
    window.parent.postMessage('hello', 'http://localhost:3000');
  }

}
