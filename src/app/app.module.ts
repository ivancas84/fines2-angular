import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTimepickerModule } from 'mat-timepicker';
import { CookieService } from 'ngx-cookie-service';

import { AppMaterialModule } from './core/app-material.module';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { GOOGLE_CLIENT_ID } from './app.config';

//import { ClipboardModule } from '@angular/cdk/clipboard';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { AuthService } from '@service/auth/auth.service';

import { ToDatePipe } from '@pipe/to-date.pipe';
import { ToTimePipe } from '@pipe/to-time.pipe';
import { SiNoPipe } from '@pipe/si-no.pipe';
import { StoragePipe } from '@pipe/storage.pipe';
import { SummaryPipe } from '@pipe/summary.pipe';

import { DataDefinitionStorageService } from '@service/data-definition-storage.service';
import { DataDefinitionLabelService } from '@service/data-definition-label/data-definition-label.service';

import { LoginComponent } from '@component/login/login.component';
import { LogoutComponent } from '@component/logout/logout.component';
import { HomeComponent } from '@component/home/home.component';
import { SocialLoginComponent } from '@component/social-login/social-login.component';

import { CardDynamicComponent } from '@component/card-dynamic/card-dynamic.component';
import { TableDynamicComponent } from '@component/table-dynamic/table-dynamic.component';
import { FieldsetDynamicComponent } from '@component/fieldset-dynamic/fieldset-dynamic.component';
//import { BackupComponent } from '@component/backup/backup.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { InputAutocompleteComponent } from '@component/input-autocomplete/input-autocomplete.component';
import { InputDateComponent } from '@component/input-date/input-date.component';
import { InputNumberComponent } from '@component/input-number/input-number.component';
import { InputSelectCheckboxComponent } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectComponent } from '@component/input-select/input-select.component';
import { InputSelectValueComponent } from '@component/input-select-value/input-select-value.component';
import { InputSelectParamComponent } from '@component/input-select-param/input-select-param.component';
//import { InputSelectLabelComponent } from '@component/input-select-label/input-select-label.component';
import { InputSearchGoComponent } from '@component/input-search-go/input-search-go.component';
import { InputTextComponent } from '@component/input-text/input-text.component';
import { InputTextareaComponent } from '@component/input-textarea/input-textarea.component';
import { InputTimepickerComponent } from '@component/input-timepicker/input-timepicker.component';
import { InputCheckboxComponent } from '@component/input-checkbox/input-checkbox.component';
//import { InputYmComponent } from '@component/input-ym/input-ym.component';
import { InputYearComponent } from '@component/input-year/input-year.component';
import { MenuComponent } from '@component/menu/menu.component';
import { SearchAllComponent } from '@component/search-all/search-all.component';
import { LabelComponent } from '@component/label/label.component';
import { FieldLabelComponent } from '@component/field-label/field-label.component';
import { FieldTreeLabelComponent } from '@component/field-tree-label/field-tree-label.component';
import { FieldViewComponent } from '@component/field-view/field-view.component';

import { CalendarioInputSelectComponent } from '@component/reusable/calendario-input-select/calendario-input-select.component';
import { CalendarioLabelComponent } from '@component/reusable/calendario-label/calendario-label.component';
import { CursoIgeLabelComponent } from '@component/reusable/curso-ige-label/curso-ige-label.component';
import { CursoShortLabelComponent } from '@component/reusable/curso-short-label/curso-short-label.component';
import { InputCursoShortSelectComponent } from '@component/reusable/input-curso-short-select/input-curso-short-select.component';
import { PlanificacionInputPickerComponent } from '@component/reusable/planificacion-input-picker/planificacion-input-picker.component';

import { AlumnoShowComponent } from '@component/alumno-show/alumno-show.component';

import { DocenteTableComponent } from '@component/docente-show/docente-table/docente-table.component';
import { DocenteShowComponent } from '@component/docente-show/docente-show/docente-show.component';
import { DocenteSearchComponent } from '@component/docente-show/docente-search/docente-search.component';

import { RdPersonaAdminComponent } from '@component/registro-docente/persona-admin/persona-admin.component';
import { RdPersonaFieldsetComponent } from '@component/registro-docente/persona-fieldset/persona-fieldset.component';
import { RegistroRealizadoComponent } from '@component/registro-realizado/registro-realizado.component';

import { HorarioAdminComponent } from '@component/horario-admin/horario-admin/horario-admin.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin/sede-admin.component';
import { SedeFieldsetComponent } from '@component/sede-admin/sede-fieldset/sede-fieldset.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin/curso-admin.component';
import { CursoFieldsetArrayComponent } from '@component/curso-admin/curso-fieldset-array/curso-fieldset-array.component';
import { TomaAdminComponent } from '@component/toma-admin/toma-admin/toma-admin.component';
import { TomaFieldsetArrayComponent } from '@component/toma-admin/toma-fieldset-array/toma-fieldset-array.component';

import { CdComisionShowComponent } from '@component/consolidado-docente/consolidado-docente/comision-show.component';
import { CdComisionTableComponent } from '@component/consolidado-docente/comision-table/comision-table.component';
import { RabcPersonaAdminComponent } from '@component/registro-abc/persona-admin/persona-admin.component';
import { RabcPersonaFieldsetComponent } from '@component/registro-abc/persona-fieldset/persona-fieldset.component';
import { TomaPosesionAdminComponent } from '@component/toma-posesion/toma-posesion-admin/toma-posesion-admin.component';
import { TomaPosesionFieldsetComponent } from '@component/toma-posesion/toma-posesion-fieldset/toma-posesion-fieldset.component';
import { TomaPosesionRealizadaComponent } from '@component/toma-posesion-realizada/toma-posesion-realizada.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin/comision-admin.component';
import { ComisionFieldsetComponent } from '@component/comision-admin/comision-fieldset/comision-fieldset.component';
import { CaCursoTableComponent } from '@component/comision-admin/ca-curso-table/ca-curso-table.component';
import { ComisionHorariosAdminComponent } from '@component/comision-horarios-admin/comision-horarios-admin/comision-horarios-admin.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { ComisionHorariosFieldsetComponent } from '@component/comision-horarios-admin/comision-horarios-fieldset/comision-horarios-fieldset.component';
import { PersonaAdminComponent } from '@component/persona-admin/persona-admin/persona-admin.component';
import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { PersonaTableComponent } from '@component/persona-show/persona-table/persona-table.component';
import { PersonaFieldsetComponent } from '@component/persona-admin/persona-fieldset/persona-fieldset.component';
import { ComisionTableComponent } from '@component/comision-show/comision-table/comision-table.component';
import { ComisionSearchComponent } from '@component/comision-show/comision-search/comision-search.component';
import { ComisionSearchParamsComponent } from '@component/comision-show/comision-search-params/comision-search-params.component';
import { PersonaSearchComponent } from '@component/persona-show/persona-search/persona-search.component';
import { HorarioFieldsetArrayComponent } from '@component/horario-admin/horario-fieldset-array/horario-fieldset-array.component';
import { ListaAlumnosComponent } from '@component/lista-alumnos/lista-alumnos.component';
import { CrComisionShowComponent } from '@component/consolidado-referente/comision-show/comision-show.component';
import { CrComisionTableComponent } from '@component/consolidado-referente/comision-table/comision-table.component';

import { DocenteDetailComponent } from '@component/docente-detail/docente-detail/docente-detail.component';

import { TomaShowComponent } from '@component/toma-show/toma-show/toma-show.component';
import { TomaDetailComponent } from '@component/toma-detail/toma-detail.component';
import { AsignacionPlanillaDocenteAdminComponent } from '@component/asignacion-planilla-docente-admin/asignacion-planilla-docente-admin.component';
import { PlanillaDocenteAdminComponent } from '@component/planilla-docente-admin/planilla-docente-admin.component';
import { FieldTreeComponent } from '@component/field-tree/field-tree.component';
import { SearchDynamicComponent } from '@component/search/search-dynamic.component';
import { MenuLoginComponent } from '@component/menu-login/menu-login.component';
import { FieldViewAuxComponent } from '@component/field-view-aux/field-view-aux.component';
import { InputPersistComponent } from '@component/input-persist/input-persist.component';
import { CalendarioAdminArrayComponent } from '@component/calendario-admin-array/calendario-admin-array.component';
import { ComisionShow2Component } from '@component/comision-show2/comision-show2.component';
import { SedeShowComponent } from '@component/sede-show/sede-show.component';
import { SedeAdmin2Component } from '@component/sede-admin2/sede-admin2.component';
import { CentroEducativoAdminComponent } from '@component/centro-educativo-admin/centro-educativo-admin.component';
import { CentroEducativoShowComponent } from '@component/centro-educativo-show/centro-educativo-show.component';
import { CentroEducativoCantidadSedesComponent } from '@component/centro-educativo-cantidad-sedes/centro-educativo-cantidad-sedes.component';
import { ComisionAdmin2Component } from '@component/comision-admin2/comision-admin.component';
import { SedeShow2Component } from '@component/sede-show2/sede-show2.component';
import { SedeShow3Component } from '@component/sede-show3/sede-show3.component';
import { AsignaturaShowAdminComponent } from '@component/asignatura-show-admin/asignatura-show-admin.component';
import { PersonaShowAdminRelComponent } from '@component/persona-show-admin-rel/persona-show-admin-rel.component';
import { DataDefinitionRelArrayService } from '@service/data-definition-rel-array/data-definition-rel-array.service';
import { CalificacionShowAdminRelComponent } from '@component/calificacion-show-admin-rel/calificacion-show-admin-rel.component';
import { OptionsComponent } from '@component/options/options.component';
import { ComisionCensComponent } from '@component/comision-cens/comision-cens.component';
import { SedeCensComponent } from '@component/sede-cens/sede-cens.component';
import { ComisionRelacionadaAdminComponent } from '@component/comision-relacionada-admin/comision-relacionada-admin.component';
import { CursoTomaPosesionComponent } from '@component/curso-toma-posesion/curso-toma-posesion/curso-toma-posesion.component';
import { CursoTomaPosesionTableComponent } from '@component/curso-toma-posesion/curso-toma-posesion-table/curso-toma-posesion-table.component';
import { DesignacionAdminComponent } from '@component/designacion-admin/designacion-admin.component';
import { DesignacionShowComponent } from '@component/designacion-show/designacion-show.component';
import { SearchParamsDynamicComponent } from '@component/search-params/search-params-dynamic.component';
import { AlumnoSearchComponent } from '@component/alumno-show/alumno-search/alumno-search.component';
import { ComisionShow3Component } from '@component/comision-show3/comision-show3.component';
import { AlumnosAprobadosShowComponent } from '@component/alumnos-aprobados-show/alumnos-aprobados-show.component';
import { TransferirAlumnoAdminComponent } from '@component/transferir-alumno-admin/transferir-alumno-admin.component';
import { TableAdminDynamicComponent } from '@component/table-admin/table-admin-dynamic.component';
import { AlumnoComisionAdminRelComponent } from '@component/alumno-comision-admin-rel/alumno-comision-admin-rel.component';
import { AlumnoAdminRelComponent } from '@component/alumno-admin-rel/alumno-admin-rel.component';
import { InputUploadComponent } from '@component/input-upload/input-upload.component';
import { AlumnoComisionShowComponent } from '@component/alumno-comision-show/alumno-comision-show.component';
import { OptionsAdminComponent } from '@component/options-admin/options-admin.component';
import { TransferirAlumnoComisionAdminComponent } from '@component/transferir-alumno-comision-admin/transferir-alumno-comision-admin.component';
import { OptionsDirectionComponent } from '@component/options-direction/options-direction.component';
import { FieldsetArrayDynamicComponent } from '@component/fieldset-array/fieldset-array-dynamic.component';

@NgModule({
  declarations: [
    AppComponent,

    ToDatePipe, 
    ToTimePipe, 
    SiNoPipe, 
    SummaryPipe, 
    StoragePipe,

    LoginComponent,
    SocialLoginComponent,
    LogoutComponent,
    HomeComponent,
    //BackupComponent,

    DialogAlertComponent,
    DialogConfirmComponent,
    FieldViewComponent,
    FieldViewAuxComponent,
    InputAutocompleteComponent,
    InputCheckboxComponent,
    InputDateComponent,
    InputNumberComponent,
    InputSelectCheckboxComponent,
    InputSelectComponent,
    InputSelectValueComponent,
    InputSelectParamComponent,
    InputSearchGoComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputTimepickerComponent,
    InputUploadComponent,
    InputYearComponent,
    InputPersistComponent,
    //InputYmComponent,
    MenuComponent,
    SearchAllComponent,
    LabelComponent,
    FieldLabelComponent,
    FieldTreeLabelComponent,
    FieldTreeComponent,
    TableAdminDynamicComponent,
    TableDynamicComponent,
    CardDynamicComponent,
    FieldsetDynamicComponent,
    FieldsetArrayDynamicComponent,
    SearchDynamicComponent,
    SearchParamsDynamicComponent,
    MenuLoginComponent,
    //DynamicTableComponent,

    CalendarioLabelComponent, CalendarioInputSelectComponent, PlanificacionInputPickerComponent,
    CursoShortLabelComponent, InputCursoShortSelectComponent,
    CursoIgeLabelComponent,

    AlumnoShowComponent,
    AsignacionPlanillaDocenteAdminComponent,
    CdComisionShowComponent, CdComisionTableComponent,
    ComisionAdminComponent, ComisionFieldsetComponent, CaCursoTableComponent,
    ComisionHorariosAdminComponent, ComisionHorariosFieldsetComponent,
    ComisionShowComponent, ComisionTableComponent, ComisionSearchComponent, ComisionSearchParamsComponent,
    CursoAdminComponent, CursoFieldsetArrayComponent,
    DocenteTableComponent, DocenteShowComponent, DocenteSearchComponent,
    DocenteDetailComponent,
    PersonaAdminComponent, PersonaFieldsetComponent,
    PersonaShowComponent, PersonaTableComponent, PersonaSearchComponent,
    RdPersonaAdminComponent, RdPersonaFieldsetComponent,
    RegistroRealizadoComponent,
    RabcPersonaAdminComponent, RabcPersonaFieldsetComponent,
    SedeAdminComponent, SedeFieldsetComponent,
    HorarioAdminComponent, HorarioFieldsetArrayComponent,
    TomaAdminComponent, TomaFieldsetArrayComponent,
    TomaPosesionAdminComponent, TomaPosesionFieldsetComponent,
    TomaPosesionRealizadaComponent,
    CrComisionShowComponent, CrComisionTableComponent,
    TomaDetailComponent,

    ListaAlumnosComponent,
    TomaShowComponent,
    PlanillaDocenteAdminComponent,
    CalendarioAdminArrayComponent,
    ComisionShow2Component,
    AlumnoComisionAdminRelComponent,
    SedeShowComponent,
    SedeAdmin2Component,
    CentroEducativoAdminComponent,
    CentroEducativoShowComponent,
    CentroEducativoCantidadSedesComponent,
    ComisionAdmin2Component,
    SedeShow2Component,
    SedeShow3Component,
    AsignaturaShowAdminComponent,
    PersonaShowAdminRelComponent,
    CalificacionShowAdminRelComponent,
    OptionsComponent,
    ComisionCensComponent,
    SedeCensComponent,
    CursoTomaPosesionComponent, CursoTomaPosesionTableComponent,
    ComisionRelacionadaAdminComponent,
    DesignacionAdminComponent,
    DesignacionShowComponent,
    AlumnoSearchComponent,
    ComisionShow3Component,
    AlumnosAprobadosShowComponent,
    TransferirAlumnoAdminComponent,
    AlumnoAdminRelComponent,
    OptionsAdminComponent,
    AlumnoComisionShowComponent,
    TransferirAlumnoComisionAdminComponent,
    OptionsDirectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    SocialLoginModule,
    //ClipboardModule,

    AppMaterialModule,

    MaterialFileInputModule,
    MatTimepickerModule,
    
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition:"top", horizontalPosition:"right"}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    CookieService,
    
    AuthService,
    DataDefinitionService, 
    DataDefinitionToolService,
    SessionStorageService, 
    ValidatorsService,
    
    DataDefinitionStorageService, 
    DataDefinitionLabelService, 
    DataDefinitionRelArrayService, 


    {provide: 'SocialAuthServiceConfig', useValue: { autoLogin: false,  providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID)
      },
    ]} as SocialAuthServiceConfig, }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
