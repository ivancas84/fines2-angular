import { Component } from '@angular/core';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { AdminArrayComponent } from '@component/show/admin-array.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';

@Component({
  selector: 'app-calendario-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class CalendarioAdminArrayComponent extends AdminArrayComponent {

  readonly entityName: string = "calendario";

  config: FormArrayConfig = new TableDynamicConfig(
    {
      title:"Calendario",
    }, {
      "id": new ControlValueConfig,
      "inicio": new InputDateConfig,
      "fin": new InputDateConfig,
      "anio": new InputYearConfig,
      "semestre": new InputTextConfig,
      "descripcion": new InputTextConfig
    }
  )

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "anio": new InputYearConfig(),
      "semestre": new InputTextConfig(),
    })
  }) 
}

