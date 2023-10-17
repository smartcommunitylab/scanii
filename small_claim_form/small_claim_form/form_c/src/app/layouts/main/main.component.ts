import { Component, OnInit, Renderer2 } from "@angular/core";
import { SCRIPT_PATH } from "src/app/app.constants";
import { ScriptService } from "src/app/shared/services/script.service";
import { TranslateConfigService } from "src/app/shared/services/translate-config.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor(
    private translateConfigService: TranslateConfigService,
    private renderer: Renderer2,
    private scriptService: ScriptService
  ) {
    this.translateConfigService.setDefaultLanguage();
  }

  ngOnInit() {
    this.scriptService.loadScript(this.renderer, SCRIPT_PATH);

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
