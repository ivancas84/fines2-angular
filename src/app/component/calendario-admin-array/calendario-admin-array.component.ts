import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminComponent } from '@component/admin/admin.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions } from '@class/field-type-options';
import { AdminArrayComponent } from '@component/admin-array/admin-array.component';
import { FieldViewOptions } from '@class/field-view-options';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: '../../core/component/admin-array/admin-array.component.html',
})
export class CalendarioAdminArrayComponent extends AdminArrayComponent {

  readonly entityName: string = "calendario"
  title: string = "Calendario"

  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super(fb, route, router, location, dd, storage, dialog, snackBar);
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"inicio",
      label:"Inicio",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"fin",
      label:"Fin",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"anio",
      label:"Anio",
      type: new FieldInputYearOptions(),
      control: new FieldControlOptions({validators: [this.validators.year(), Validators.required],})
    }),
    new FieldViewOptions({
      field:"semestre",
      label:"Semestre",
      type: new FieldInputSelectParamOptions({options:[1,2]}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
  ];  
}

