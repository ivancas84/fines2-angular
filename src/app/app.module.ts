
import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-AR');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './core/app-material.module';
import { AppCoreModule } from './core/app-core.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AsignaturaArrayComponent } from '@component/asignatura-array/asignatura-array.component';
import { MenuComponent } from './menu/menu.component';
import { ResumenComisionesComponent } from '@component/resumen-comisiones/resumen-comisiones.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin.component';
import { ListaComisionesComponent } from '@component/resumen-comisiones/lista-comisiones.component';
import { ResumenAlumnosComponent } from '@component/resumen-alumnos/resumen-alumnos.component';
import { AlumnoAdminComponent } from '@component/alumno-admin/alumno-admin.component';

@NgModule({
  declarations: [
    AppComponent,

    AlumnoAdminComponent,
    AsignaturaArrayComponent,
    CursoAdminComponent,
    ListaComisionesComponent,
    MenuComponent,
    ResumenAlumnosComponent,
    ResumenComisionesComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
