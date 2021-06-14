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
import { FieldControlOptions, FieldInputSelectParamOptions } from '@class/field-type-options';

@Component({
  selector: 'app-comision-admin',
  templateUrl: './comision-admin.component.html',
})
export class ComisionAdminComponent extends AdminComponent {

  readonly entityName: string = "comision";

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
      options: ['Mañana','Tarde','Vespertino'],
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
      control: new FieldControlOptions({default:false})
    }),

    new FieldViewOptions({
      field:"apertura",
      label:"Apertura",
      type: "checkbox",
      control: new FieldControlOptions({default:false})
    }),

    new FieldViewOptions({
      field:"publicada",
      label:"Publicada",
      type: "checkbox",
      control: new FieldControlOptions({default:false})
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

    new FieldViewOptions({
      field:"estado",
      label:"Estado",
      type: new FieldInputSelectParamOptions({options:['Confirma','Rectifica','Desdobla','Reagrupa']}),
      control: new FieldControlOptions({default:"Confirma"})
    }),
    new FieldViewOptions({
      field:"configuracion",
      label:"Configuracion",
      type: new FieldInputSelectParamOptions({options:['Histórica','Nueva']}),
      control: new FieldControlOptions({default:"Histórica"})
    }),

  ];  
}

