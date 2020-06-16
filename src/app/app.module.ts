import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
  NgbModule,
  NgbDateAdapter, 
  // NgbCollapseModule, 
  // NgbDropdownModule,
  // NgbPaginationModule,
  // NgbAccordionModule,
  // NgbTypeaheadModule,
  // NgbToastModule,
  NgbDatepickerModule,
  NgbDateParserFormatter,
  // NgbTimepickerModule,
  NgbTimeAdapter,
} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LabelPipe } from '@pipe/label.pipe';
import { ToDatePipe } from '@pipe/to-date.pipe';
import { ToTimePipe } from '@pipe/to-time.pipe';
import { SiNoPipe } from '@pipe/si-no.pipe';
import { StoragePipe } from '@pipe/storage.pipe';
import { SummaryPipe } from '@pipe/summary.pipe';
import { SearchAllComponent } from '@component/search-all/search-all.component';
import { PaginationComponent } from '@component/pagination/pagination.component';
import { MessagesComponent } from '@component/messages/messages.component';
import { ModalConfirmComponent } from '@component/modal-confirm/modal-confirm.component';
import { ToastsComponent } from '@component/toasts/toasts.component';
import { MessageService } from '@service/message/message.service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { TypeaheadComponent } from '@component/typeahead/typeahead.component';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { NgbIsoDateAdapter } from '@service/ng-bootstrap/ngb-iso-date-adapter';
import { NgbDateCustomParserFormatter } from '@service/ng-bootstrap/dateformat';
import { ParserService } from '@service/parser/parser.service';
import { UploadComponent } from '@component/upload/upload.component';
import { DownloadComponent } from '@component/download/download.component';
import { NgbStringTimeAdapter } from '@service/ng-bootstrap/ngb-string-time-adapter';

import { DataDefinitionLoaderService } from '@service/data-definition-loader.service';
import { MenuComponent } from '@component/menu/menu.component';

import { AsignaturaAdminComponent } from '@component/asignatura-admin/asignatura-admin/asignatura-admin.component';
import { AsignaturaFieldsetComponent } from '@component/asignatura-admin/asignatura-fieldset/asignatura-fieldset.component';
import { ConsolidadoComponent } from '@component/consolidado/consolidado/consolidado.component';
import { ConsolidadoTableComponent } from '@component/consolidado/consolidado-table/consolidado-table.component';
import { ConsolidadoSearchComponent } from '@component/consolidado/consolidado-search/consolidado-search/consolidado-search.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin/sede-admin.component';
import { SedeFieldsetComponent } from '@component/sede-admin/sede-fieldset/sede-fieldset.component';
import { TipoSedeAdminComponent } from '@component/tipo-sede-admin/tipo-sede-admin/tipo-sede-admin.component';
import { TipoSedeFieldsetComponent } from '@component/tipo-sede-admin/tipo-sede-fieldset/tipo-sede-fieldset.component';
import { TipoSedeShowComponent } from '@component/tipo-sede-show/tipo-sede-show/tipo-sede-show.component';
import { TipoSedeTableComponent } from '@component/tipo-sede-show/tipo-sede-table/tipo-sede-table.component';
import { CentroEducativoAdminComponent } from '@component/centro-educativo-admin/centro-educativo-admin/centro-educativo-admin.component';
import { CentroEducativoFieldsetComponent } from '@component/centro-educativo-admin/centro-educativo-fieldset/centro-educativo-fieldset.component';
import { DomicilioCeFieldsetComponent } from '@component/centro-educativo-admin/domicilio-ce-fieldset/domicilio-ce-fieldset.component';
import { CentroEducativoShowComponent } from '@component/centro-educativo-show/centro-educativo-show/centro-educativo-show.component';
import { CentroEducativoTableComponent } from '@component/centro-educativo-show/centro-educativo-table/centro-educativo-table.component';
import { DomicilioSedeFieldsetComponent } from '@component/sede-admin/domicilio-sede-fieldset/domicilio-sede-fieldset.component';
import { PersonaAdminComponent } from '@component/persona-admin/persona-admin/persona-admin.component';
import { PersonaFieldsetComponent } from '@component/persona-admin/persona-fieldset/persona-fieldset.component';
import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { CargoAdminComponent } from '@component/cargo-admin/cargo-admin/cargo-admin.component';
import { CargoFieldsetComponent } from '@component/cargo-admin/cargo-fieldset/cargo-fieldset.component';
import { DesignacionAdminComponent } from '@component/designacion-admin/designacion-admin/designacion-admin.component';
import { DesignacionFieldsetComponent } from '@component/designacion-admin/designacion-fieldset/designacion-fieldset.component';
import { DesignacionTableComponent } from '@component/sede-admin/designacion-table/designacion-table.component';
import { PlanAdminComponent } from '@component/plan-admin/plan-admin/plan-admin.component';
import { PlanFieldsetComponent } from '@component/plan-admin/plan-fieldset/plan-fieldset.component';
import { PlanShowComponent } from '@component/plan-show/plan-show/plan-show.component';
import { PlanTableComponent } from '@component/plan-show/plan-table/plan-table.component';
import { ComisionAdminComponent } from '@component/comision-admin/comision-admin/comision-admin.component';
import { ComisionFieldsetComponent } from '@component/comision-admin/comision-fieldset/comision-fieldset.component';
import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { PersonaSearchComponent } from '@component/persona-show/persona-search/persona-search.component';
import { AsignaturaShowComponent } from '@component/asignatura-show/asignatura-show/asignatura-show.component';
import { AsignaturaTableComponent } from '@component/asignatura-show/asignatura-table/asignatura-table.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin/curso-admin.component';
import { CursoFieldsetComponent } from '@component/curso-admin/curso-fieldset/curso-fieldset.component';
import { ComisionCardComponent } from '@component/comision-detail/comision-card/comision-card.component';
import { ComisionDetailComponent } from '@component/comision-detail/comision-detail/comision-detail.component';
import { ModalidadAdminComponent } from '@component/modalidad-admin/modalidad-admin/modalidad-admin.component';
import { ModalidadFieldsetComponent } from '@component/modalidad-admin/modalidad-fieldset/modalidad-fieldset.component';
import { ComisionCursoAdminComponent } from '@component/comision-admin/comision-curso-admin/comision-curso-admin.component';
import { CursoShowComponent } from '@component/curso-show/curso-show/curso-show.component';
import { CursoTableComponent } from '@component/curso-show/curso-table/curso-table.component';
import { SedeSearchParamsComponent } from '@component/sede-show/sede-search/sede-search-params/sede-search-params.component';
import { SedeSearchComponent } from '@component/sede-show/sede-search/sede-search/sede-search.component';
import { AsignaturaSearchComponent } from '@component/asignatura-show/asignatura-search/asignatura-search.component';
import { SedeShowComponent } from '@component/sede-show/sede-show/sede-show.component';
import { SedeTableComponent } from '@component/sede-show/sede-table/sede-table.component';
import { CrearComisionesComponent } from '@component/crear-comisiones/crear-comisiones.component';
import { CrearHorariosComponent } from '@component/crear-horarios/crear-horarios.component';
import { ComisionGridComponent } from '@component/comision-show/comision-grid/comision-grid.component';
import { ComisionSearchComponent } from '@component/comision-show/comision-search/comision-search/comision-search.component';
import { ComisionSearchParamsComponent } from '@component/comision-show/comision-search/comision-search-params/comision-search-params.component';
import { ComisionHorarioGridComponent } from '@component/comision-detail/comision-horario-grid/comision-horario-grid.component';
import { ComisionCursoGridComponent } from '@component/comision-detail/comision-curso-grid/comision-curso-grid.component';
import { HorarioAdminComponent } from '@component/horario-admin/horario-admin/horario-admin.component';
import { HorarioFieldsetComponent } from '@component/horario-admin/horario-fieldset/horario-fieldset.component';
import { DivisionShowComponent } from '@component/division-show/division-show/division-show.component';
import { DivisionGridComponent } from '@component/division-show/division-grid/division-grid.component';
import { DivisionSearchComponent } from '@component/division-show/division-search/division-search/division-search.component';
import { DivisionSearchParamsComponent } from '@component/division-show/division-search/division-search-params/division-search-params.component';
import { CrearHorariosComisionComponent } from '@component/comision-detail/crear-horarios-comision/crear-horarios-comision.component';
import { PersonaGridComponent } from '@component/persona-show/persona-grid/persona-grid.component';
import { TelefonoGridComponent } from '@component/persona-admin/telefono-grid/telefono-grid.component';
import { TelefonoAdminComponent } from '@component/telefono-admin/telefono-admin/telefono-admin.component';
import { TelefonoFieldsetComponent } from '@component/telefono-admin/telefono-fieldset/telefono-fieldset.component';
import { ConsolidadoSearchParamsComponent } from '@component/consolidado/consolidado-search/consolidado-search-params/consolidado-search-params.component';
import { TomaAdminComponent } from '@component/toma-admin/toma-admin/toma-admin.component';
import { TomaFieldsetComponent } from '@component/toma-admin/toma-fieldset/toma-fieldset.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LabelPipe, ToDatePipe, ToTimePipe, SiNoPipe, SummaryPipe, StoragePipe,
    SearchAllComponent,
    PaginationComponent,
    MessagesComponent,
    TypeaheadComponent,
    ModalConfirmComponent,
    ToastsComponent,
    UploadComponent,
    DownloadComponent,

    AsignaturaAdminComponent, AsignaturaFieldsetComponent,
    AsignaturaShowComponent, AsignaturaTableComponent, AsignaturaSearchComponent,
    CargoAdminComponent, CargoFieldsetComponent,
    CentroEducativoAdminComponent, CentroEducativoFieldsetComponent, DomicilioCeFieldsetComponent,
    CentroEducativoShowComponent, CentroEducativoTableComponent,
    ComisionAdminComponent, ComisionFieldsetComponent, ComisionCursoAdminComponent,
    ComisionShowComponent, ComisionGridComponent, ComisionSearchComponent, ComisionSearchParamsComponent,
    ComisionDetailComponent, ComisionCardComponent, ComisionHorarioGridComponent, ComisionCursoGridComponent, CrearHorariosComisionComponent,
    ConsolidadoComponent, ConsolidadoTableComponent, ConsolidadoSearchComponent, ConsolidadoSearchParamsComponent,
    CrearComisionesComponent, CrearHorariosComponent,
    CursoAdminComponent, CursoFieldsetComponent,
    CursoShowComponent, CursoTableComponent,
    DesignacionAdminComponent, DesignacionFieldsetComponent,
    DivisionShowComponent, DivisionGridComponent, DivisionSearchComponent, DivisionSearchParamsComponent,
    HorarioAdminComponent, HorarioFieldsetComponent,
    ModalidadAdminComponent, ModalidadFieldsetComponent,
    PlanAdminComponent, PlanFieldsetComponent,
    PlanShowComponent, PlanTableComponent,
    PersonaShowComponent, PersonaSearchComponent, PersonaGridComponent,
    PersonaAdminComponent, PersonaFieldsetComponent, TelefonoGridComponent,
    SedeShowComponent, SedeTableComponent, SedeSearchComponent, SedeSearchParamsComponent,
    SedeAdminComponent, SedeFieldsetComponent, DomicilioSedeFieldsetComponent, DesignacionTableComponent,
    TipoSedeAdminComponent, TipoSedeFieldsetComponent,
    TipoSedeShowComponent, TipoSedeTableComponent,
    TelefonoAdminComponent, TelefonoFieldsetComponent,
    TomaAdminComponent, TomaFieldsetComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
    //NgbToastModule, NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbTypeaheadModule, NgbDatepickerModule, NgbTimepickerModule
  ],
  providers: [
    MessageService, DataDefinitionService, DataDefinitionLoaderService, SessionStorageService, ParserService, 
    ToastService, ValidatorsService,
    {provide: NgbDateAdapter, useClass: NgbIsoDateAdapter}, 
    {provide: NgbTimeAdapter, useClass: NgbStringTimeAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
