import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
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
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';

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

  config: FormArrayConfig = new TableDynamicConfig(
    {
      title:"Comisiones",
      optColumn: [
        {
          config:new RouteIconConfig({
            icon: "face",
            routerLink: "alumno-comision-show",
            params: {"comision":"{{id}}"},
            color: "",
            title: "Lista de Alumnos"
           })
        },
        {
          config:new EventIconConfig({
            icon: "flight_takeoff",
            action: "transferir_alumnos_activos",
            color: "",
            title: "Transferir Alumnos Activos",
            fieldEvent: this.optField
           })
        }
      ]

    }, {
      "id": new FormControlConfig({}),
      "sed-numero": new ControlValueConfig({
        label:"Número"
      }),
      "division": new ControlValueConfig({
        label:"División"
      }),
      "planificacion": new ControlLabelConfig({
        label:"Planificacion",
        entityName:"planificacion" 
      })
    }
  )

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "cal-anio":new InputYearConfig({
        label:"Año",
        width: new FieldWidthOptions()
      }),
      "cal-semestre":new InputSelectParamConfig({
        label:"Semestre",
        options:["1","2"],
        width: new FieldWidthOptions()
      }),
      "autorizada":new InputSelectCheckboxConfig({
        label:"Autorizada",
        width: new FieldWidthOptions()
      }),
      "sed-centro_educativo":new InputSelectConfig({
        label:"Centro Educativo",
        entityName:"centro_educativo",
        width: new FieldWidthOptions()
      })
    })
  }) 


  switchOptField(data: any){
    switch(data.action){
      case "transferir_alumnos_activos":
        var s = this.dd.post("transferir_alumnos_activos", "alumno_comision", data.control.value).subscribe(
          response => {
            this.response = response
            this.submitted()   
          }
        )
        this.subscriptions.add(s)
      break;
      default: super.switchOptField(data)
    }
  }



}

