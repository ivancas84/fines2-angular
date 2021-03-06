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
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FieldControlOptions } from '@class/field-type-options';

@Component({
  selector: 'app-asignacion-planilla-docente-admin',
  templateUrl: './asignacion-planilla-docente-admin.component.html',
})
export class AsignacionPlanillaDocenteAdminComponent extends AdminComponent {

  readonly entityName: string = "asignacion_planilla_docente";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"Id",
      type: "hidden",
    }),

    new FieldViewOptions({
      field:"comentario",
      label:"Comentario",
    }),

    new FieldViewOptions({
      field:"reclamo",
      label:"Reclamo",
      type: "checkbox",
      control: new FieldControlOptions({default:false})
    }),

    new FieldViewOptions({
      field:"planilla_docente",
      label:"Planilla Docente",
      type: "autocomplete",
      entityName: "planilla_docente",
      adminRoute: "planilla-docente-admin",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldViewOptions({
      field:"toma",
      label:"Toma",
      type: "autocomplete",
      entityName: "toma",
      validators: [Validators.required],
      asyncValidators: [],
    }),

  ];  
}

