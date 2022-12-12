
import { DatePipe, registerLocaleData } from '@angular/common';
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
import { AprobadoPipe } from '@pipe/aprobado.pipe';
import { DesaprobadoPipe } from '@pipe/desaprobado.pipe';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { CursosTomaPosesionComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion.component';
import { InscripcionDocenteCorrectaComponent } from '@component/inscripcion-docente-correcta/inscripcion-docente-correcta.component';
import { EnlaceNoDisponibleComponent } from '@component/enlace-no-disponible/enlace-no-disponible.component';
import { InfoCursosComponent } from '@component/info-cursos/info-cursos.component';
import { SedeAdminFieldsetSedeComponent } from './component/sede-admin-fieldset-sede/sede-admin-fieldset-sede.component';
import { SedeAdminFieldsetDomicilioComponent } from './component/sede-admin-fieldset-domicilio/sede-admin-fieldset-domicilio.component';
import { SedeAdminFieldsetComisionComponent } from './component/sede-admin-fieldset-comision/sede-admin-fieldset-comision.component';
import { ComisionAdminComponent } from './component/comision-admin/comision-admin.component';
import { ComisionAdminFieldsetComisionComponent } from './component/comision-admin-fieldset-comision/comision-admin-fieldset-comision.component';
import { CursosTomaPosesionTableComponent } from '@component/cursos-toma-posesion-table/cursos-toma-posesion-table.component';
import { ComisionAdminFieldsetCursoComponent } from './component/comision-admin-fieldset-curso/comision-admin-fieldset-curso.component';
import { HorarioAdminArrayComponent } from './component/horario-admin-array/horario-admin-array.component';
import { HorarioAdminArrayTableComponent } from './component/horario-admin-array-table/horario-admin-array-table.component';
import { InfoCursosTableComponent } from '@component/info-cursos-table/info-cursos-table.component';
import { ComisionArrayComponent } from './component/comision-array/comision-array.component';
import { ComisionArrayTableComponent } from './component/comision-array-table/comision-array-table.component';
import { ComisionArraySearchComponent } from './component/comision-array-search/comision-array-search.component';
import { MenuComponent } from '@component/menu/menu.component';
import { SedeAdminFieldsetDesignacionComponent } from './component/sede-admin-fieldset-designacion/sede-admin-fieldset-designacion.component';
import { SedeArrayComponent } from './component/sede-array/sede-array.component';
import { SedeArrayTableComponent } from './component/sede-array-table/sede-array-table.component';
import { SedeArraySearchComponent } from './component/sede-array-search/sede-array-search.component';
import { AlumnoAdminComponent } from './component/alumno-admin/alumno-admin.component';
import { AlumnoAdminFieldsetPersonaComponent } from './component/alumno-admin-fieldset-persona/alumno-admin-fieldset-persona.component';
import { AlumnoAdminFieldsetAlumnoComponent } from './component/alumno-admin-fieldset-alumno/alumno-admin-fieldset-alumno.component';
import { AlumnoAdminTableAlumnoComisionComponent } from './component/alumno-admin-table-alumno-comision/alumno-admin-table-alumno-comision.component';
import { AlumnoAdminTableCalificacionComponent } from './component/alumno-admin-table-calificacion/alumno-admin-table-calificacion.component';
import { AlumnoAdminTableDetallePersonaComponent } from './component/alumno-admin-table-detalle-persona/alumno-admin-table-detalle-persona.component';
import { UploadDetallePersonaArchivoComponent } from './component/upload-detalle-persona-archivo/upload-detalle-persona-archivo.component';
import { AsignaturaArray2Component } from './component/asignatura-array2/asignatura-array2.component';
import { CalendarioArray2Component } from './component/calendario-array2/calendario-array2.component';
import { AsignaturaArrayTableComponent } from './component/asignatura-array-table/asignatura-array-table.component';
import { CalendarioArrayTableComponent } from './component/calendario-array-table/calendario-array-table.component';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin.component';
import { CursoArrayComponent } from './component/curso-array/curso-array.component';
import { CursoArrayTableComponent } from './component/curso-array-table/curso-array-table.component';
import { AlumnoArrayComponent } from './component/alumno-array/alumno-array.component';
import { AlumnoArrayTableComponent } from './component/alumno-array-table/alumno-array-table.component';
import { AlumnoArraySearchComponent } from '@component/alumno-array-search/alumno-array-search.component';
import { CursoArraySearchComponent } from './component/curso-array-search/curso-array-search.component';
import { TomaPosesionEmailComponent } from './component/toma-posesion-email/toma-posesion-email.component';
import { InscripcionDocenteComponent } from '@component/inscripcion-docente/inscripcion-docente.component';
import { DocenteAdminComponent } from './component/docente-admin/docente-admin.component';
import { DocenteAdminFieldsetPersonaComponent } from './component/docente-admin-fieldset-persona/docente-admin-fieldset-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    AprobadoPipe,
    DesaprobadoPipe,
    CalendarioAdminComponent,
    CursosTomaPosesionComponent,
    CursosTomaPosesionTableComponent,
    EnlaceNoDisponibleComponent,
    GenerarConstanciaComponent,
    InfoCursosComponent,
    InfoCursosTableComponent,
    InscripcionDocenteCorrectaComponent,
    InscripcionDocenteComponent,
    MenuComponent,
    SedeAdminComponent,
    SedeAdminComponent,
    SedeAdminFieldsetSedeComponent,
    SedeAdminFieldsetDomicilioComponent,
    SedeAdminFieldsetComisionComponent,
    ComisionAdminComponent,
    ComisionAdminFieldsetComisionComponent,
    ComisionAdminFieldsetCursoComponent,
    HorarioAdminArrayComponent,
    HorarioAdminArrayTableComponent,
    ComisionArrayComponent,
    ComisionArrayTableComponent,
    ComisionArraySearchComponent,
    SedeAdminFieldsetDesignacionComponent,
    SedeArrayComponent,
    SedeArrayTableComponent,
    SedeArraySearchComponent,
    AlumnoAdminComponent,
    AlumnoAdminFieldsetPersonaComponent,
    AlumnoAdminFieldsetAlumnoComponent,
    AlumnoAdminTableAlumnoComisionComponent,
    AlumnoAdminTableCalificacionComponent,
    AlumnoAdminTableDetallePersonaComponent,
    UploadDetallePersonaArchivoComponent,
    AsignaturaArray2Component,
    CalendarioArray2Component,
    AsignaturaArrayTableComponent,
    CalendarioArrayTableComponent,
    CursoArrayComponent,
    CursoArrayTableComponent,
    AlumnoArrayComponent,
    AlumnoArrayTableComponent,
    AlumnoArraySearchComponent,
    CursoArraySearchComponent,
    TomaPosesionEmailComponent,
    DocenteAdminComponent,
    DocenteAdminFieldsetPersonaComponent,
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
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
