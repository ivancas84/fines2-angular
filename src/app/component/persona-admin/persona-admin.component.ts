import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { RequiredValidatorMsg, UniqueValidatorMsg } from '@class/validator-msg';
import { AdminComponent } from '@component/detail/admin.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputTextConfig } from '@component/input-text/input-text.component';

@Component({
  selector: 'app-persona-admin',
  templateUrl: '../../core/component/detail/detail.component.html',
})
export class PersonaAdminComponent extends AdminComponent {
  readonly entityName: string = "persona"; 

  form: FormGroup = this.fb.group({
    "persona":this.fb.group({
      "numero_documento":this.fb.control(
        null,
        {
          validators:[Validators.required],
          asyncValidators:[this.validators.unique("numero_documento", "persona")]
        }
      ),
      "cuil":this.fb.control(
        null,
        {
          asyncValidators:[this.validators.unique("cuil", "persona")]
        }
      ),
      "email_abc":this.fb.control(
        null,
        {
          asyncValidators:[this.validators.unique("email_abc", "persona")]
        }
      )

    })
  })

  config: FormStructureConfig = new FormStructureConfig({
  },{
    "persona": new FieldsetDynamicConfig(
      {
        title:"Persona",
      }, {
        "id": new FormControlConfig({}),
        "nombres": new InputTextConfig,
        "apellidos": new InputTextConfig,
        "numero_documento": new InputTextConfig({
          validatorMsgs:[
            new RequiredValidatorMsg(), 
            new UniqueValidatorMsg({route:"persona-admin"})
          ]
        }),
        "cuil": new InputTextConfig({
          validatorMsgs:[
            new RequiredValidatorMsg(), 
            new UniqueValidatorMsg({route:"persona-admin"})
          ]
        }),
        "fecha_nacimiento": new InputDateConfig,
        "genero":new InputSelectParamConfig({
          options:["Femenino", "Masculino", "Otro"]
        }),
        "telefono": new InputTextConfig,
        "email": new InputTextConfig,
        "email_abc": new InputTextConfig({
          validatorMsgs:[
            new UniqueValidatorMsg({route:"persona-admin"})
          ]
        }),
        "lugar_nacimiento": new InputTextConfig,
        "telefono_verificado": new InputCheckboxConfig,
        "email_verificado": new InputCheckboxConfig,
      }
    ),
    
  })

  
}

