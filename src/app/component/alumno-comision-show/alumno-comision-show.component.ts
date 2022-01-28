import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormArrayConfig, FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
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
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { LinkTextConfig } from '@component/link-text/link-text.component';

@Component({
  selector: 'app-alumno-comision-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class AlumnoComisionShowComponent extends ShowComponent {

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

  config: FormArrayConfig = new TableDynamicConfig({}, {
    "alu-persona": new FormControlConfig(),
    
    "alu_per-apellidos": new ControlValueConfig({
      label:"Apellidos"
    }),
    "alu_per-nombres": new ControlValueConfig({
      label:"Nombres"
    }),
    "alu_per-numero_documento": new ControlValueConfig({
      label:"DNI"
    }),
    // "alu_per-fecha_nacimiento": new ControlValueConfig({
    //   label:"fecha nacimiento"
    // }),
    "alu_per-telefono": new ControlValueConfig({
      label:"Teléfono"
    }),
    "alu_per-email": new ControlValueConfig({
      label:"email"
    }),
    "alu_per-fecha-nacimiento": new ControlValueConfig({
    }),

    "alu-adeuda_deudores": new ControlValueConfig({
    }),
    "alu-estado_inscripcion": new ControlValueConfig({
    }),
    "activo": new ControlBooleanConfig({
      label:"Activo"
    }),
    "alumno": new FormControlConfig({
    })
  })

  searchConfig: FormStructureConfig = new FormStructureConfig({}, {
    "params":new FieldsetDynamicConfig({title:"Opciones"},{
      "alu_per-search":new InputTextConfig({
        label:"Buscar",
        width: new FieldWidthOptions()
      }),
      "alu-adeuda_deudores.exists":new InputSelectCheckboxConfig({
        label:"Adeuda Deudores",
      }),
      "comision":new InputAutocompleteConfig({
        label:"Comisión",
        entityName:"comision",
        width: new FieldWidthOptions()
      }),
      "activo":new InputSelectCheckboxConfig({
      }),
    })
  }) 

  

  ngOnInit(){

    this.config.optTitle.push(
      {
        config: new RouteIconConfig({
          icon: "mode_edit", 
          title:"Editar",
          routerLink: "alumno-comision-show-admin",
        }),
        control:this.form
      },
    )

    this.config.optColumn = [ //columna opciones
      {   
        config: new RouteIconConfig({
          icon:"fitbit",
          routerLink: "calificacion-show",
          title: "Calificaciones",
          params: { "alumno":"{{alumno}}" }

        }),
      },
      {   
        config: new RouteIconConfig({
          icon:"list",
          routerLink: "detalle-persona-show",
          title: "Detalle",
          params: { "persona":"{{alu-persona}}" }
        }),
      },
      {   
        config: new LinkTextConfig({
          url: "https://planfines2.com.ar/users/alumno-admin-rel",
          label: "Editar",
          title: "Editar Alumno",
          params: { "id":"{{alumno}}" },
          target:"_blank"
        }),
      }
    ]

    super.ngOnInit()
  }


  initParams(params: any){ 
    this.params = params; 
    this.config.optTitle[2].config.params = this.params
  }

  // queryData(): Observable<any>{
  //   return this.dd.post("ids", this.entityName, this.display$.value).pipe(
  //     switchMap(
  //       ids => this.ddrf.getAllConfig(this.entityName, ids, this.config.controls)
  //     ),
  //     switchMap(
  //       data => 
  //     )
  //   )
  // }

}



