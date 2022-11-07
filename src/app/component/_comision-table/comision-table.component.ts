import { Component } from '@angular/core';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { TableComponent } from '@component/structure/table.component';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-comision-table',
  templateUrl: '../../core/component/structure/table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  `],
})
export class ComisionTableComponent extends TableComponent {

  override readonly entityName: string = "comision";

  
  override config: FormArrayConfig = new FormArrayConfig({
    "id": new FormControlConfig,
    "sede": new ControlValueConfig,
    "domicilio": new ControlValueConfig,
    "comision_label": new ControlValueConfig,
    "tramo": new ControlValueConfig,
    "horario": new ControlValueConfig,
  })

  override searchConfig: FormGroupConfig = new FormGroupConfig({
    "cal-anio":new InputYearConfig,
    "cal-semestre":new InputTextConfig({type:"number"}),
    "autorizada":new InputSelectCheckboxConfig,
  }
) 

  override initDisplay() {
    var display = new Display();
    display.setParamsByQueryParams(this.params);
    display.setSize(0);
    display.setOrder({"sed-numero":"asc", "sed-nombre":"asc","pla-anio":"asc","pla-semestre":"asc"})
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  override initData(): Observable<any>{
    if(this.length === 0) return of([]); 
    console.log("test")
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.getAll("comision", ids)
      ),
      switchMap(
        data => this.dd.getMergeAllUm(data, "sede", "sede", "designacion")
      ),
      switchMap(
        data => this.dd.getMergeAll({ data, entityName: "sede", fields: { "nombre": "nombre", "numero": "numero", "domicilio": "domicilio" }, fkName: "sede" })
      ),
      switchMap(
        data => this.dd.getMergeAll({ data, entityName: "domicilio", fields: { "calle": "calle", "entre": "entre", "dom_numero": "numero", "barrio": "barrio" }, fkName: "domicilio" })
      ),
      switchMap(
        data =>   this.dd.postMergeAll({ data, method: "info", entityName: "horarios_comision", fields: { "dias": "dias_dias", "hora_inicio": "hora_inicio", "hora_fin": "hora_fin" }, fieldNameData: "id", fieldNameResponse: "comision" })
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

  formatData(data: { [x: string]: string; }[]){
    data.forEach((element: { [x: string]: string; }) => {
      element["horario"] =  element["dias"] + " " + element["hora_inicio"] + " a " + element["hora_fin"]
      element["sede"] =  element["nombre"] + " (" + element["numero"] + ")"
      element["comision_label"] =  element["numero"] + element["division"] + "/" + element["anio"] + element["semestre"]
      element["tramo"] =  element["anio"] + "º" + element["semestre"] + "º " + element["orientacion"]
      element["domicilio"] =  element["calle"] + " e/ " + element["entre"] + " nº " + element["dom_numero"] + " " + element["barrio"]
    })
    return data;
  }




      override optColumn: FormControlConfig[] = [
        // new LinkTextConfig(
        //   {label:'Editar ige', url:'curso-admin', params:{'id':'{{id}}'}}
        // ),
        new RouteIconConfig(
          {icon: "person", routerLink:'resumen-alumnos', params:{'comision':'{{id}}'}}
        ),
        new RouteIconConfig(
          {icon: "person_outline", routerLink:'resumen-alumnos', params:{'comision':'{{id}}', activo:'true'}}
        ),
  
      ]





}


  
  
