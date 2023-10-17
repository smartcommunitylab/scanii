import { Component, OnInit } from "@angular/core";
import { EXTERNAL_URI } from "src/app/app.constants";
import { TranslateConfigService } from "src/app/shared/services/translate-config.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor(private translateConfigService: TranslateConfigService) {
    this.translateConfigService.setDefaultLanguage();
  }

  ngOnInit() {
    if (window.addEventListener) {
      window.addEventListener(
        "storage",
        this.storageListener.bind(this),
        false
      );
    }
  }

  private storageListener() {
    const lang = localStorage.getItem("lang");
    if (lang || typeof lang === "string")
      this.translateConfigService.setLanguage(lang);
    else this.translateConfigService.setDefaultLanguage();
  }
}
