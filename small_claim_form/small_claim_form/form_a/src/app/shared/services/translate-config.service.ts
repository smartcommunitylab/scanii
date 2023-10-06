import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class TranslateConfigService {
  currentLang: any;

  constructor(private translate: TranslateService) {
    this.currentLang = localStorage.getItem("lang");
  }

  setDefaultLanguage() {
    if (!this.currentLang || typeof this.currentLang !== "string") {
      this.currentLang = "en";
      localStorage.setItem("lang", this.currentLang);
    }
    
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
    return this.currentLang;
  }

  setLanguage(setLang: string) {
    this.translate.use(setLang);
    localStorage.setItem("lang", setLang);
  }

  getCurrentLang() {
    return localStorage.getItem("lang");
  }
}
