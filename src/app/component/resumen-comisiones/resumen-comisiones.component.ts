import { Component } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Display } from '@class/display';
import { FormArrayConfig } from '@class/reactive-form-config';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { ArrayComponent } from '@component/structure/array.component';
import { TableComponent } from '@component/structure/table.component';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-resumen-comisiones',
  templateUrl: './resumen-comisiones.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #42A948; /* green */
    }
  `],
})
export class ResumenComisionesComponent extends TableComponent {

  override readonly entityName: string = "curso";


  override initDisplay() {
    var display = new Display();
    display.setParams({"com_cal-anio":"2022","com_cal-semestre":1,"com-autorizada":true})
    display.setSize(100);
    display.setOrder({"com_sed-numero":"asc", "com_sed-nombre":"asc"})
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  override queryData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.getAll("curso", ids)
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "comision", {"division":"division", "sede":"sede","planificacion":"planificacion"}, "comision")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "sede", {"nombre":"nombre", "numero":"numero", "domicilio":"domicilio"}, "sede")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "domicilio", {"calle":"calle", "entre":"entre", "dom_numero":"numero"}, "domicilio")
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_horario",{"horario":"horario"},"id","curso")
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_toma_activa",{"toma":"toma_activa"},"id","curso")
      ),
      switchMap(
        data =>   this.dd.getAllConnection(data, "toma",{"docente":"docente"},"toma")
      ),
      switchMap(
        data =>   this.dd.getAllConnection(data, "planificacion", {"anio":"anio","semestre":"semestre","plan":"plan"},"planificacion")
      ),
      switchMap(
        data =>   this.dd.getAllConnection(data, "plan", {"orientacion":"orientacion"},"plan")
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["sede"] = element["numero"] + " " + element["nombre"]
            element["comision"] =  element["numero"] + "/" + element["anio"] + element["semestre"]
            element["tramo"] =  element["anio"] + "º" + element["semestre"] + "º " + element["orientacion"]
            element["domicilio"] =  element["calle"] + " e/ " + element["entre"] + " nº " + element["dom_numero"]
          })
          return data;
        }
      ),
   
    )
  }

  override config: FormArrayConfig = new FormArrayConfig({}, {
    "sede": new ControlValueConfig,
    "comision": new ControlValueConfig,
    "tramo": new ControlValueConfig,
    "asignatura": new ControlLabelConfig,
    "docente": new ControlLabelConfig({entityName:"persona"}),
  })




}


  
  
