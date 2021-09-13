import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { ShowComponent } from '@component/show/show.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { DataDefinitionRelFieldsService } from '@service/data-definition/data-definition-rel-fields.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Location } from '@angular/common';
import { ControlLabelConfig } from '@component/control-label/control-label.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';

@Component({
  selector: 'app-alumno-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class CalificacionShowComponent extends ShowComponent {

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
  
  readonly entityName: string = "calificacion";

  config: FormArrayConfig = new TableDynamicConfig({}, {
    // "disposicion": new ControlLabelConfig({
    //   label:"disposicion",
    //   entityName:"disposicion"
    // }),
    "dis-asignatura": new ControlLabelConfig({
      label:"Asignatura",
      entityName:"asignatura"
    }),
    "dis_pla-plan": new ControlLabelConfig({
      label:"Plan",
      entityName:"plan"
    }),
    "dis_pla-anio": new ControlValueConfig({
      label:"Año",
    }),
    "dis_pla-semestre": new ControlValueConfig({
      label:"Semestre",
    }),
    "alumno": new ControlLabelConfig({
      label:"alumno",
      entityName:"alumno"
    }),
    "nota_final": new ControlValueConfig({
      label:"Nota Final"
    }),
    "crec": new ControlValueConfig({
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
          icon: "mode_edit", 
          title:"Editar",
          routerLink: "calificacion-show-admin",
        }),
        control:this.form
      },
    )

    this.config.optTitle.push(
      {
        config: new RouteIconConfig({
          icon: "list_alt", 
          title:"Comisiones del alumno",
          routerLink: "alumno-comision-show",
        }),
        control:this.form
      },
    )

    super.ngOnInit()
  }

  initParams(params: any){ 
    this.params = params; 
    
    this.config.optTitle[2].config.params = this.params
    this.config.optTitle[3].config.params = this.params

  }

}

