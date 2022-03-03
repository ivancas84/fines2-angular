import { Component } from '@angular/core';
import { FormArrayConfig, FormControlConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { Display } from '@class/display';
import { RouteTextConfig } from '@component/route-text/route-text.component';

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
          config:new RouteTextConfig({
            text: "Toma Posesión",
            routerLink: "toma-posesion-email-abc",
            params: {"curso":"{{id}}"},
            color: "",
            title: "Administrar comisión"
           })
        },
      ]

    }, {
      "id": new FormControlConfig({}),
      "com_sed-numero": new FormControlConfig,
      "com-division": new FormControlConfig,
      "com_pla-anio": new FormControlConfig,
      "com_pla-semestre": new FormControlConfig,
      "com_sed-nombre": new ControlValueConfig,
      "com_sed-domicilio": new ControlLabelConfig,
      "numero": new ControlValueConfig,
      "asi-nombre": new ControlValueConfig,
      "horario": new ControlValueConfig,
    }
  )



  initDisplay() {
    /** 
     * se ignora el atributo this.params y se asignan parametros manualmente
     */
    var display = new Display();
    display.setSize(0);
    display.setParamsByQueryParams(
      {
        "com_cal-anio":2022, 
        "com_cal-semestre":1, 
        "com-autorizada":true 
      }
    );
    display.setOrder({
      "com_sed-numero":"ASC",
      "com-division":"ASC",
    })
    this.display$.next(display)
  }


  queryData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.ddrf.getAllConfig(this.entityName, ids, this.config.controls)
      ),
      switchMap(
        data => {
          return this.dd.postAllConnection(data, "info", "id", "curso","curso_horario",{"horario":"horario"})
        }
      ),
      map(
        data =>{
          data.forEach(value => {
            value["numero"] = value["com_sed-numero"] + value["com-division"] + "/" + value["com_pla-anio"] + value["com_pla-semestre"] 
          })
          return data;
        }

      )
    )
  }

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

