import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';

@Component({
  selector: 'app-designacion-admin-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class DesignacionAdminShowComponent extends ShowComponent {

  readonly entityName: string = "designacion";

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "id": new FormControlConfig({}),
    "per-id": new FormControlConfig({}),
    "per-nombres": new InputTextConfig({
      label:"Nombres"
    }),
    "per-apellidos": new InputTextConfig({
      label:"Apellidos"
    }),
    "per-telefono": new InputTextConfig({
      label:"Telefono"
    }),
    "cargo": new InputSelectConfig({
      label:"Cargo",
      entityName:"cargo"
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
  
  optFooter: AbstractControlViewOption[] = [ //opciones de componente
    { //boton aceptar
      config: new EventButtonConfig({
        text: "Aceptar", 
        action: "submit",
        color: "primary",
        fieldEvent: this.optField
      }),
    },
    { //boton agregar
      config: new EventIconConfig({
        icon: "add", //texto del boton
        action: "add", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.config.optField
      })
    },
    { //boton volver
      config: new EventIconConfig({
        icon: "arrow_back", //texto del boton
        action: "back", //accion del evento a realizar
        color: "accent",
        fieldEvent: this.optField
      })
    },
    { //boton reset
      config: new EventIconConfig({
        icon: "autorenew", //texto del boton
        action: "reset", //accion del evento a realizar
        color: "accent",
        fieldEvent: this.optField
      })
    },
   ]

}

