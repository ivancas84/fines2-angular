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

@Component({
  selector: 'app-planilla-docente-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class PlanillaDocenteAdminComponent extends AdminComponent {

  readonly entityName: string = "planilla_docente";
  title:string = "Planilla Docente"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"Id",
      type: "hidden",
    }),

    new FieldViewOptions({
      field:"numero",
      label:"Numero",
      validators: [Validators.required],
      asyncValidators: [],
    }),

    new FieldViewOptions({
      field:"fecha_contralor",
      label:"Fecha Contralor",
      type: "date",
    }),

    new FieldViewOptions({
      field:"fecha_consejo",
      label:"Fecha Consejo",
      type: "date",
    }),

    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),

  ];  
}

