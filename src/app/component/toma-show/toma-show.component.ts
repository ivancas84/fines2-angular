import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { DataDefinitionRelFieldsService } from '@service/data-definition/data-definition-rel-fields.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Location } from '@angular/common';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlDateConfig } from '@component/control-date/control-date.component';

@Component({
  selector: 'app-toma-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class TomaShowComponent extends ShowComponent {

  constructor(
    protected dd: DataDefinitionToolService, 
    protected route: ActivatedRoute, 
    protected dialog: MatDialog,
    protected storage: SessionStorageService,
    protected ddrf: DataDefinitionRelFieldsService,
    protected fc: FormConfigService,
    protected router: Router, 
    protected snackBar: MatSnackBar,
    protected location: Location, 
    protected validators: ValidatorsService,
    protected fb: FormBuilder

  ) {
    super(dd, route, dialog, storage, ddrf, fc, router, snackBar, location, validators, fb)
  }
  
  readonly entityName: string = "toma";

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "fecha_toma": new ControlDateConfig({
      label:"Fecha Toma"
    }),
    "estado": new ControlValueConfig({
      label:"Estado"
    }),
    "tipo_movimiento": new ControlValueConfig({
      label:"Tipo movimiento"
    }),
    "estado_contralor": new ControlValueConfig({
      label:"Estado Contralor" 
    }),
    "curso": new ControlLabelConfig({
      label:"Curso",
      entityName:"curso"
    }),
    "docente": new ControlLabelConfig({
      label:"Docente",
      entityName:"persona"
    }),
    "doc-telefono": new ControlValueConfig({
      label:"Telefono",
    }),
    "doc-email": new ControlValueConfig({
      label:"Email",
    }),
    // "activo": new ControlBooleanConfig({
    //   label:"Activo"
    // })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "cur_com_cal-anio":new InputYearConfig({
        label:"Año",
        width: new FieldWidthOptions()
      }),
      "cur_com_cal-semestre":new InputTextConfig({
        label:"Semestre",
        width: new FieldWidthOptions()
      }),
    })
  }) 

}

  