import { Component } from '@angular/core';
import { AdminComponent } from '@component/admin/admin.component';
import { Observable } from 'rxjs';
import { FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-transferir-alumno-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class TransferirAlumnoComponent extends AdminComponent {

  readonly entityName: string = "alumno"

  persist(): Observable<any> {
    /**
     * Persistencia
     * Se define un metodo independiente para facilitar la redefinicion
     * @return "datos de respuesta (habitualmente array de logs)"
     */
    return this.dd._post("transferir_alumno", this.entityName, this.serverData())
  }

  serverData() { 
    return this.form.get("alumno").value 
  }


  config: FormStructureConfig = new FormStructureConfig({},{
    "alumno": new FieldsetDynamicConfig({}, {
      "id": new InputAutocompleteConfig(
        {entityName:"persona", required:true}
      ),
      "persona": new InputAutocompleteConfig(
        {entityName:"persona", required:true}
      ),
    })
  })
}