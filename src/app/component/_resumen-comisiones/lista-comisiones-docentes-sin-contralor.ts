import { Component } from '@angular/core';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig } from '@class/reactive-form-config';
import { ControlDateConfig } from '@component/control-date/control-date.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { TableComponent } from '@component/structure/table.component';
import { arrayUniqueColumn } from '@function/array-unique-column';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-lista-comisiones-docentes-sin-contralor',
  templateUrl: './resumen-comisiones.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  `],
})
export class ListaComisionesDocentesSinContralorComponent extends TableComponent {

  override readonly entityName: string = "curso";

  override initDisplay() {
    var display = new Display();
    display.setParams(
      {"com_cal-anio":"2022","com_cal-semestre":1,"com-autorizada":true}
    )
    display.setSize(100);
    display.setOrder({"com_sed-numero":"asc", "com_sed-nombre":"asc","com_pla-anio":"asc","com_pla-semestre":"asc","comision":"asc"})
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  override initData(): Observable<any>{
    if(this.length === 0) return of([]); 
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.getAll("curso", ids)
      ),
      switchMap(
        data => this.dd.getMergeAll({ data, entityName: "comision", fields: { "identificacion": "identificacion", "division": "division", "sede": "sede", "planificacion": "planificacion" }, fkName: "comision" })
      ),
      switchMap(
        data => this.dd.getMergeAll({ data, entityName: "sede", fields: { "nombre": "nombre", "numero": "numero", "domicilio": "domicilio" }, fkName: "sede" })
      ),
      switchMap(
        data => this.dd.getMergeAll({ data, entityName: "domicilio", fields: { "calle": "calle", "entre": "entre", "dom_numero": "numero", "barrio": "barrio" }, fkName: "domicilio" })
      ),
      switchMap(
        data =>   this.dd.postMergeAll({ data, method: "info", entityName: "curso_horario", fields: { "horario": "horario" }, fieldNameData: "id", fieldNameResponse: "curso" })
      ),
      switchMap(
        data =>   this.dd.postMergeAll({ data, method: "info", entityName: "curso_toma_activa", fields: { "toma": "toma_activa" }, fieldNameData: "id", fieldNameResponse: "curso" })
      ),
      switchMap(
        data =>   this.docentesNoPasados(data)
      ),
      switchMap(
        data =>   this.dd.getMergeAll({ data, entityName: "planificacion", fields: { "anio": "anio", "semestre": "semestre", "plan": "plan" }, fkName: "planificacion" })
      ),
      switchMap(
        data =>   this.dd.getMergeAll({ data, entityName: "plan", fields: { "orientacion": "orientacion" }, fkName: "plan" })
      ),
      switchMap(
        data =>   {
           return this.dd.postMergeAll({ data, method: "info", entityName: "cantidad_alumnos_activos_comision", fields: { "cantidad_alumnos": "cantidad" }, fieldNameData: "comision", fieldNameResponse: "comision" })
        }
      ),
      map(
        data => {
          return this.formatData(data)
        }
      ),
    )
  }

  docentesNoPasados(data: { [x: string]: string; }[]){
    var display = new Display()
    var idCurso_ = arrayUniqueColumn(data,"id")
    display.setCondition([
      ["reclamo","=",false],
      ["tom-estado","=",["Aprobada","Renuncia"]],
      ["tom-curso","=", idCurso_]
    ])

    return this.dd.all("asignacion_planilla_docente",display).pipe(
      switchMap(
        asignacion_planilla_docente_ => {
          var idToma_ = arrayUniqueColumn(asignacion_planilla_docente_,"toma")
          var d = new Display()
          d.setCondition([
            ["id","!=",idToma_],
            ["curso","=",idCurso_]
          ])
          return this.dd.all("toma",d)
        }
      ),
      map(
        toma_ => {
          for(var j = 0; j < toma_.length; j++){
            for(var i = 0; i < data.length; i++){
              if(data[i]["id"] == toma_[j]["curso"]) {
                  data[i]["docente"] = toma_[j]["docente"];
                  data[i]["fecha_toma"] = toma_[j]["fecha_toma"];
                break;
              }
            }
          }
          return data;
        }
      )
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

  override config: FormArrayConfig = new FormArrayConfig({
    "id": new ControlLabelConfig({entityName:"curso"}),
    "fecha_toma": new ControlDateConfig,
    //"ige": new ControlValueConfig,
    "sede": new ControlValueConfig,
    "domicilio": new ControlValueConfig,
    "identificacion": new ControlValueConfig,
    "comision": new FormControlConfig,
    "comision_label": new ControlValueConfig,
    "tramo": new ControlValueConfig,
    "cantidad_alumnos": new ControlValueConfig,
    "asignatura": new ControlLabelConfig,
    "horario": new ControlValueConfig,
    "docente": new ControlLabelConfig({entityName:"persona"}),
  })



  override optColumn: FormControlConfig[] = [
    // new LinkTextConfig(
    //   {label:'Editar ige', url:'curso-admin', params:{'id':'{{id}}'}}
    // ),
    new RouteIconConfig(
      {icon: "person", routerLink:'resumen-alumnos', params:{'comision':'{{comision}}'}}
    ),
    new RouteIconConfig(
      {icon: "person_outline", routerLink:'resumen-alumnos', params:{'comision':'{{comision}}', activo:'true'}}
    ),
  ]




}


  
  
