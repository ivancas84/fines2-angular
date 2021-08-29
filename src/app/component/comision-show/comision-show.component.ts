import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormGroupConfig, FormStructureConfig } from '@class/reactive-form-config';
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

@Component({
  selector: 'app-comision-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class ComisionShowComponent extends ShowComponent {

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

  
  readonly entityName: string = "comision";

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "sed-numero": new ControlValueConfig({
      label:"Número"
    }),
    "division": new ControlValueConfig({
      label:"División"
    })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "cal-anio":new InputYearConfig({
        label:"Año",
        width: new FieldWidthOptions()
      })
    })
  }) 

  ngOnInit(){
    super.ngOnInit()
  }

}

