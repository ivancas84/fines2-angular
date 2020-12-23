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
  selector: 'app-comision-admin',
  templateUrl: './comision-admin.component.html',
})
export class ComisionAdminComponent extends AdminComponent {

  readonly entityName: string = "comision";

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
      field:"turno",
      label:"Turno",
      type: "select_param",
      options: ['Mañana','Tarde','Noche'],
    }),

    new FieldControl({
      field:"division",
      label:"Division",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldControl({
      field:"comentario",
      label:"Comentario",
    }),

    new FieldControl({
      field:"autorizada",
      label:"Autorizada",
      type: "checkbox",
      default: false,
    }),

    new FieldControl({
      field:"apertura",
      label:"Apertura",
      type: "checkbox",
      default: false,
    }),

    new FieldControl({
      field:"publicada",
      label:"Publicada",
      type: "checkbox",
      default: false,
    }),

    new FieldControl({
      field:"observaciones",
      label:"Observaciones",
    }),

    new FieldControl({
      field:"identificacion",
      label:"Identificacion",
    }),

    new FieldControl({
      field:"sede",
      label:"Sede",
      type: "autocomplete",
      entityName: "sede",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldControl({
      field:"modalidad",
      label:"Modalidad",
      type: "select",
      entityName: "modalidad",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldControl({
      field:"planificacion",
      label:"Planificacion",
      type: "select",
      entityName: "planificacion",
    }),

    new FieldControl({
      field:"comision_siguiente",
      label:"Comision Siguiente",
      type: "autocomplete",
      entityName: "comision",
    }),

    new FieldControl({
      field:"calendario",
      label:"Calendario",
      type: "autocomplete",
      entityName: "calendario",
      validators: [Validators.required],
      asyncValidators: [],
    }),

  ];  
}

