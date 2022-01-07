import { Component } from '@angular/core';
import { AdminComponent } from '@component/detail/admin.component';
import { Observable } from 'rxjs';
import { FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputTextConfig } from '@component/input-text/input-text.component';

@Component({
  selector: 'app-generar-horarios-comision',
  templateUrl: '../../core/component/detail/detail.component.html',
})
export class GenerarHorariosComision extends AdminComponent {

  readonly entityName: string = "comision"

  persist(): Observable<any> {
    /**
     * Persistencia
     * Se define un metodo independiente para facilitar la redefinicion
     * @return "datos de respuesta (habitualmente array de logs)"
     */
    return this.dd._post("persist", "generar_horarios_comision", this.serverData())
  }

  config: FormStructureConfig = new FormStructureConfig({},{
    "comision": new FieldsetDynamicConfig({}, {
      "id": new InputAutocompleteConfig(
        {entityName:"persona", required:true}
      ),
    }),
    "horarios": new FieldsetDynamicConfig({}, {
      "dias": new InputTextConfig(
      ),
      "hora":new InputTextConfig(
      ),
    }),
    
  })
}