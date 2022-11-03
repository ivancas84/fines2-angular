import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { EventButtonConfig } from '@component/event-button/event-button.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectValueConfig } from '@component/input-select-value/input-select-value.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { TableComponent } from '@component/structure/table.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-comision-admin-array',
  templateUrl: '../../core/component/structure/table.component.html',
})

export class ComisionAdminArrayComponent extends TableComponent {

  override entityName: string = "comision";

  override config: FormArrayConfig = new FormArrayConfig({
    id: new ControlValueConfig,
    turno: new ControlValueConfig,
    comentario: new InputTextConfig,
    autorizada: new InputCheckboxConfig,
    apertura: new ControlBooleanConfig,
    publicada: new ControlBooleanConfig,
    sede: new ControlLabelConfig,
    division: new ControlValueConfig,
    modalidad: new ControlLabelConfig,
    planificacion: new ControlLabelConfig,

    identificacion: new InputTextConfig,
    estado: new InputSelectValueConfig({entityName:"comision"}),
    configuracion: new InputSelectValueConfig({entityName:"comision"}),
    activos: new ControlValueConfig,

  })

  override optFooter: AbstractControlViewOption[] = [
    {
      config: new EventButtonConfig({
        text: "Aceptar", //texto del boton
        action: "submit", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
    },
    {
      config: new EventIconConfig({
        icon: "add", //texto del boton
        action: "add_comision", //accion del evento a realizar
        color: "primary",
        fieldEvent: this.optField
      }),
      control: this.control
    },
  ];


  override optColumn: FormControlConfig[] = [
    new EventIconConfig({
      action:"remove",
      color: "accent",
      fieldEvent:this.optField,
      icon:"delete"
    })
  ];

  override searchConfig: FormGroupConfig = new FormGroupConfig({
    "cal-anio": new InputYearConfig(),
    "cal-semestre": new InputTextConfig({type:"number"}),
    "autorizada": new InputSelectCheckboxConfig,
    "modalidad": new InputSelectConfig,
    "sed-centro_educativo": new InputSelectConfig,
    "sed-numero": new InputTextConfig
  })

  
  override initParams(params: { [x: string]: any }){ 
    if(isEmptyObject(params)){
      params = {
        "cal-anio":'2022',
        "cal-semestre":'2',
        'autorizada':"true",
        "sed-centro_educativo":"6047d36d50316"
      }
    }
    this.params = params; 
  }


  override initData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.getAll(this.entityName, ids)
      ),
      switchMap(
        data => this.dd.postMergeAll({ data, method: "cantidad_alumnos_activos_comision", entityName: "comision", fields: { "activos": "activos" }, fieldNameData: "id", fieldNameResponse: "comision" })
      ),
      tap(
        data=>console.log(data)
      )
    )
  }
}


  
  
