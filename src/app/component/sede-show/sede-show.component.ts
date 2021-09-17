import { Component } from '@angular/core';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { InputTextConfig } from '@component/input-text/input-text.component';

@Component({
  selector: 'app-sede-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class SedeShowComponent extends ShowComponent {

  readonly entityName: string = "sede";

  config: FormArrayConfig = new TableDynamicConfig(
    {
      title:"Sedes",
    }, {
      "id": new FormControlConfig({}),
      "numero": new ControlValueConfig(),
      "nombre": new ControlValueConfig(),
      "domicilio": new ControlLabelConfig(),
      "centro_educativo": new ControlLabelConfig()
    }
  )

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "search":new InputTextConfig(),
      "numero":new InputTextConfig(),
      "centro_educativo":new InputSelectConfig(),
    })
  }) 
}

