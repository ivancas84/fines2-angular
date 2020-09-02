import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatNativeDateModule} from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { MaterialFileInputModule } from 'ngx-material-file-input';

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
import { InputAutocompleteComponent } from '@component/input-autocomplete/input-autocomplete.component';
import { InputSelectComponent } from '@component/input-select/input-select.component';
import { InputSearchGoComponent } from '@component/input-search-go/input-search-go.component';
import { MenuComponent } from '@component/menu/menu.component';
import { SearchAllComponent } from '@component/search-all/search-all.component';
import { LabelComponent } from '@component/label/label.component';

import { ComisionShowComponent } from '@component/comision-show/comision-show/comision-show.component';
import { ComisionTableComponent } from '@component/comision-show/comision-table/comision-table.component';
import { ComisionSearchComponent } from '@component/comision-show/comision-search/comision-search.component';
import { ComisionSearchParamsComponent } from '@component/comision-show/comision-search-params/comision-search-params.component';

import { PersonaAdminComponent } from '@component/persona-admin/persona-admin/persona-admin.component';
import { PersonaFieldsetComponent } from '@component/persona-admin/persona-fieldset/persona-fieldset.component';

import { PersonaShowComponent } from '@component/persona-show/persona-show/persona-show.component';
import { PersonaTableComponent } from '@component/persona-show/persona-table/persona-table.component';
import { PersonaSearchComponent } from '@component/persona-show/persona-search/persona-search.component';

import { RdPersonaAdminComponent } from '@component/registro-docente/persona-admin/persona-admin.component';
import { RdPersonaFieldsetComponent } from '@component/registro-docente/persona-fieldset/persona-fieldset.component';

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

    LabelPipe, ToDatePipe, ToTimePipe, SiNoPipe, SummaryPipe, StoragePipe,

    DialogAlertComponent,
    InputAutocompleteComponent,
    InputSelectComponent,
    InputSearchGoComponent,
    MenuComponent,
    SearchAllComponent,
    LabelComponent,

    ComisionShowComponent, ComisionTableComponent, ComisionSearchComponent, ComisionSearchParamsComponent,
    PersonaAdminComponent, PersonaFieldsetComponent,
    PersonaShowComponent, PersonaTableComponent, PersonaSearchComponent,
    RdPersonaAdminComponent, RdPersonaFieldsetComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
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

    MaterialFileInputModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition:"top", horizontalPosition:"right"}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},

    DataDefinitionService, 
    SessionStorageService, 
    ParserService, 
    ValidatorsService,
    
    DataDefinitionLoaderService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
