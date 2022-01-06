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
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { ShowAdminComponent } from '@component/show/show-admin.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';

@Component({
  selector: 'app-calificacion-show-admin',
  templateUrl: '../../core/component/show/show.component.html',
})
export class CalificacionShowAdminComponent extends ShowAdminComponent {

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
  
  readonly entityName: string = "calificacion";

  config: FormArrayConfig = new TableDynamicConfig({
    optTitle: [] //opciones de titulo  
  }, {
    // "disposicion": new ControlLabelConfig({
    //   label:"disposicion",
    //   entityName:"disposicion"
    // }),
    "id": new FormControlConfig(),
    "dis-id": new FormControlConfig(),
    "dis-asignatura": new InputAutocompleteConfig({
      label:"Asignatura",
      entityName:"asignatura"
    }),
    "dis_pla-plan": new InputAutocompleteConfig({
      label:"Plan",
      entityName:"plan",
      disabled:true,
    }),
    "dis_pla-anio": new ControlValueConfig({
      label:"Año",
      disabled:true,
    }),
    "dis_pla-semestre": new ControlValueConfig({
      label:"Semestre",
      disabled:true,
    }),
    "alumno": new ControlLabelConfig({
      label:"alumno",
      entityName:"alumno",
      disabled:true,
    }),
    "nota_final": new InputTextConfig({
      label:"Nota Final"
    }),
    "crec": new InputTextConfig({
      label:"CREC"
    }),
    
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({},{
      "alu-persona":new InputAutocompleteConfig({
        label:"Persona",
        entityName:"persona",
        width: new FieldWidthOptions()
      })
    })
  }) 

  ngOnInit(){
    this.config.optTitle.push(
      {
        config: new RouteIconConfig({
          icon: "edit_off", 
          title:"Editar",
          routerLink: "calificacion-show",
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

