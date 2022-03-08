import { Component } from '@angular/core';
import { FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { Observable, of } from 'rxjs';
import { AdminComponent } from '@component/detail/admin.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { PDF_URL } from '@config/app.config';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';

@Component({
  selector: 'app-certificado-alumno-regular',
  templateUrl: '../../core/component/detail/detail.component.html',
})
export class CertificadoAlumnoRegularComponent extends AdminComponent {

  inputSearchGo: boolean = false;
  
  config: FormStructureConfig = new FormStructureConfig({},
    {"data":new FieldsetDynamicConfig(
      {
        title:"Certificados"
      },
      {
        "id":new InputAutocompleteConfig({
          entityName:"alumno",
          required:true
        }),
        "certificado":new InputSelectParamConfig({
          options:["certificado_alumno_regular","constancia_titulo_tramite", "constancia_pase","constancia_general_finalizo"],
          required:true
        }),
        "url":new InputTextConfig({
          required:true
        }),
        "firma":new InputCheckboxConfig({
        }),
        "observaciones":new TextareaConfig({
        })
      },
   
    )}
  )

  initData(): Observable<any> {
    return of({});
  }

  submit(){
    var url = PDF_URL+this.form.get("data").get("certificado").value
    url += "?id="+this.form.get("data").get("id").value
    if(this.form.get("data").get("observaciones").value) url += "&observaciones="+this.form.get("data").get("observaciones").value
    if(this.form.get("data").get("url").value) url += "&url="+encodeURIComponent(this.form.get("data").get("url").value)
    if(this.form.get("data").get("firma").value) url += "&firma=true"
    else  url += "&firma=false"
    window.open(url, "_blank")
  }
}

