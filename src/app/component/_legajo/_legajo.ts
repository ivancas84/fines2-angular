import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormStructureConfig } from '@class/reactive-form-config';
import { RequiredValidatorMsg, UniqueValidatorMsg } from '@class/validator-msg';
import { AdminComponent } from '@component/detail/admin.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputUploadConfig } from '@component/input-upload/input-upload.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { emptyUrl } from '@function/empty-url.function';
import { prefixObj } from '@function/prefix-obj';


@Component({
  selector: 'app-legajo-admin',
  templateUrl: '../../core/component/detail/detail.component.html',
})
export class LegajoComponent extends AdminComponent {

  entityName: string = "alumno"

  form: FormGroup = this.fb.group({
    "per": this.fb.group({
      "numero_documento":this.fb.control(null,{
        validators:[Validators.required],
        asyncValidators:[this.validators.unique("numero_documento", "persona")]
      }),
      "cuil":this.fb.control(null,{
        asyncValidators:[this.validators.unique("cuil", "persona")]
      })
    })
  }) 
  
  config: FormStructureConfig = new FormStructureConfig(
    {},
    {
      "per": new FieldsetDynamicConfig({
        title:"Datos personales",
        optTitle: [
          {
            config:new RouteIconConfig({
              icon:"fitbit",
              routerLink: "calificaciones",
              title: "Calificaciones",
              params: { "id":"{{id}}" }
            }),
          },
          {
            config:new EventIconConfig({
              action:"actualizar_persona",
              color: "primary",
              title: "Actualizar Persona",
              fieldEvent:this.optField,
              icon:"update"
            }),
          },
        ]
      },{
        "nombres": new InputTextConfig({}),
        "apellidos": new InputTextConfig({}),
        "numero_documento": new InputTextConfig({
          validatorMsgs:[new RequiredValidatorMsg(), new UniqueValidatorMsg()]
        }),
        "cuil": new InputTextConfig({
          validatorMsgs:[new UniqueValidatorMsg()]
        }),
        "genero": new InputSelectParamConfig({
          options:["Femenino","Masculino","Otro"]
        }),
        "fecha_nacimiento": new InputDateConfig({}),
        "telefono": new InputTextConfig({}),
        "email": new InputTextConfig({}),
        "lugar_nacimiento": new InputTextConfig({}),
        "telefono_verificado": new InputCheckboxConfig({}),
        "email_verificado": new InputCheckboxConfig({}),
        "info_verificada": new InputCheckboxConfig({}),

      }),
      "alumno": new FieldsetDynamicConfig({
          title:"Datos de alumno"
        },{
          "documentacion_inscripcion": new InputSelectParamConfig({
            options:["Constancia", "Certificado", "Analítico parcial", "Analítico completo"]
          }),
          "anio_inscripcion": new InputSelectParamConfig({
            options:[1,2,3,4,5,6,7,8,9]
          }),
          "anio_inscripcion_completo": new InputSelectCheckboxConfig({
          }),
          "establecimiento_inscripcion": new InputTextConfig({
          }),
          "resolucion_inscripcion": new InputSelectConfig({
            entityName:"resolucion",
            width:new FieldWidthOptions({
              gtSm: "50%" //screen and (min-width: 960px)
            })
          }),
          "anio_ingreso": new InputSelectParamConfig({
            options:["1","2","3"]
          }),
          "plan": new InputSelectConfig({
            entityName:"plan"
          }),
          "adeuda_deudores": new InputTextConfig({}),
          "adeuda_legajo": new InputTextConfig({}),
          "libro_folio": new InputTextConfig({}),
          "estado_inscripcion": new InputSelectParamConfig({
            options:["Correcto","Correcto incompleto", "Indeterminado","Caso particular","Titulado"]
          }),
          "observaciones": new TextareaConfig({
          }),
      }),
      "per-detalle_persona/persona":  new TableDynamicConfig(
        {
          title:"Legajo",
        
        }, {
          "descripcion": new  InputTextConfig(),
          "archivo": new InputUploadConfig(),
        }
      ),
      "alumno_comision/alumno":  new TableDynamicConfig(
        {
          title:"Comisiones",
        
        }, {
          "comision": new  InputAutocompleteConfig({
            entityName:"comision"
          }),

          "activo": new InputCheckboxConfig(),
        }
      )
    }
  )

  ngOnInit(){
    super.ngOnInit()
    this.config.controls["per"].optTitle[0].control = this.form.controls["alumno"];
    this.config.controls["per"].optTitle[1].control = this.form.controls["per"];
  }


  switchOptField(data: any){
    switch(data.action){
      case "actualizar_persona":
        if((data.control.controls["numero_documento"].hasError("notUnique"))) {
          this.router.navigate(
            ['/'+emptyUrl(this.router.url)], 
            { queryParams: { persona: data.control.controls["numero_documento"].getError("notUnique") } }
          );
        } else if((data.control.controls["cuil"].hasError("notUnique"))) {
          this.router.navigate(
            ['/'+emptyUrl(this.router.url)], 
            { queryParams: { persona: data.control.controls["cuil"].getError("notUnique") } }
          );
        }
        break;

      default:  
        super.switchOptField(data)
    }
  }
  
  reload(){
    /**
     * Recargar una vez persistido
     */
    this.router.navigateByUrl('/inscripcion-alumno-correcta', {replaceUrl: true});
  }
  

}

