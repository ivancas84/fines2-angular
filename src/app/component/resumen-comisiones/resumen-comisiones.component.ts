import { Component } from '@angular/core';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig } from '@class/reactive-form-config';
import { ControlDateConfig } from '@component/control-date/control-date.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { TableComponent } from '@component/structure/table.component';
import { map, Observable, of, switchMap } from 'rxjs';
import { ListaComisionesComponent } from './lista-comisiones.component';

@Component({
  selector: 'app-resumen-comisiones',
  templateUrl: './resumen-comisiones.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  /* .highlight{
      background: #ff9999; 
    } */
  `],
})
export class ResumenComisionesComponent extends ListaComisionesComponent {
  /**
   * Visualizar cursos que no tienen toma activa
   */

  override initDisplay() {
    var display = new Display();
    display.setParams({"com_cal-anio":"2022","com_cal-semestre":1,"com-autorizada":true,"com-modalidad":1})
    display.setSize(100);
    display.setOrder({"com_sed-numero":"asc", "com_sed-nombre":"asc","com_pla-anio":"asc","com_pla-semestre":"asc"})
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  override formatData(data: { [x: string]: string; }[]): { [x: string]: string; }[]{
    var d: { [x: string]: string; }[] = []
    data.forEach((element: { [x: string]: string; }) => {
      element["sede"] =  element["nombre"] + " (" + element["numero"] + ")"
      element["comision"] =  element["numero"] + element["division"] + "/" + element["anio"] + element["semestre"]
      element["tramo"] =  element["anio"] + "º" + element["semestre"] + "º " + element["orientacion"]
      element["domicilio"] =  element["calle"] + " e/ " + element["entre"] + " nº " + element["dom_numero"] + " " + element["barrio"]
      if(!element["toma"]) d.push(element)
    })
    return d;
  }

  override config: FormArrayConfig = new FormArrayConfig({
    "id": new FormControlConfig,
    "ige": new ControlValueConfig,
    "sede": new ControlValueConfig,
    "domicilio": new ControlValueConfig,
    "comision": new ControlValueConfig,
    "tramo": new ControlValueConfig,
    "asignatura": new ControlLabelConfig,
    "horario": new ControlValueConfig,
    // "docente": new ControlLabelConfig({entityName:"persona"}),
    "docente": new FormControlConfig(),
  })



  // override optColumn: FormControlConfig[] = [
  //   new LinkTextConfig(
  //     {label:'Editar ige', url:'curso-admin', params:{'id':'{{id}}'}}
  //   ),
  // ]




}


  
  
