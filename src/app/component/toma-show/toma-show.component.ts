import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { DataDefinitionFkAllService } from '@service/data-definition/data-definition-fk-all.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Location } from '@angular/common';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { ControlDateConfig } from '@component/control-date/control-date.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';

@Component({
  selector: 'app-toma-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class TomaShowComponent extends ShowComponent {

  constructor(
    protected dd: DataDefinitionToolService, 
    protected route: ActivatedRoute, 
    protected dialog: MatDialog,
    protected storage: SessionStorageService,
    protected ddrf: DataDefinitionFkAllService,
    protected fc: FormConfigService,
    protected router: Router, 
    protected snackBar: MatSnackBar,
    protected location: Location, 
    protected validators: ValidatorsService,
    protected fb: FormBuilder

  ) {
    super(dd, route, dialog, storage, ddrf, fc, router, snackBar, location, validators, fb)
  }
  
  readonly entityName: string = "toma";

  config: FormArrayConfig = new TableDynamicConfig(
    {
      optColumn: [
        {
          config:new RouteIconConfig({
            icon: "list",
            routerLink: "alumno-comision-show",
            title: "Lista de Alumnos",
            params: { "comision":"{{cur-comision}}" }
          })
        }
      ] //columna opciones
    }, {
    "id": new ControlValueConfig({
      label:"id toma"
    }),
    "cur-id": new ControlValueConfig({
      label:"id curso"
    }),
    "cur-ige": new ControlValueConfig({
      label:"ige"
    }),
    "cur-comision": new ControlValueConfig({
    }),
    "fecha_toma": new ControlDateConfig({
    }),
    "estado": new ControlValueConfig({
    }),
    "tipo_movimiento": new ControlValueConfig({
    }),
    "estado_contralor": new ControlValueConfig({
    }),
    "curso": new ControlLabelConfig({
      entityName:"curso"
    }),
    "docente": new ControlLabelConfig({
      entityName:"persona"
    }),
    "doc-telefono": new ControlValueConfig({
      label:"Telefono",
    }),
    "doc-email": new ControlValueConfig({
      label:"Email",
    }),
    "planilla_cargada": new ControlBooleanConfig({
    }),
    // "activo": new ControlBooleanConfig({
    //   label:"Activo"
    // })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "cur_com_cal-anio":new InputYearConfig({
        label:"Año",
      }),
      "cur_com_cal-semestre":new InputTextConfig({
        label:"Semestre",
      }),
      "cur-comision":new InputAutocompleteConfig({
      }),
      "cur_com-sede":new InputAutocompleteConfig({
      }),
      "docente": new InputAutocompleteConfig({
        label:"Docente",
        entityName:"persona"
      }),
    })
  }) 


  
  /**
   * el control y el index se definen por cada fila, no deben ser completados
   */
  /**
   {  //boton eliminar 
      config: new EventIconConfig({
        action:"remove",
        color: "accent",
        fieldEvent:this.optField,
        icon:"delete"
      }),
    }
   */

  queryData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.ddrf.getAllConfig(this.entityName, ids, this.config.controls)
      ),
      switchMap(
        data =>  this.dd.postAllConnection(data,"planilla_cargada","id","id","toma",{"planilla_cargada":"planilla_cargada"})
      ),
      tap(
        data => console.log(data)
      ),
    )
  }
}

  