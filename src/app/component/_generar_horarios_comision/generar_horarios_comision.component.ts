import { Component } from '@angular/core';
import { AdminComponent } from '@component/detail/admin.component';
import { Observable } from 'rxjs';
import { FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';

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
    "comision": new FieldsetDynamicConfig({
      title:"Comisión Seleccionada"
    }, {
      
      "id": new InputAutocompleteConfig({
        label:"Comisión Seleccionada",
        readonly:true,
        entityName:"comision"
      })
    }),

    "curso/comision": new TableDynamicConfig({title:"Cursos"}, {
      //"id": new FormConfig(),
      "asignatura": new  InputSelectConfig(
        {entityName:"asignatura"}
      ),
      "horas_catedra": new  InputTextConfig({
        type:"number"
      }),
      "horario": new ControlValueConfig({
        readonly:true,
        disabled:true
      }),
    }),
  
    "horarios": new FieldsetDynamicConfig({}, {
      "dias": new InputSelectConfig({
        multiple:true,
        entityName:"dia",
      }),
      "hora_inicio":new InputTextConfig({
        type:"time",
      }),
    }),
    
  })
}