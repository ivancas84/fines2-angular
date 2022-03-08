import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';

@Component({
  selector: 'app-comision-relacionada-show-ad',
  templateUrl: '../../core/component/show/show.component.html',
})
export class ComisionRelacionadaAdminArrayComponent extends ShowComponent {

  readonly entityName: string = "comision_relacionada";

  config: FormArrayConfig = new TableDynamicConfig({
    optColumn: [ //columna opciones
      {  //boton eliminar 
         config: new EventIconConfig({
           action:"remove",
           color: "accent",
           icon:"delete"
         }),
       }
     ]
    }, {
      "id": new FormControlConfig({
      }),
      "comision": new InputAutocompleteConfig({
        label:"Comisión",
        entityName:"comision"
      }),
      "relacion": new InputAutocompleteConfig({
        label:"Relación",
        entityName:"comision"
      }),
      "_mode": new FormControlConfig({
      }),
    }
  )

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "comision":new InputAutocompleteConfig({
        label:"Comisión",
        entityName:"comision",
        width: new FieldWidthOptions()
      }),
      "relacion":new InputAutocompleteConfig({
        label:"Relación",
        entityName:"comision",
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


  ngOnInit(){
    this.config.optColumn[0].config.fieldEvent = this.config.optField
    super.ngOnInit()
  }
  

 
}

