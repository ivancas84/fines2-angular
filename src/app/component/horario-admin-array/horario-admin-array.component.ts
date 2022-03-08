import { Component } from '@angular/core';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { AdminArrayComponent } from '@component/show/admin-array.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTimepicker2Component, InputTimepicker2Config } from '@component/input-timepicker2/input-timepicker2.component';



@Component({
  selector: 'app-horario-admin-array',
  templateUrl: '../../core/component/show/show.component.html',
})
export class HorarioAdminArrayComponent extends AdminArrayComponent {

  entityName = "horario"

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "curso": new InputAutocompleteConfig,
    "dia": new InputSelectConfig,
    "hora_inicio": new InputTimepicker2Config,
    "hora_fin": new InputTimepicker2Config,
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "curso":new InputAutocompleteConfig,
      "cur-comision":new InputAutocompleteConfig,

    })
  }) 

}

  