
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
import { ResumenComisionesComponent } from '@component/_resumen-comisiones/resumen-comisiones.component';
import { CursoAdminComponent } from '@component/_curso-admin/curso-admin.component';
import { ListaComisionesComponent } from '@component/_resumen-comisiones/lista-comisiones.component';
import { ResumenAlumnosComponent } from '@component/_resumen-alumnos/resumen-alumnos.component';
import { AprobadoPipe } from '@pipe/aprobado.pipe';
import { DesaprobadoPipe } from '@pipe/desaprobado.pipe';
import { TableResumenComisionesComponent } from '@component/_resumen-comisiones/table-resumen-comisiones.component';
import { ListaComisionesDocentesSinContralorComponent } from '@component/_resumen-comisiones/lista-comisiones-docentes-sin-contralor';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin.component';
import { CursosTomaPosesionComponent } from '@component/cursos-toma-posesion/cursos-toma-posesion.component';
import { TomaPosesionEmailAbcComponent } from '@component/_toma-posesion-email-abc/toma-posesion-email-abc.component';
import { InscripcionDocenteComponent } from '@component/_inscripcion-docente/inscripcion-docente.component';
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
import { AlumnoAdmin2Component } from './component/alumno-admin2/alumno-admin2.component';
import { AlumnoAdminFieldsetPersonaComponent } from './component/alumno-admin-fieldset-persona/alumno-admin-fieldset-persona.component';
import { AlumnoAdminFieldsetAlumnoComponent } from './component/alumno-admin-fieldset-alumno/alumno-admin-fieldset-alumno.component';
import { AlumnoAdminTableAlumnoComisionComponent } from './component/alumno-admin-table-alumno-comision/alumno-admin-table-alumno-comision.component';
import { AlumnoAdminTableCalificacionComponent } from './component/alumno-admin-table-calificacion/alumno-admin-table-calificacion.component';
import { AlumnoAdminTableDetallePersonaComponent } from './component/alumno-admin-table-detalle-persona/alumno-admin-table-detalle-persona.component';
import { UploadDetallePersonaArchivoComponent } from './component/upload-detalle-persona-archivo/upload-detalle-persona-archivo.component';
import { AutocompleteComisionComponent } from './component/autocomplete-comision/autocomplete-comision.component';
import { AsignaturaArray2Component } from './component/asignatura-array2/asignatura-array2.component';
import { CalendarioArray2Component } from './component/calendario-array2/calendario-array2.component';
import { AsignaturaArrayTableComponent } from './component/asignatura-array-table/asignatura-array-table.component';
import { CalendarioArrayTableComponent } from './component/calendario-array-table/calendario-array-table.component';
import { GenerarConstanciaComponent } from '@component/generar-constancia/generar-constancia.component';
import { AutocompleteAlumnoComponent } from './component/autocomplete-alumno/autocomplete-alumno.component';
import { CalendarioAdminComponent } from '@component/calendario-admin/calendario-admin.component';
import { CursoArrayComponent } from './component/curso-array/curso-array.component';
import { CursoArrayTableComponent } from './component/curso-array-table/curso-array-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AprobadoPipe,
    DesaprobadoPipe,
    CalendarioAdminComponent,
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
    AlumnoAdmin2Component,
    AlumnoAdminFieldsetPersonaComponent,
    AlumnoAdminFieldsetAlumnoComponent,
    AlumnoAdminTableAlumnoComisionComponent,
    AlumnoAdminTableCalificacionComponent,
    AlumnoAdminTableDetallePersonaComponent,
    UploadDetallePersonaArchivoComponent,
    AutocompleteComisionComponent,
    AsignaturaArray2Component,
    CalendarioArray2Component,
    AsignaturaArrayTableComponent,
    CalendarioArrayTableComponent,
    AutocompleteAlumnoComponent,
    CursoArrayComponent,
    CursoArrayTableComponent,
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
