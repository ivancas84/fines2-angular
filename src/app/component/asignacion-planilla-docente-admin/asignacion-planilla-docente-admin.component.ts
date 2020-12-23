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
import { FieldControl } from '@class/field-control';

@Component({
  selector: 'app-asignacion-planilla-docente-admin',
  templateUrl: './asignacion-planilla-docente-admin.component.html',
})
export class AsignacionPlanillaDocenteAdminComponent extends AdminComponent {

  readonly entityName: string = "asignacion_planilla_docente";

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

  fieldsControl: FieldControl[] = [
    new FieldControl({
      field:"id",
      label:"Id",
      type: "hidden",
    }),

    new FieldControl({
      field:"planilla_docente",
      label:"Planilla Docente",
      type: "autocomplete",
      entityName: "planilla_docente",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldControl({
      field:"toma",
      label:"Toma",
      type: "autocomplete",
      entityName: "toma",
      validators: [Validators.required],
      asyncValidators: [],
    }),

  ];  
}

