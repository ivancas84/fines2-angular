import { Component } from '@angular/core';
import { FormArrayConfig, FormGroupConfig } from '@class/reactive-form-config';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { TableComponent } from '@component/structure/table.component';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: '../../core/component/structure/table.component.html',
})

export class CalendarioAdminArrayComponent extends TableComponent {

  override entityName: string = "calendario";

  override config: FormArrayConfig = new FormArrayConfig({
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


  
  
