import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { PDF_URL } from '@config/app.config';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { DetailComponent } from '@component/structure/detail.component';
import { FormGroupConfig } from '@class/reactive-form-config';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';

@Component({
  selector: 'app-generar-constancia',
  templateUrl: '../../core/component/structure/detail.component.html',
})
export class GenerarConstanciaComponent extends DetailComponent {

  override entityName: string = "generar_constancia"

  override inputSearchGo: boolean = false;
  
  override config: FormGroupConfig = new FormGroupConfig(
      {
        "id":new InputAutocompleteConfig({
          entityName:"alumno",
          required:true
        }),
        "certificado":new InputSelectParamConfig({
          options:[
            "certificado_alumno_regular",
            "constancia_titulo_tramite",
            "constancia_pase",
            "constancia_general_finalizo",
            "libro_matriz"
          ],
          required:true
        }),
        "url":new InputTextConfig({
          required:true
        }),
        "firma":new InputCheckboxConfig({
        }),
        "observaciones":new TextareaConfig({
        })
      }
   
    )

  override initData(): Observable<any> {
    return of({});
  }

  override submit(){
    var url = PDF_URL+this.control.get("certificado")!.value
    url += "?id="+this.control.get("id")!.value
    if(this.control.get("observaciones")!.value) url += "&observaciones="+this.control.get("observaciones")!.value
    if(this.control.get("url")!.value) url += "&url="+encodeURIComponent(this.control.get("url")!.value)
    if(this.control.get("firma")!.value) url += "&firma=true"
    else  url += "&firma=false"
    window.open(url, "_blank")
  }


  override optFooter: AbstractControlViewOption[] = [

    {
      config: new EventButtonConfig({
        text: "Generar", //texto del boton
        action: "submit", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
    }
  ];
}

