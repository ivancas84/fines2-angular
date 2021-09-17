import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldWidthOptions } from '@class/field-width-options';
import { ConfigFormGroupFactory, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';

@Component({
  selector: 'app-comision-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class ComisionAdminComponent extends AdminComponent {
  readonly entityName: string = "comision"; 
  
  form: FormGroup = this.fb.group({})
  
  config: FormStructureConfig = new FormStructureConfig({
    title:"Comision"

  },{
    "comision": new FieldsetDynamicConfig(
      {
        title:"Comisión",
      }, {
        "id": new FormControlConfig({}),
        "sede": new InputAutocompleteConfig({
          label:"Sede",
          entityName:"sede",
          width:new FieldWidthOptions
        }),
        "division": new InputTextConfig({
          label:"División",
          width:new FieldWidthOptions
        }),
        "planificacion": new InputSelectConfig({
          label:"Planificacion",
          entityName:"planificacion" ,
          width:new FieldWidthOptions
        }),
        "modalidad": new InputSelectConfig({
          label:"Modalidad",
          entityName:"modalidad" ,
          width:new FieldWidthOptions
        }),
        "comision_siguiente": new InputAutocompleteConfig({
          label:"Comision Siguiente",
          entityName:"comision_siguiente" ,
          width:new FieldWidthOptions
        }),
        "calendario": new InputAutocompleteConfig({
          label:"Calendario",
          entityName:"calendario" ,
          width:new FieldWidthOptions
        }),
        "turno": new InputTextConfig({
          label:"Turno",
          width:new FieldWidthOptions
        }),
        "autorizada": new InputCheckboxConfig({
          label:"Autorizada",
          width:new FieldWidthOptions
        }),
        "apertura": new InputCheckboxConfig({
          label:"Apertura",
          width:new FieldWidthOptions
        }),
        "publicada": new InputCheckboxConfig({
          label:"Publicada",
          width:new FieldWidthOptions
        }),
        "observaciones": new InputCheckboxConfig({
          label:"Observaciones",
          width:new FieldWidthOptions
        }),
      }
    )
  })

  
  
  ngOnInit() {
    var fgc = new ConfigFormGroupFactory(this.config.controls["comision"])
    this.form.addControl("comision", fgc.formGroup())

    super.ngOnInit()
  }
}

