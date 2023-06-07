import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ClaimantComponent } from './steps/claimant/claimant.component';
import { DefendantComponent } from './steps/defendant/defendant.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layouts/footer/footer.component';
import { JurisdictionComponent } from './steps/jurisdiction/jurisdiction.component';
import { StepFourComponent } from './steps/step-four/step-four.component';
import { ClaimComponent } from './steps/claim/claim.component';
import { ClaimDetailsComponent } from './steps/claim-details/claim-details.component';
import { StepSevenComponent } from './steps/step-seven/step-seven.component';
import { CourtComponent } from './steps/court/court.component';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JhiConfigService, missingTranslationHandler } from 'ng-jhipster';
import { AngularIbanModule } from 'angular-iban';
import { CustomModule } from './shared/custom.module';

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
    AppRoutingModule,
    FormsModule,
    AngularIbanModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    CustomModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
        deps: [JhiConfigService]
      }
    })
  ],
  providers: [],
  bootstrap: [MainComponent],
  exports: [TranslateModule],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
