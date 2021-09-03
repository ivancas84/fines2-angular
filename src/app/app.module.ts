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
import { AlumnoShowComponent } from '@component/alumno-show/alumno-show.component';
import { CalificacionShowComponent } from '@component/calificacion-show/calificacion-show.component';
import { AlumnoComisionShowComponent } from '@component/alumno-comision-show/alumno-comision-show.component';
import { ComisionRelacionadaShowAdminComponent } from '@component/comision-relacionada-show-admin/coomision-relacionada-show-admin.component';
import { AlumnoComisionRelacionShowComponent } from '@component/alumno-comision-relacion-show/alumno-comision-relacion-show.component';
import { DesignacionShowComponent } from '@component/designacion-show/designacion-show.component';
import { DesignacionRelacionShowComponent } from '@component/designacion-relacion-show/designacion-relacion-show.component';
import { AlumnosParaDocenteComponent } from '@component/_alumnos-para-docente/_alumnos-para-docente.component';
import { ReferentesParaDocenteComponent } from '@component/_referentes-para-docente/_referentes-para-docente.component';
import { DesignacionAdminShowComponent } from '@component/designacion-admin-show/designacion-admin-show.component';
import { TomaShowComponent } from '@component/toma-show/toma-show.component';
import { TomaShowAdminComponent } from '@component/toma-show-admin/toma-show-admin.component';
//import { MatTimepickerModule } from 'mat-timepicker';
//import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
//import { GoogleLoginProvider } from 'angularx-social-login';

//import { ClipboardModule } from '@angular/cdk/clipboard';


//import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';




@NgModule({
  declarations: [
    AppComponent,

    MenuComponent,

    ComisionShowComponent,
    AlumnoShowComponent,
    CalificacionShowComponent,
    ComisionRelacionadaShowAdminComponent,
    AlumnoComisionShowComponent,
    AlumnoComisionRelacionShowComponent,
    DesignacionShowComponent,
    DesignacionRelacionShowComponent,
    AlumnosParaDocenteComponent,
    ReferentesParaDocenteComponent,
    DesignacionAdminShowComponent,
    TomaShowComponent,
    TomaShowAdminComponent

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
