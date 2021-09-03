import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { DataDefinitionRelFieldsService } from '@service/data-definition/data-definition-rel-fields.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Location } from '@angular/common';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';

@Component({
  selector: 'app-alumno-comision-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class AlumnoComisionRelacionShowComponent extends ShowComponent {

  constructor(
    protected dd: DataDefinitionToolService, 
    protected route: ActivatedRoute, 
    protected dialog: MatDialog,
    protected storage: SessionStorageService,
    protected ddrf: DataDefinitionRelFieldsService,
    protected fc: FormConfigService,
    protected router: Router, 
    protected snackBar: MatSnackBar,
    protected location: Location, 
    protected validators: ValidatorsService,
    protected fb: FormBuilder

  ) {
    super(dd, route, dialog, storage, ddrf, fc, router, snackBar, location, validators, fb)
  }
  
  loadLength = false

  readonly entityName: string = "alumno_comision";

  config: FormArrayConfig = new TableDynamicConfig({
    pageSizeOptions:[] 
  }, {
    "alu_per-nombres": new ControlValueConfig({
      label:"Nombres"
    }),
    "alu_per-apellidos": new ControlValueConfig({
      label:"Apellidos"
    }),
    "alu_per-numero_documento": new ControlValueConfig({
      label:"DNI"
    }),
    "alu_per-telefono": new ControlValueConfig({
      label:"Teléfono"
    }),
    "alu_per-email": new ControlValueConfig({
      label:"email"
    }),
    "activo": new ControlBooleanConfig({
      label:"Activo"
    })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "alu_per-search":new InputTextConfig({
        label:"Buscar",
        width: new FieldWidthOptions()
      }),
      "comision":new InputAutocompleteConfig({
        label:"Comisión",
        entityName:"comision",
        width: new FieldWidthOptions()
      }),
    })
  }) 

  initDisplay(){
    var display = new Display();
    display.setSize(0);
    display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }


  queryData1(){
    /**
     * consultar alumnos de la comision
     */
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.ddrf.getAllGroup(this.entityName, ids, this.config.controls)
      )
    )
  }

  queryData2(){
    /**
     * consultar alumnos de la relacion
     */
    var display = new Display()
    display.setParams({"comision":this.display$.value["params"]["comision"]})
    display.setSize(0)
    return this.dd.all("comision_relacionada", display).pipe(
      switchMap(
        rows => {
          var idRelaciones = arrayColumn(rows, "relacion")
          var display = new Display()
          if(!idRelaciones.length) return of([])

          display.setParams({"comision":idRelaciones,"activo":true})
          return this.dd.post("ids", "alumno_comision",display).pipe(
            switchMap(
              ids => this.ddrf.getAllGroup("alumno_comision", ids, this.config.controls)
            )
          )
        }
      )
    )
  }

  queryData(): Observable<any>{
    return combineLatest(
     [this.queryData1(), this.queryData2()]
    ).pipe(
      map(
        response => {
          return response[0].concat(response[1])
        }
      )
    )
  }

  //   return this.dd.post("ids", this.entityName, this.display$.value).pipe(
  //     switchMap(
  //       ids => this.ddrf.getAllGroup(this.entityName, ids, this.config.controls)
  //     )
  //   ).pipe(
  //     switchMap(
  //       cursos => {
  //         return this.
  //       }
  //     )
  //   )
  // }

  
}

