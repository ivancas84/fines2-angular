import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';

@Component({
  selector: 'app-designacion-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class DesignacionShowComponent extends ShowComponent {

  readonly entityName: string = "designacion";

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "per-nombres": new ControlValueConfig({
      label:"Nombres"
    }),
    "per-apellidos": new ControlValueConfig({
      label:"Apellidos"
    }),
    "car-descripcion": new ControlValueConfig({
      label:"Descripcion"
    }),
    "sede": new ControlLabelConfig({
      label:"Sede",
      entityName:"sede"
    })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "per-search":new InputTextConfig({
        label:"Buscar",
        width: new FieldWidthOptions()
      }),
    })
  }) 

}

