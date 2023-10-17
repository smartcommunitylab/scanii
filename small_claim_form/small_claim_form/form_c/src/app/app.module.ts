import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./layouts/main/main.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, LocationStrategy } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CustomModule } from "./shared/custom.module";
import { StepOneComponent } from "./steps/step-one/step-one.component";
import { StepTwoComponent } from "./steps/step-two/step-two.component";

export function HttpLoaderFactory(
  http: HttpClient,
  locationStrategy: LocationStrategy
) {
  return new TranslateHttpLoader(
    http,
    `${locationStrategy.getBaseHref()}assets/i18n/`,
    ".json"
  );
}

export class CustomMissingTranslationHandler
  implements MissingTranslationHandler
{
  handle(params: MissingTranslationHandlerParams) {
    console.log("Missing translation:", params.key);
    return "translation-not-found[" + params.key + "]";
  }
}

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    NavbarComponent,
    StepOneComponent,
    StepTwoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, LocationStrategy],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler,
      },
    }),
  ],
  providers: [],
  bootstrap: [MainComponent],
  exports: [TranslateModule],
})
export class AppModule {}
