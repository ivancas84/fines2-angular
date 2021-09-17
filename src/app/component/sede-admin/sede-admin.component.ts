import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigFormGroupFactory, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { TextareaConfig } from '@component/textarea/textarea.component';

@Component({
  selector: 'app-comision-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class SedeAdminComponent extends AdminComponent {
  readonly entityName: string = "sede"; 
  
  form: FormGroup = this.fb.group({})
  
  config: FormStructureConfig = new FormStructureConfig({
    title:"Sede"

  },{
    "sede": new FieldsetDynamicConfig(
      {
        title:"Sede",
      }, {
        "id": new FormControlConfig(),
        "numero": new InputTextConfig(),
        "nombre": new InputTextConfig(),
        "observaciones": new TextareaConfig(),
        "centro_educativo": new InputSelectConfig(),

      }
    ),

    "dom": new FieldsetDynamicConfig(
      {
        title:"Domicilio",
      }, {
        "id": new FormControlConfig(),
        "calle": new InputTextConfig(),
        "entre": new InputTextConfig(),
        "numero": new InputTextConfig(),
        "piso": new InputTextConfig(),
        "departamento": new InputTextConfig(),
        "barrio": new InputTextConfig(),
        "localidad": new InputTextConfig(),
      }
    ),
  })
  
  ngOnInit() {
    var fgc = new ConfigFormGroupFactory(this.config.controls["sede"])
    this.form.addControl("sede", fgc.formGroup())
    var fgc = new ConfigFormGroupFactory(this.config.controls["dom"])
    this.form.addControl("dom", fgc.formGroup())
    super.ngOnInit()
  }
}

