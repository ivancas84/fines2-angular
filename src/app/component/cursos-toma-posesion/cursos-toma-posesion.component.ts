import { Component } from '@angular/core';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig } from '@class/reactive-form-config';
import { ControlDateConfig } from '@component/control-date/control-date.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { RouteTextConfig } from '@component/route-text/route-text.component';
import { TableComponent } from '@component/structure/table.component';

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
    "com_sed-numero": new FormControlConfig,
    "com-division": new FormControlConfig,
    "com_pla-anio": new FormControlConfig,
    "com_pla-semestre": new FormControlConfig,
    "com_sed-nombre": new ControlValueConfig,
    "com_sed-domicilio": new ControlLabelConfig,
    "numero": new ControlValueConfig,
    "asi-nombre": new ControlValueConfig,
    "horario": new ControlValueConfig,
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





}


  
  
