import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { ConfigFormGroupFactory, FormArrayConfig, FormConfig, FormGroupConfig, FormStructureConfig } from '@class/reactive-form-config';
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
import { Display } from '@class/display';
import { prefixObj } from '@function/prefix-obj';
import { RequiredValidatorMsg, UniqueValidatorMsg } from '@class/validator-msg';

class TomaAdminArrayConfigFormGroupFactory extends ConfigFormGroupFactory{
  /**
   * Se define un factory local para asignar asyncValidators al atributo per-numero_documento
   */
  vs: ValidatorsService
  
  public constructor(config: FormGroupConfig, vs: ValidatorsService){
    super(config)
    this.vs = vs
  }

  initFormGroup(): FormGroup {
    return new FormGroup({
      "doc-numero_documento":new FormControl(null, {
        validators:[Validators.required],
        asyncValidators:[this.vs.unique("numero_documento", "persona", "doc-id")]
      }),
    });
  }

}


@Component({
  selector: 'app-toma-admin-array',
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


  initDisplay() {
    var display = new Display();
    display.setSize(10);
    display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }


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
      default:"Pasar" 
    }),
    "curso": new InputAutocompleteConfig({
      label:"Curso",
      entityName:"curso"
    }),
    // "docente": new InputAutocompleteConfig({
    //   label:"Docente",
    //   entityName:"persona"
    // }),
    "doc-id": new FormConfig,
   
    "doc-nombres": new InputTextConfig({
      required:true,
      validatorMsgs:[new RequiredValidatorMsg()]
    }),    
    "doc-apellidos": new InputTextConfig,
    "doc-numero_documento": new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg(), new UniqueValidatorMsg()]
    }),
    "doc-cuil": new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg(), new UniqueValidatorMsg()]
    }),    
    "doc-fecha_nacimiento": new InputDateConfig,
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
      "docente":new InputAutocompleteConfig({
        entityName:"persona"
      }),
      "cur-comision":new InputAutocompleteConfig,

    })
  }) 

  ngOnInit(){
    this.config.factory = new TomaAdminArrayConfigFormGroupFactory(this.config, this.validators)

    super.ngOnInit()

    this.config.optColumn.push(
      {   
        config: new EventIconConfig({
          action:"email_confirmacion",
          fieldEvent:this.optField,
          icon:"email"
        }),
      }
    ) 
    this.config.optColumn.push( //columna opciones
      {  
        config: new EventIconConfig({
          action:"actualizar_persona",
          color: "primary",
          title: "Actualizar Persona",
          fieldEvent:this.optField,
          icon:"update"
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
      case "actualizar_persona":
        this.dd.unique("persona", {"numero_documento":data.control.controls["doc-numero_documento"].value}).subscribe(
          row => {
            row = prefixObj(row, "doc-");
            (data.control as FormGroup).patchValue(row);
          }
        )  
      
      break;
      default: super.switchOptField(data)

    }
  }
}

  