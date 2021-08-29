import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-AR');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialFileInputModule } from 'ngx-material-file-input';
//import { MatTimepickerModule } from 'mat-timepicker';

import { AppMaterialModule } from './core/app-material.module';

//import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
//import { GoogleLoginProvider } from 'angularx-social-login';

//import { ClipboardModule } from '@angular/cdk/clipboard';

//import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';


import { MenuComponent } from '@component/menu/menu.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show.component';
import { AppCoreModule } from './core/app-core.module';
//import { MatTimepickerModule } from 'mat-timepicker';
//import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
//import { GoogleLoginProvider } from 'angularx-social-login';

//import { ClipboardModule } from '@angular/cdk/clipboard';


//import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';




@NgModule({
  declarations: [
    AppComponent,

    MenuComponent,

    ComisionShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    AppCoreModule,
    MaterialFileInputModule,
    //MatTimepickerModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
