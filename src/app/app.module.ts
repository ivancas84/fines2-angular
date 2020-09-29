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

//import { ClipboardModule } from '@angular/cdk/clipboard';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ParserService } from '@service/parser/parser.service';
import { ValidatorsService } from '@service/validators/validators.service';

import { LabelPipe } from '@pipe/label.pipe';
import { ToDatePipe } from '@pipe/to-date.pipe';
import { ToTimePipe } from '@pipe/to-time.pipe';
import { SiNoPipe } from '@pipe/si-no.pipe';
import { StoragePipe } from '@pipe/storage.pipe';
import { SummaryPipe } from '@pipe/summary.pipe';

import { DataDefinitionLoaderService } from '@service/data-definition-loader.service';

import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { InputAutocompleteComponent } from '@component/input-autocomplete/input-autocomplete.component';
import { InputDateComponent } from '@component/input-date/input-date.component';
import { InputSelectCheckboxComponent } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectComponent } from '@component/input-select/input-select.component';
import { InputSelectValueComponent } from '@component/input-select-value/input-select-value.component';
import { InputSelectParamComponent } from '@component/input-select-param/input-select-param.component';
import { InputSearchGoComponent } from '@component/input-search-go/input-search-go.component';
import { InputTextComponent } from '@component/input-text/input-text.component';
import { InputTextareaComponent } from '@component/input-textarea/input-textarea.component';
import { InputTimepickerComponent } from '@component/input-timepicker/input-timepicker.component';

//import { InputYmComponent } from '@component/input-ym/input-ym.component';
import { InputYearComponent } from '@component/input-year/input-year.component';
import { MenuComponent } from '@component/menu/menu.component';
import { SearchAllComponent } from '@component/search-all/search-all.component';
import { LabelComponent } from '@component/label/label.component';

import { CalendarioLabelComponent } from '@component/reusable/calendario-label/calendario-label.component';
import { CalendarioInputSelectComponent } from '@component/reusable/calendario-input-select/calendario-input-select.component';
import { PlanificacionInputPickerComponent } from '@component/reusable/planificacion-input-picker/planificacion-input-picker.component';
import { CursoShortLabelComponent } from '@component/reusable/curso-short-label/curso-short-label.component';
import { InputCursoShortSelectComponent } from '@component/reusable/input-curso-short-select/input-curso-short-select.component';

import { ComisionAdminComponent } from '@component/comision-admin/comision-admin/comision-admin.component';
import { ComisionFieldsetComponent } from '@component/comision-admin/comision-fieldset/comision-fieldset.component';
import { CaCursoTableComponent } from '@component/comision-admin/ca-curso-table/ca-curso-table.component';

import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { ComisionTableComponent } from '@component/comision-show/comision-table/comision-table.component';
import { ComisionSearchComponent } from '@component/comision-show/comision-search/comision-search.component';
import { ComisionSearchParamsComponent } from '@component/comision-show/comision-search-params/comision-search-params.component';

import { ComisionHorariosAdminComponent } from '@component/comision-horarios-admin/comision-horarios-admin/comision-horarios-admin.component';
import { ComisionHorariosFieldsetComponent } from '@component/comision-horarios-admin/comision-horarios-fieldset/comision-horarios-fieldset.component';

import { HorarioFieldsetArrayComponent } from '@component/horario-admin/horario-fieldset-array/horario-fieldset-array.component';

import { PersonaAdminComponent } from '@component/persona-admin/persona-admin/persona-admin.component';
import { PersonaFieldsetComponent } from '@component/persona-admin/persona-fieldset/persona-fieldset.component';

import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { PersonaTableComponent } from '@component/persona-show/persona-table/persona-table.component';
import { PersonaSearchComponent } from '@component/persona-show/persona-search/persona-search.component';

import { RdPersonaAdminComponent } from '@component/registro-docente/persona-admin/persona-admin.component';
import { RdPersonaFieldsetComponent } from '@component/registro-docente/persona-fieldset/persona-fieldset.component';
import { HorarioAdminComponent } from '@component/horario-admin/horario-admin/horario-admin.component';
import { SedeAdminComponent } from '@component/sede-admin/sede-admin/sede-admin.component';
import { SedeFieldsetComponent } from '@component/sede-admin/sede-fieldset/sede-fieldset.component';
import { CursoAdminComponent } from '@component/curso-admin/curso-admin/curso-admin.component';
import { CursoFieldsetArrayComponent } from '@component/curso-admin/curso-fieldset-array/curso-fieldset-array.component';
import { TomaAdminComponent } from '@component/toma-admin/toma-admin/toma-admin.component';
import { TomaFieldsetArrayComponent } from '@component/toma-admin/toma-fieldset-array/toma-fieldset-array.component';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,

    LabelPipe, 
    ToDatePipe, 
    ToTimePipe, 
    SiNoPipe, 
    SummaryPipe, 
    StoragePipe,

    DialogAlertComponent,
    DialogConfirmComponent,
    InputAutocompleteComponent,
    InputDateComponent,
    InputSelectCheckboxComponent,
    InputSelectComponent,
    InputSelectValueComponent,
    InputSelectParamComponent,
    InputSearchGoComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputTimepickerComponent,
    InputYearComponent,
    //InputYmComponent,
    MenuComponent,
    SearchAllComponent,
    LabelComponent,
    //DynamicTableComponent,

    CalendarioLabelComponent, CalendarioInputSelectComponent, PlanificacionInputPickerComponent,
    CursoShortLabelComponent, InputCursoShortSelectComponent,

    ComisionAdminComponent, ComisionFieldsetComponent, CaCursoTableComponent,
    ComisionHorariosAdminComponent, ComisionHorariosFieldsetComponent,
    ComisionShowComponent, ComisionTableComponent, ComisionSearchComponent, ComisionSearchParamsComponent,
    CursoAdminComponent, CursoFieldsetArrayComponent,
    PersonaAdminComponent, PersonaFieldsetComponent,
    PersonaShowComponent, PersonaTableComponent, PersonaSearchComponent,
    RdPersonaAdminComponent, RdPersonaFieldsetComponent,
    SedeAdminComponent, SedeFieldsetComponent,
    HorarioAdminComponent, HorarioFieldsetArrayComponent,
    TomaAdminComponent, TomaFieldsetArrayComponent
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

    //ClipboardModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,

    MaterialFileInputModule,
    MatTimepickerModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition:"top", horizontalPosition:"right"}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },

    DataDefinitionService, 
    SessionStorageService, 
    ParserService, 
    ValidatorsService,
    
    DataDefinitionLoaderService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
