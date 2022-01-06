import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { DataDefinitionFkAllService } from '@service/data-definition/data-definition-fk-all.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Location } from '@angular/common';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { ShowAdminComponent } from '@component/show/show-admin.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';

@Component({
  selector: 'app-alumno-comision-show-admin',
  templateUrl: '../../core/component/show/show.component.html',
})
export class AlumnoComisionShowAdminComponent extends ShowAdminComponent {

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
  
  readonly entityName: string = "alumno_comision";


  config: FormArrayConfig = new TableDynamicConfig({
    title:"Lista de alumnos de comisión",
    optTitle: [] //opciones de titulo  
  }, {
    "id": new FormControlConfig({}),
    //"alu-id": new FormControlConfig({}),
    "alumno": new InputAutocompleteConfig({
      entityName:"alumno",
      // dis  abled:true,

    }),

    "comision": new InputAutocompleteConfig({
      entityName:"comision",
      // dis  abled:true,

    }),
    "alu_per-telefono": new ControlValueConfig({
      label:"Teléfono",
      disabled:true,
    }),
    "alu_per-email": new ControlValueConfig({
      label:"email",
      disabled:true,
    }),
    "activo": new InputCheckboxConfig({
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

  ngOnInit(){
    this.config.optTitle.push(
      {
        config: new RouteIconConfig({
          icon: "edit_off", 
          title:"Editar",
          routerLink: "alumno-comision-show",
        }),
        control:this.form
      },
    )
    
    super.ngOnInit()
  }

  initParams(params: any){ 
    this.params = params; 
    this.config.optTitle[0].config.params = this.params
  }
 




 

}

