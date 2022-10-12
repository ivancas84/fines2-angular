import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { EmailValidatorMsg, RequiredValidatorMsg } from '@class/validator-msg';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { DetailComponent } from '@component/structure/detail.component';
import { LocalValidators } from '@service/local-validators.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-inscripcion-docente',
  templateUrl: '../../core/component/structure/detail.component.html',
})
export class InscripcionDocenteComponent extends DetailComponent implements OnInit{
  
  override entityName: string = "persona"
  override inputSearchGo: boolean = false;
  override title: string = "Complete sus datos para realizar la toma de posesión"

  override control: FormGroup = new FormGroup({
    nombres:new FormControl(null, {validators: [Validators.required]}),
    apellidos:new FormControl(null, {validators: [Validators.required]}),
    numero_documento:new FormControl(null, {validators: [Validators.required]}),
    cuil:new FormControl(null, {validators: [Validators.required]}),
    genero:new FormControl(null, {validators: [Validators.required]}),
    fecha_nacimiento:new FormControl(null, {validators: [Validators.required]}),
    telefono:new FormControl(null, {validators: [Validators.required]}),

    email:new FormControl(null, {validators: [Validators.required, ValidatorsService.email()]}),
  },{
    validators:LocalValidators.cuilDni(),
  },)

  override config: FormGroupConfig = new FormGroupConfig({
    id: new FormControlConfig, //id de curso
    curso: new FormControlConfig, //id de curso
    nombres: new InputTextConfig({
      label:"Nombres COMPLETOS (debe coincidir con su DNI)",
      width:new FieldWidthOptions({
        gtSm: "50%" //screen and (min-width: 960px)
      }),
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    apellidos: new InputTextConfig({
      required:true,
      label:"Apellidos COMPLETOS (debe coincidir con su DNI)",
      width:new FieldWidthOptions({
        gtSm: "50%" //screen and (min-width: 960px)
      }),
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    numero_documento: new InputTextConfig({
      label:"Número de Documento (sin puntos)",
      type:"number",
      width:new FieldWidthOptions({
        gtSm: "33%" //screen and (min-width: 960px)
      }),
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    cuil: new InputTextConfig({
      label:"Cuil (sin guiones)",
      type:"number",
      width:new FieldWidthOptions({
        gtSm: "34%" //screen and (min-width: 960px)
      }),
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    genero: new InputSelectParamConfig({
      options:["Femenino", "Masculino", "Otro"],
      width:new FieldWidthOptions({
        gtSm: "33%" //screen and (min-width: 960px)
      }),
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    fecha_nacimiento: new InputDateConfig({
      validatorMsgs:[new RequiredValidatorMsg()],
      width:new FieldWidthOptions({
        gtSm: "33%" //screen and (min-width: 960px)
      })
    }),
    telefono: new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg()],
      type:"number",
      width:new FieldWidthOptions({
        gtSm: "34%" //screen and (min-width: 960px)
      })
    }),
    email: new InputTextConfig({
      placeholder:"Ingrese su email (preferentemente utilice abc.gob.ar)",
      validatorMsgs:[new RequiredValidatorMsg(), new EmailValidatorMsg()],
      width:new FieldWidthOptions({
        gtSm: "33%" //screen and (min-width: 960px)
      })
    })
  })

  override queryData(): Observable<any> {
    return of({})
  }

  override persist(): Observable<any> {
    return this.dd._post("persist", "inscripcion_docente", this.serverData())
  }
  
  override initParams(params: any){ 
    this.params = params;
    //this.config.controls["persona"].optTitle[0].control = new FormControl(this.params["curso"])
 }

  override reload(): any {
    this.router.navigateByUrl('/inscripcion-docente-correcta', {replaceUrl: true});
  }
  
  override optFooter: AbstractControlViewOption[] = [ //opciones de componente
    {
      config:new EventButtonConfig({
        text: "Aceptar", //texto del boton
        action: "submit", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
    },
    {
      config:new EventIconConfig({
        icon: "arrow_back", //texto del boton
        action: "back", //accion del evento a realizar
        color: "accent",
        fieldEvent: this.optField
      }),
    },
    {
      config:new EventIconConfig({
        icon: "cached", //texto del boton
        action: "reset", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
    },

  ];
}

