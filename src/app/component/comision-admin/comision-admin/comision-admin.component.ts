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
import { FieldViewOptions } from '@class/field-view-options';

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

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"Id",
      type: "hidden",
    }),

    new FieldViewOptions({
      field:"turno",
      label:"Turno",
      type: "select_param",
      options: ['Mañana','Tarde','Noche'],
    }),

    new FieldViewOptions({
      field:"division",
      label:"Division",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldViewOptions({
      field:"comentario",
      label:"Comentario",
    }),

    new FieldViewOptions({
      field:"autorizada",
      label:"Autorizada",
      type: "checkbox",
      default: false,
    }),

    new FieldViewOptions({
      field:"apertura",
      label:"Apertura",
      type: "checkbox",
      default: false,
    }),

    new FieldViewOptions({
      field:"publicada",
      label:"Publicada",
      type: "checkbox",
      default: false,
    }),

    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),

    new FieldViewOptions({
      field:"identificacion",
      label:"Identificacion",
    }),

    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type: "autocomplete",
      entityName: "sede",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldViewOptions({
      field:"modalidad",
      label:"Modalidad",
      type: "select",
      entityName: "modalidad",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type: "select",
      entityName: "planificacion",
    }),

    new FieldViewOptions({
      field:"comision_siguiente",
      label:"Comision Siguiente",
      type: "autocomplete",
      entityName: "comision",
    }),

    new FieldViewOptions({
      field:"calendario",
      label:"Calendario",
      type: "autocomplete",
      entityName: "calendario",
      validators: [Validators.required],
      asyncValidators: [],
    }),

  ];  
}

