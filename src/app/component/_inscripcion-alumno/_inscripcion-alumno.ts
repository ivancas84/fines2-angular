import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { EmailValidatorMsg, RequiredValidatorMsg, ValidatorMsg } from '@class/validator-msg';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { AdminComponent } from '@component/detail/admin.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputUploadConfig } from '@component/input-upload/input-upload.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { LocalValidators } from '@service/local-validators.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-inscripcion-alumno',
  templateUrl: '../../core/component/detail/detail.component.html',
})
export class InscripcionAlumnoComponent extends AdminComponent {
  readonly entityName: string = "persona"; 

  
  inputSearchGo: boolean = false;

  form = this.fb.group(
    {
      "persona":this.fb.group(
        {
          "email":this.fb.control(null, {
            validators:ValidatorsService.email()
          }) 
        },
        {
          validators:LocalValidators.cuilDni(),
        },
      )
    }, {
      updateOn:"blur"
    }
  );

  config: FormStructureConfig = new FormStructureConfig({
  },{
    "persona": new FieldsetDynamicConfig(
      {
        title:"Inscripción Alumno",
        intro:`<p>Complete el siguiente formulario prestando atención a los 
datos ingresados, serán posteriormente utilizados en los analíticos.</p>
        <p>Sus <strong>nombres y apellidos</strong> deben estar completos, 
como se encuentra en su DNI.</p>
        <p>Para obtener su <strong>número de CUIL</strong> ingrese a 
<a href='https://www.anses.gob.ar/consulta/constancia-de-cuil'>Constancia de 
CUIL</a>.
        <p>El <strong>lugar de nacimiento</strong> debe coincidir con el de su partida de 
nacimiento.<p
        `,
        validatorMsgs:[new ValidatorMsg({id:"cuilDni",message:"El cuil y el DNI no coinciden"})]
        
          

      }, {
        "id": new FormControlConfig({}),
        "nombres": new InputTextConfig({
          required:true,
          label:"Nombres COMPLETOS (debe coincidir con su DNI)",
          width:new FieldWidthOptions({
            gtSm: "50%" //screen and (min-width: 960px)
          }),
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "apellidos": new InputTextConfig({
          required:true,
          label:"Apellidos COMPLETOS (debe coincidir con su DNI)",
          width:new FieldWidthOptions({
            gtSm: "50%" //screen and (min-width: 960px)
          }),
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "numero_documento": new InputTextConfig({
          label:"Número de Documento (sin puntos)",
          required:true,
          type:"number",
          width:new FieldWidthOptions({
            gtSm: "33%" //screen and (min-width: 960px)
          }),
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "cuil": new InputTextConfig({
          label:"Cuil (sin guiones)",
          required:true,
          type:"number",
          width:new FieldWidthOptions({
            gtSm: "34%" //screen and (min-width: 960px)
          }),
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "genero": new InputSelectParamConfig({
          required:true,
          options:["Femenino", "Masculino", "Otro"],
          width:new FieldWidthOptions({
            gtSm: "33%" //screen and (min-width: 960px)
          }),
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "fecha_nacimiento": new InputDateConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "lugar_nacimiento": new InputTextConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg()],
          width:new FieldWidthOptions({
            gtSm: "75%" //screen and (min-width: 960px)
          })
        }),
        "telefono": new InputTextConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg()],
          type:"number",
          width:new FieldWidthOptions({
            gtSm: "50%" //screen and (min-width: 960px)
          })
        }),
        "email": new InputTextConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg(), new EmailValidatorMsg()],
          width:new FieldWidthOptions({
            gtSm: "50%" //screen and (min-width: 960px)
          })
        }),
        
      }
    ),
    "dom": new FieldsetDynamicConfig(
      {
        title:"Domicilio",
        intro:`<p>Ingrese su lugar de residencia para que podamos buscar una sede cerca de su domicilio.</p>
        `,
      }, {
        "id": new FormControlConfig({}),
        "calle": new InputTextConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "entre": new InputTextConfig,
        "numero": new InputTextConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg()]
        }),
        "piso": new InputTextConfig,
        "departamento": new InputTextConfig,
        "barrio": new InputTextConfig,
        "localidad": new InputTextConfig({
          required:true,
          validatorMsgs:[new RequiredValidatorMsg()],
        }),
      }
    ),
    "detalle_persona/persona": new TableDynamicConfig(
      {
        title:"Legajo",
        intro:`Ingrese fotos de frente y dorso de DNI, Certificado de
Estudios, Partida de Nacimiento y cualquier otra información que nos ayude a 
definir su situación académica`
      }, {
      //"descripcion": new InputTextConfig,
      "archivo": new InputUploadConfig(
        {entityName:"asignatura"}
      ),
    }
  )
  })

  queryData(): Observable<any> {
    return of({})
  }

  persist(): Observable<any> {
    return this.dd._post("persist", "inscripcion_alumno", this.serverData())
  }
}

