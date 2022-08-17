import { Component } from '@angular/core';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig } from '@class/reactive-form-config';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { RouteTextConfig } from '@component/route-text/route-text.component';
import { TableComponent } from '@component/structure/table.component';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'core-table',
  templateUrl: '../../core/component/structure/table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesionComponent extends TableComponent {

  override readonly entityName: string = "curso";

  override title: string = "Seleccione un curso para Tomar Posesión"

  override config: FormArrayConfig = new FormArrayConfig({
    "id": new FormControlConfig,
    "sede": new ControlValueConfig,
    "comision_label": new ControlValueConfig,
    "domicilio": new ControlValueConfig,
    "nombre_asignatura": new ControlValueConfig,
    "tramo": new ControlValueConfig,
    "horario": new ControlValueConfig,

    //"asi-nombre": new ControlValueConfig,
  })

  override optColumn: FormControlConfig[] = [
    new RouteTextConfig({
      text: "Toma Posesión",
      routerLink: "toma-posesion-email-abc",
      params: {"curso":"{{id}}"},
      color: "",
      title: "Administrar comisión"
    })
  ]

  override initDisplay() {
    var display = new Display();
    display.setParams(
      {"com_cal-anio":"2022","com_cal-semestre":2,"com-autorizada":true}
    )
    display.setSize(0);
    display.setOrder({"com_sed-numero":"asc", "com_sed-nombre":"asc","com_pla-anio":"asc","com_pla-semestre":"asc","comision":"asc"})
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  
  override initData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.getAll("curso", ids)
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "asignatura", {"nombre_asignatura":"nombre"}, "asignatura")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "comision", {"division":"division", "sede":"sede","planificacion":"planificacion"}, "comision")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "sede", {"nombre":"nombre", "numero":"numero", "domicilio":"domicilio"}, "sede")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "domicilio", {"calle":"calle", "entre":"entre", "dom_numero":"numero","barrio":"barrio"}, "domicilio")
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_horario",{"horario":"horario"},"id","curso")
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_toma_activa",{"toma":"toma_activa"},"id","curso")
      ),
      switchMap(
        data =>   this.dd.getAllConnection(data, "planificacion", {"anio":"anio","semestre":"semestre","plan":"plan"},"planificacion")
      ),
      switchMap(
        data =>   this.dd.getAllConnection(data, "plan", {"orientacion":"orientacion"},"plan")
      ),
      map(
        data => {
          return this.formatData(data)
        }
      ),
    )
  }

  formatData(data: { [x: string]: string; }[]){
    data.forEach((element: { [x: string]: string; }) => {
      element["sede"] =  element["nombre"] + " (" + element["numero"] + ")"
      element["comision_label"] =  element["numero"] + element["division"] + "/" + element["anio"] + element["semestre"]
      element["tramo"] =  element["anio"] + "º" + element["semestre"] + "º " + element["orientacion"]
      element["domicilio"] =  element["calle"] + " e/ " + element["entre"] + " nº " + element["dom_numero"] + " " + element["barrio"]
    })
    return data;
  }





}


  
  
