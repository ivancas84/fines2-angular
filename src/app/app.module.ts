
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
import { AlumnoCalificacionTableComponent } from '@component/alumno-admin/alumno-calificacion-table.component';
import { AprobadoPipe } from '@pipe/aprobado.pipe';
import { DesaprobadoPipe } from '@pipe/desaprobado.pipe';
import { TableResumenComisionesComponent } from '@component/resumen-comisiones/table-resumen-comisiones.component';
import { ListaComisionesDocentesSinContralorComponent } from '@component/resumen-comisiones/lista-comisiones-docentes-sin-contralor';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin.component';
import { CalendarioAdminArrayComponent } from '@component/calendario-admin-array/calendario-admin-array.component';
import { ComisionAdminArrayComponent } from '@component/comision-admin/comision-admin-array.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { CursosTomaPosesionComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion.component';
import { TomaPosesionEmailAbcComponent } from '@component/toma-posesion-email-abc/toma-posesion-email-abc.component';
import { InscripcionDocenteComponent } from '@component/inscripcion-docente/inscripcion-docente.component';
import { InscripcionDocenteCorrectaComponent } from '@component/inscripcion-docente-correcta/inscripcion-docente-correcta.component';
import { EnlaceNoDisponibleComponent } from '@component/enlace-no-disponible/enlace-no-disponible.component';
import { ComisionTableComponent } from '@component/comision-table/comision-table.component';
import { InfoCursosComponent } from '@component/info-cursos/info-cursos.component';
import { CursosTomaPosesionTableComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion-table.component';
import { InfoCursosTableComponent } from '@component/info-cursos/info-cursos-table.component';
import { SedeAdmin2Component } from './component/sede-admin2/sede-admin2.component';
import { SedeAdminFieldsetSedeComponent } from './component/sede-admin-fieldset-sede/sede-admin-fieldset-sede.component';

@NgModule({
  declarations: [
    AppComponent,
    AprobadoPipe,
    DesaprobadoPipe,

    AlumnoAdminComponent,
    AlumnoCalificacionTableComponent,
    AsignaturaArrayComponent,
    CalendarioAdminComponent,
    CalendarioAdminArrayComponent,
    ComisionAdminComponent,
    ComisionAdminArrayComponent,
    CursoAdminComponent,
    CursosTomaPosesionComponent,
    CursosTomaPosesionTableComponent,
    EnlaceNoDisponibleComponent,
    GenerarConstanciaComponent,
    InfoCursosComponent,
    InfoCursosTableComponent,
    InscripcionDocenteComponent,
    InscripcionDocenteCorrectaComponent,
    ListaComisionesComponent,
    ListaComisionesDocentesSinContralorComponent,
    MenuComponent,
    ResumenAlumnosComponent,
    ResumenComisionesComponent,
    SedeAdminComponent,
    TableResumenComisionesComponent,
    TomaPosesionEmailAbcComponent,
    ComisionTableComponent,
    SedeAdmin2Component,
    SedeAdminFieldsetSedeComponent,
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
