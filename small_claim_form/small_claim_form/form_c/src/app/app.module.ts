import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StepOneComponent } from './steps/step-one/step-one.component';
import { CustomModule } from './shared/custom.module';
import { StepZeroComponent } from './steps/step-zero/step-zero.component';

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
    FooterComponent,
    NavbarComponent,
    StepOneComponent,
    StepZeroComponent
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
        deps: [HttpClient],
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
export class AppModule { }
