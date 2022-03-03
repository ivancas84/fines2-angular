import { Component } from '@angular/core';
import { FormArrayConfig } from '@class/reactive-form-config';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { AdminArrayComponent } from '@component/show/admin-array.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';

@Component({
  selector: 'app-modalidad-admin-array',
  templateUrl: '../../core/component/show/show.component.html',
})
export class ModalidadAdminArrayComponent extends AdminArrayComponent {

  readonly entityName: string = "modalidad";

  config: FormArrayConfig = new TableDynamicConfig(
    {
      title:"Modalidad",
    }, {
      "id": new ControlValueConfig,
      "nombre": new InputTextConfig,
    }
  )


}

