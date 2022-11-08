import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { EmailValidatorMsg, RequiredValidatorMsg } from '@class/validator-msg';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { DetailComponent } from '@component/structure/detail.component';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-toma-posesion-email-abc',
  templateUrl: '../../core/component/structure/detail.component.html',
})
export class TomaPosesionEmailAbcComponent extends DetailComponent implements OnInit{
  
  override entityName: string = "persona"
  override inputSearchGo: boolean = false;
  override title: string = "Ingrese su email para realizar la toma de posesión"

  override control: FormGroup = new FormGroup({
    email:new FormControl(null, {validators: [Validators.required, ValidatorsService.email()]}),
  })

  override config: FormGroupConfig = new FormGroupConfig({
    "curso": new FormControlConfig, //id de curso
    "email": new InputTextConfig({
      placeholder:"Ingrese su email (preferentemente utilice abc.gob.ar)",
      validatorMsgs:[new RequiredValidatorMsg(), new EmailValidatorMsg()],
      width:new FieldWidthOptions({
        gtSm: "50%" //screen and (min-width: 960px)
      })
    })
  })

  override queryData(): Observable<any> {
    return of({})
  }

  override persist(): Observable<any> {
    return this.dd._post("persist", "toma_posesion", this.serverData())
  }
  
  override initParams(params: any){ 
    this.params = params;
    //this.config.controls["persona"].optTitle[0].control = new FormControl(this.params["curso"])
 }

  /**
     * Recargar una vez persistido
     */
   override reload(): any {
    if(!this.response){
      this.router.navigate(['/inscripcion-docente'], 
        { 
          queryParams : { 
            "email": this.control.controls["email"].value, 
            "curso":this.params["curso"] 
          }
        }
      );
    } else {
      this.router.navigateByUrl('/inscripcion-docente-correcta', {replaceUrl: true});
    }
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

