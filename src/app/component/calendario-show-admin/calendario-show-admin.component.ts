import { Component } from '@angular/core';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { ShowAdminComponent } from '@component/show/show-admin.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputYearConfig } from '@component/input-year/input-year.component';

@Component({
  selector: 'app-calendario-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class CalendarioShowAdminComponent extends ShowAdminComponent {

  readonly entityName: string = "calendario";

  config: FormArrayConfig = new TableDynamicConfig(
    {
      title:"Calendario",
    }, {
      "id": new FormControlConfig(),
      "inicio": new InputDateConfig(),
      "fin": new InputDateConfig(),
      "anio": new InputYearConfig(),
      "semestre": new InputTextConfig(),
      "descripcion": new InputTextConfig()
    }
  )

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "anio": new InputYearConfig(),
      "semestre": new InputTextConfig(),
    })
  }) 
}

