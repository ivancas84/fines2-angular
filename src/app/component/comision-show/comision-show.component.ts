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
import { DataDefinitionFkAllService } from '@service/data-definition/data-definition-fk-all.service';
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
import { InputTextConfig } from '@component/input-text/input-text.component';

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
    protected ddrf: DataDefinitionFkAllService,
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
            icon: "edit",
            routerLink: "comision-admin",
            params: {"id":"{{id}}"},
            color: "",
            title: "Administrar comisión"
           })
        },
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
          config:new RouteIconConfig({
            icon: "school",
            routerLink: "toma-show",
            params: {"cur-comision":"{{id}}"},
            color: "",
            title: "Toma de posesión"
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
        },
        {
          config:new EventIconConfig({
            icon: "update",
            action: "actualizar_plan_alumnos",
            color: "",
            title: "Actualizar plan de alumnos",
            fieldEvent: this.optField
           })
        },
        {
          config:new EventIconConfig({
            icon: "grade",
            action: "generar_calificacion_alumnos",
            color: "",
            title: "Generar Calificación de alumnos",
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
      }),
      "cal-semestre":new InputSelectParamConfig({
        label:"Semestre",
        options:["1","2"],
      }),
      "autorizada":new InputSelectCheckboxConfig({
        label:"Autorizada",
      }),
      "modalidad":new InputSelectConfig({
      }),
     
      "sed-centro_educativo":new InputSelectConfig({
      }),

      "sed-numero":new InputTextConfig({
        label:"Número Sede",
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
      case "actualizar_plan_alumnos":
        var s = this.dd.post("actualizar_plan_alumnos", "actualizar_plan_alumnos", data.control.value).subscribe(
          response => {
            this.response = response
            this.submitted()   
          }
        )
        this.subscriptions.add(s)
      break;
      case "generar_calificacion_alumnos":
        var s = this.dd.post("generar_calificacion_alumnos", "calificacion", data.control.value).subscribe(
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

