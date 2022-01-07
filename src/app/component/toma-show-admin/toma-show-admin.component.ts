import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { DataDefinitionFkAllService } from '@service/data-definition/data-definition-fk-all.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Location } from '@angular/common';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { AdminArrayComponent } from '@component/show/admin-array.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputYearConfig } from '@component/input-year/input-year.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-toma-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class TomaAdminArrayComponent extends AdminArrayComponent {

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

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "fecha_toma": new InputDateConfig({
      label:"Fecha Toma"
    }),
    "estado": new InputSelectParamConfig({
      label:"Estado",
      options:["Aprobada","Pendiente", "Renuncia", "Baja", "Error"],
      default:"Aprobada"
    }),
    "tipo_movimiento": new InputSelectParamConfig({
      label:"Tipo movimiento",
      options:["AI","CC"],
      default:"AI"
    }),
    "estado_contralor": new InputSelectParamConfig({
      label:"Estado Contralor",
      options:["Pasar","Modificar","No pasar"], 
    }),
    "curso": new InputAutocompleteConfig({
      label:"Curso",
      entityName:"curso"
    }),
    "docente": new InputAutocompleteConfig({
      label:"Docente",
      entityName:"persona"
    }),
    "comentario": new InputTextConfig({
    }),
    
    // "activo": new ControlBooleanConfig({
    //   label:"Activo"
    // })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "cur_com_cal-anio":new InputYearConfig({
        label:"Año",
        width: new FieldWidthOptions()
      }),
      "cur_com_cal-semestre":new InputTextConfig({
        label:"Semestre",
        width: new FieldWidthOptions()
      }),
    })
  }) 

  ngOnInit(){
    super.ngOnInit()

    this.config.optColumn.push(
      {  //boton eliminar 
        config: new EventIconConfig({
          action:"email_confirmacion",
          fieldEvent:this.optField,
          icon:"email"
        }),
      }
    ) 
    
  }

  switchOptField(data: any){
    console.log(data)
    switch(data.action){
      case "email_confirmacion": 
        this.dd.post("email_confirmacion","email_confirmacion",{id:data.control.value.id}).subscribe(
          response=>{this.snackBar.open("Email de confirmación enviado")}
        ) 
      break;
      default: super.switchOptField(data)

    }
  }
}

  