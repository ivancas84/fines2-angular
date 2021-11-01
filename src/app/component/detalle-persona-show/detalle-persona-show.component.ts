import { Component } from '@angular/core';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { ControlDateConfig } from '@component/control-date/control-date.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { DownloadConfig } from '@component/download/download.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';

@Component({
  selector: 'app-detalle-persona-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class DetallePersonaShowComponent extends ShowComponent {

  readonly entityName: string = "detalle_persona";

  config: FormArrayConfig = new TableDynamicConfig({
    title:"Detalle Persona"
  }, {
    "per-nombres": new ControlValueConfig({
    }),
    "per-apellidos": new ControlValueConfig({
    }),
    "descripcion": new ControlValueConfig({
    }),
    "fecha": new ControlDateConfig({
    }),
    "archivo": new DownloadConfig({
    })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "persona":new InputAutocompleteConfig({}),
    })
  }) 

  ngOnInit(){

    this.config.optTitle.push(
      {
        config: new RouteIconConfig({
          icon: "mode_edit", 
          title:"Editar",
          routerLink: "detalle-persona-show-admin",
        }),
        control:this.form
      },
    )

    super.ngOnInit();

  }

  initParams(params: any){ 
    this.params = params; 
    this.config.optTitle[2].config.params = this.params
  }
}

