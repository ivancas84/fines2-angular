import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-toma-posesion',
  templateUrl: '../../core/component/show/show.component.html',
})
export class CursosTomaPosesionComponent extends ShowComponent {
  
  readonly entityName: string = "curso";

  config: FormArrayConfig = new TableDynamicConfig(
    {
      title:"Seleccione un Curso para tomar posesión",
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
      ]

    }, {
      "id": new FormControlConfig({}),
      "com_sed-numero": new ControlValueConfig,
      "com_sed-nombre": new ControlValueConfig,
    }
  )


  // queryData(): Observable<any>{
  //   return this.dd.post("ids", this.entityName, this.display$.value).pipe(
  //     switchMap(
  //       ids => this.ddrf.getAllConfig(this.entityName, ids, this.config.controls)
  //     ),
  //     switchMap(
  //       data => {
  //         return this.dd.postAllConnection(data, "info", "id", "comision","alumnos_aprobados_comision",{"cantidad_aprobados":"cantidad_aprobados"})
  //       }
  //     ),
      
  //   )
  // }

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

