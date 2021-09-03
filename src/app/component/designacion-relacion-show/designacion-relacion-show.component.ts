import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { Display } from '@class/display';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { arrayColumn } from '@function/array-column';
import { ControlDateConfig } from '@component/control-date/control-date.component';

@Component({
  selector: 'app-designacion-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class DesignacionRelacionShowComponent extends ShowComponent {

  readonly entityName: string = "designacion";
  loadLength = false

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "per-nombres": new ControlValueConfig({
      label:"Nombres"
    }),
    "per-apellidos": new ControlValueConfig({
      label:"Apellidos"
    }),
    "car-descripcion": new ControlValueConfig({
      label:"Descripcion"
    }),
    "telefono": new ControlLabelConfig({
      label:"Telefono"
    }),
    "email": new ControlLabelConfig({
      label:"Telefono"
    }),
    "sed-numero": new ControlValueConfig({
      label:"Grupo de alumnos",
    })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "per-search":new InputTextConfig({
        label:"Buscar",
        width: new FieldWidthOptions()
      }),
    })
  }) 

  initDisplay() {
    var display = new Display();
    display.setSize(100);
    display.setParamsByQueryParams(this.params);
    if(!display.getParams().hasOwnProperty("comision")) throw "El id de comision no se encuentra definido"
    this.display$.next(display)
  }

  queryData(): Observable<any>{
    return this.dd.all("comision_relacionada", this.display$.value).pipe(
      map(
        response => {
          var ret = arrayColumn(response, "relacion")
          ret.unshift(this.display$.value.getParams()["comision"])
          return ret
        }
      ),
      switchMap(
        idComision_ => this.dd.getAll("comision",idComision_)
      ),
      map(
        comision_ => {
          console.log(comision_) 
          return arrayColumn(comision_, "sede")
        }
      ),
      switchMap(
        idSede_ => {
          var display = new Display()
          display.setSize(0);
          display.setParams({"sede":idSede_, "car-descripcion":"Referente", hasta:"false"})
          return this.dd.post("ids", "designacion", display)
        }
      ),
      tap(
        ids => console.log(ids)
      ),
      switchMap(
        ids => this.ddrf.getAllGroup(this.entityName, ids, this.config.controls)
      )
    )
  }


}

