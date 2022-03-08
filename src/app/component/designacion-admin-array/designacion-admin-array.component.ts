import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { ConfigFormGroupFactory, FormArrayConfig, FormControlConfig, FormGroupConfig, FormGroupFactory, FormStructureConfig } from '@class/reactive-form-config';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { AdminArrayComponent } from '@component/show/admin-array.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@service/validators/validators.service';
import { RequiredValidatorMsg, UniqueValidatorMsg, ValidatorMsg } from '@class/validator-msg';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { prefixObj } from '@function/prefix-obj';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { Display } from '@class/display';

class DesignacionAdminArrayConfigFormGroupFactory extends ConfigFormGroupFactory{
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
      "per-numero_documento":new FormControl(null, {
        validators:[Validators.required],
        asyncValidators:[this.vs.unique("numero_documento", "persona", "per-id")]
      }),
    });
  }

}

@Component({
  selector: 'app-designacion-admin-array',
  templateUrl: '../../core/component/show/show.component.html',
})
export class DesignacionAdminArrayComponent extends AdminArrayComponent {

  readonly entityName: string = "designacion";
  
  initDisplay() {
    var display = new Display();
    display.setSize(10);
    display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  switchOptField(data: {action: string; [x: string]: any; }){
    switch(data.action){
      case "actualizar_persona":
        this.dd.unique("persona", {"numero_documento":data.control.controls["per-numero_documento"].value}).subscribe(
          row => {
            row = prefixObj(row, "per-");
            (data.control as FormGroup).patchValue(row);
          }
        )  
      
      break;
      default: super.switchOptField(data);
    }
  }
  
  ngOnInit(){
    this.config.factory = new DesignacionAdminArrayConfigFormGroupFactory(this.config, this.validators)
    super.ngOnInit()
    this.config.optColumn.push( //columna opciones
      {  //boton eliminar 
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

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "id": new FormControlConfig,
    "per-id": new FormControlConfig,
    "per-numero_documento": new InputTextConfig({
      validatorMsgs:[new RequiredValidatorMsg(), new UniqueValidatorMsg()]
    }),
    "per-nombres": new InputTextConfig({
      required:true,
      validatorMsgs:[new RequiredValidatorMsg()]
    }),
    "per-apellidos": new InputTextConfig,
    "per-telefono": new InputTextConfig,
    "cargo": new InputSelectConfig,
    "sede": new InputAutocompleteConfig,
    "desde": new InputDateConfig,
    "hasta":new InputDateConfig
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "per-search":new InputTextConfig({
        label:"Buscar",
        width: new FieldWidthOptions
      }),
      "sede":new InputAutocompleteConfig,
      "persona":new InputAutocompleteConfig,
      "hasta.exists":new InputSelectCheckboxConfig
    })
  })
  
  

}

