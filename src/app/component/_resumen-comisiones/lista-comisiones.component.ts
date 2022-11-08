import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { ControlDateConfig } from '@component/control-date/control-date.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { LinkIconConfig } from '@component/link-icon/link-icon.component';
import { LinkTextConfig } from '@component/link-text/link-text.component';
import { LinkValueConfig } from '@component/link-value/link-value.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { TableComponent } from '@component/structure/table.component';
import { PDF_URL } from '@config/app.config';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-lista-comisiones',
  templateUrl: './resumen-comisiones.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  `],
})
export class ListaComisionesComponent extends TableComponent {

  override readonly entityName: string = "curso";

  override searchConfig: FormGroupConfig = new FormGroupConfig({
    "com_cal-anio":new InputYearConfig,
    "com_cal-semestre":new InputTextConfig({type:"number"}),
    "com-autorizada":new InputSelectCheckboxConfig,
  }
)



  override initDisplay() {
    var display = new Display();
    display.setParamsByQueryParams(this.params);
    display.setSize(0);
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
        data => this.dd.getMergeAll({ data, entityName: "comision", fields: { "division": "division", "sede": "sede", "planificacion": "planificacion" }, fkName: "comision" })
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
        data =>   this.dd.getMergeAll({ data, entityName: "toma", fields: { "docente": "docente", "fecha_toma": "fecha_toma" } })
      ),
      switchMap(
        data =>   this.dd.getMergeAll({ data, entityName: "persona", fields: { "telefono": "telefono" }, fkName: "docente" })
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
      element["sede"] =  element["nombre"] + " (" + element["numero"] + ")"
      element["comision_label"] =  element["numero"] + element["division"] + "/" + element["anio"] + element["semestre"]
      element["tramo"] =  element["anio"] + "º" + element["semestre"] + "º " + element["orientacion"]
      element["domicilio"] =  element["calle"] + " e/ " + element["entre"] + " nº " + element["dom_numero"] + " " + element["barrio"]
    })
    return data;
  }

  override config: FormArrayConfig = new FormArrayConfig({
    "id": new FormControlConfig,
    "toma": new FormControlConfig,
    "fecha_toma": new ControlDateConfig(),
    //"ige": new ControlValueConfig,
    "sede": new ControlValueConfig,
    "domicilio": new ControlValueConfig,
    "comision": new FormControlConfig,
    "comision_label": new ControlValueConfig,
    "tramo": new ControlValueConfig,
    "cantidad_alumnos": new ControlValueConfig,
    "asignatura": new ControlLabelConfig,
    "horario": new ControlValueConfig,
    "docente": new ControlLabelConfig({entityName:"persona"}),
    "telefono": new ControlValueConfig,
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
        new EventIconConfig(
          {icon: "assignment_turned_in", action:'generar_ticket', fieldEvent:this.optField}
        ),
        new LinkIconConfig(
          {title: "Constancia docente", icon: "insert_drive_file", action:'generar_ticket', url:PDF_URL+"constancia_docente", target:"_blank", params:{id:"{{toma}}}"}}
        ),
      ]

      override switchOptField($event: { action: any; index?: any; control?: AbstractControl}){
        switch($event.action){
          case "generar_ticket": 
            console.log($event.control!.value)
            if(!$event.control!.value["toma"]) {
              this.snackBar.open("No hay toma activa definida", "X")
              return;
            }

            var s = this.dd._post("persist","generar_ticket_toma",$event.control!.value["toma"]).subscribe(
              response => this.snackBar.open("Registro realizado", "X")
            )
            this.subscriptions.add(s)
          break;
          default: super.switchOptField($event);
        }
      }




}


  
  
