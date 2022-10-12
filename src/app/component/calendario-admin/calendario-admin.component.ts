import { Component } from '@angular/core';
import { FormGroupConfig } from '@class/reactive-form-config';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { DetailComponent } from '@component/structure/detail.component';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: '../../core/component/structure/detail.component.html',
})

export class CalendarioAdminComponent extends DetailComponent {

  override entityName: string = "calendario";

  override config: FormGroupConfig = new FormGroupConfig({
    inicio: new InputDateConfig,
    fin: new InputDateConfig,
    anio: new InputYearConfig,
    semestre: new InputTextConfig({type:"number"}),
    descripcion: new InputTextConfig(),
  })


  override optFooter: AbstractControlViewOption[] = [
    {
      config: new EventButtonConfig({
        text: "Aceptar", //texto del boton
        action: "submit", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
    },
  ];

}


  
  
