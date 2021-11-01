import { Component } from '@angular/core';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { DownloadConfig } from '@component/download/download.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { ShowAdminComponent } from '@component/show/show-admin.component';
import { InputUploadConfig } from '@component/input-upload/input-upload.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';

@Component({
  selector: 'app-detalle-persona-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class DetallePersonaShowAdminComponent extends ShowAdminComponent {

  readonly entityName: string = "detalle_persona";

  config: FormArrayConfig = new TableDynamicConfig({
    title:"Detalle Persona",
    optTitle: [] //opciones de titulo 
  }, {
    "persona": new InputAutocompleteConfig({
    }),
    "asunto": new InputTextConfig({
    }),
    "descripcion": new InputTextConfig({
    }),
    "fecha": new InputDateConfig({
    }),
    "archivo": new InputUploadConfig({})
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
          icon: "edit_off", 
          title:"Editar",
          routerLink: "detalle-persona-show",
        }),
        control:this.form
      },
    )
    
    super.ngOnInit()
  }

  initParams(params: any){ 
    this.params = params; 
    this.config.optTitle[0].config.params = this.params
  }
 
  
}

