import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from "./layouts/main/main.component";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { ClaimantComponent } from "./steps/claimant/claimant.component";
import { DefendantComponent } from "./steps/defendant/defendant.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./layouts/footer/footer.component";
import { JurisdictionComponent } from "./steps/jurisdiction/jurisdiction.component";
import { StepFourComponent } from "./steps/step-four/step-four.component";
import { ClaimComponent } from "./steps/claim/claim.component";
import { ClaimDetailsComponent } from "./steps/claim-details/claim-details.component";
import { StepSevenComponent } from "./steps/step-seven/step-seven.component";
import { CourtComponent } from "./steps/court/court.component";
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AngularIbanModule } from "angular-iban";
import { CustomModule } from "./shared/custom.module";
import { NgxWebstorageModule } from "ngx-webstorage";
import { AuthInterceptor } from "./blocks/interceptor/auth.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
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
    NavbarComponent,
    ClaimantComponent,
    DefendantComponent,
    FooterComponent,
    JurisdictionComponent,
    StepFourComponent,
    ClaimComponent,
    ClaimDetailsComponent,
    StepSevenComponent,
    CourtComponent,
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: "", separator: "" }),
    AppRoutingModule,
    AngularIbanModule,
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
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [MainComponent],
  exports: [TranslateModule],
})
export class AppModule {}
