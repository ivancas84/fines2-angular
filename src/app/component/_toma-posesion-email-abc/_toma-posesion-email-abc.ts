import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { EmailValidatorMsg, RequiredValidatorMsg } from '@class/validator-msg';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { AdminComponent } from '@component/detail/admin.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { LocalValidators } from '@service/local-validators.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-inscripcion-alumno',
  templateUrl: '../../core/component/detail/detail.component.html',
})
export class TomaPosesionEmailAbcComponent extends AdminComponent {
  readonly entityName: string = "persona"; 

  
  inputSearchGo: boolean = false;

  form = this.fb.group(
    {
      "persona":this.fb.group(
        {
          "email":this.fb.control(null, {
            validators:[ValidatorsService.email(),Validators.required]
          }) 
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
        title:"Toma de Posesión",
        optTitle: [
          {
            config:new ControlLabelConfig({
              entityName:"curso",
              // text: "Toma Posesión",
              // routerLink: "toma-posesion-email-abc",
              // params: {"curso":"{{id}}"},
              // color: "",
              // title: "Administrar comisión"
            }) 
          }
        ],
        intro:`<p>Ingrese su email  para realizar la toma de posesión. Utilice preferentemente su casilla abc.gob.ar</p>
`,
      }, {
        "curso": new FormControlConfig, //id de curso
        "email": new InputTextConfig({
          placeholder:"Ingrese su email (preferentemente utilice abc.gob.ar)",
          required:true,
          validatorMsgs:[new RequiredValidatorMsg(), new EmailValidatorMsg()],
          width:new FieldWidthOptions({
            gtSm: "50%" //screen and (min-width: 960px)
          })
        }),
        
      }
    ),
  })

  queryData(): Observable<any> {
    return of({})
  }

  persist(): Observable<any> {
    return this.dd._post("persist", "toma_posesion", this.serverData()["persona"])
  }


  

  initParams(params: any){ 
    this.params = params;
    this.config.controls["persona"].optTitle[0].control = new FormControl(this.params["curso"])
 }

     /**
     * Recargar una vez persistido
     */
    reload(): any {
      if(!this.response){
        this.router.navigate(['/inscripcion-docente'], 
          { 
            queryParams : { 
              "email": (this.form.controls["persona"] as FormGroup).controls["email"].value, 
              "curso":this.params["curso"] 
            }
          }
        );
      } else {
        this.router.navigateByUrl('/inscripcion-docente-correcta', {replaceUrl: true});
      }
    }
   
}

