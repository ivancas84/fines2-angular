import { Component } from '@angular/core';
import { Display } from '@class/display';
import { FormArrayConfig, FormStructureConfig } from '@class/reactive-form-config';
import { AdminComponent } from '@component/admin/admin.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputDateConfig } from '@component/input-date/input-date.component';
import { InputSelectCheckboxConfig } from '@component/input-select-checkbox/input-select-checkbox.component';
import { InputSelectParamConfig } from '@component/input-select-param/input-select-param.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmptyObject } from '@function/is-empty-object.function';
import { DataDefinitionFkObjService } from '@service/data-definition/data-definition-fk-obj.service';
import { DataDefinitionRelLabelService } from '@service/data-definition/data-definition-rel-label.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DataDefinitionUmObjService } from '@service/data-definition/data-definition-um-obj.service';
import { FormConfigService } from '@service/form-config/form-config.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { DataDefinitionFkAllService } from '@service/data-definition/data-definition-fk-all.service';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { ControlDateConfig } from '@component/control-date/control-date.component';


@Component({
  selector: 'app-calificaciones-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class CalificacionesComponent  extends AdminComponent {

  DataDefinitionFkAllService

  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionToolService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected relFk: DataDefinitionFkObjService,
    protected relUm: DataDefinitionUmObjService,
    protected ddrl: DataDefinitionRelLabelService, 
    protected fc: FormConfigService,
    protected rel: DataDefinitionFkAllService

  ) { 
    super(fb, route, router, location, dd, validators, storage, dialog, snackBar, relFk, relUm, ddrl, fc)
  }

  entityName: string = "alumno"

  config: FormStructureConfig = new FormStructureConfig(
    {},
    {
      "per": new FieldsetDynamicConfig({
        title:"Datos personales",
        optTitle: [
          {
            config:new RouteIconConfig({
              icon:"article",
              routerLink: "legajo",
              title: "Legajo",
              params: { "id":"{{id}}" }
            }),
          },
          {
            config:new EventIconConfig({
              icon: "list",
              action: "generar_calificacion_alumno",
              color: "",
              title: "Generar Calificacion Alumno",
              fieldEvent: this.optField
             })
          },
          
        ]
      },{
        "nombres": new InputTextConfig({
          readonly:true
        }),
        "apellidos": new InputTextConfig({
          readonly:true
        }),
        "numero_documento": new InputTextConfig({
          readonly:true
        }),
        "cuil": new InputTextConfig({
          readonly:true
        }),
        "genero": new InputSelectParamConfig({
          readonly:true,
          options:["Femenino","Masculino","Otro"]
        }),
        "fecha_nacimiento": new InputDateConfig({
          readonly:true,
        }),
        "telefono": new InputTextConfig({
          readonly:true,
        }),
        "email": new InputTextConfig({
          readonly:true,
        }),
        "lugar_nacimiento": new InputTextConfig({
          readonly:true,
        }),
        "telefono_verificado": new InputSelectCheckboxConfig({
          readonly:true,
        }),
        "email_verificado": new InputSelectCheckboxConfig({
          readonly:true,
        }),
      }),
      "alumno": new FieldsetDynamicConfig({
          title:"Datos de alumno"
        },{
          "documentacion_inscripcion": new InputSelectParamConfig({
            readonly:true,
            options:["Constancia", "Certificado", "Analítico parcial", "Analítico completo"]
          }),
          "anio_inscripcion": new InputSelectParamConfig({
            readonly:true,
            options:[1,2,3,4,5,6,7,8,9]
          }),
          "anio_inscripcion_completo": new InputSelectCheckboxConfig({
            readonly:true,
          }),
          "establecimiento_inscripcion": new InputTextConfig({
            readonly:true,
          }),
          "resolucion_inscripcion": new InputSelectConfig({
            entityName:"resolucion"
          }),
          "anio_ingreso": new InputSelectParamConfig({
            readonly:true,
            options:["1","2","3"]
          }),
          "plan": new InputSelectConfig({
            entityName:"plan"
          }),
          "adeuda_deudores": new InputTextConfig({
            readonly:true,
          }),
          "adeuda_legajo": new InputTextConfig({
            readonly:true,
          }),
          "libro_folio": new InputTextConfig({
            readonly:true,
          }),
          "estado_inscripcion": new InputTextConfig({
            readonly:true,
          }),
          "observaciones": new TextareaConfig({
            readonly:true,
          }),
      }),
      "calificacion/alumno":  new TableDynamicConfig(
        {
          title:"Calificaciones",
        
        }, {
          "dis-asignatura": new InputAutocompleteConfig(),
          "dis_pla-anio": new InputSelectParamConfig({
            options:["1","2","3"]
          }),
          "dis_pla-semestre": new InputSelectParamConfig({
            options:["1","2"]
          }),
          "nota_final": new  InputTextConfig(),
          "crec": new InputTextConfig(),
          "cur_com_cal-anio": new ControlDateConfig(
            {label:"Año Calendario", format:"yyyy"}
            
          ),
          "cur_com_cal-semestre": new ControlValueConfig(
            {label:"Semestre Calendario"}
          ),
        }
      )
    }
  )

  queryData(): Observable<any> {
    /** 
     * Se van a filtrar las consultas de calificaciones para devolver solo las del plan correspondiente, ordenadas por anio y tramo
     */
    return this.relFk.uniqueConfig(this.entityName, this.display$.value, this.config.controls).pipe(
      switchMap(
        row => {
          return this.queryCalificacion(row)
        }
      ),
    )
    //return this.dd.unique(this.entityName, this.display$.value) 
    //return this.dd.post(this.queryApi, this.entityName, this.display$.value);
  }

  queryCalificacion(data): Observable<any>{

    if(!data["alumno"]["plan"]) {
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "No se encuentra definido el plan del alumno"}
      })
      return of(data)
    }

    if(!data["alumno"]["id"]) return of([]);
    var display = new Display();
    display.setCondition([
      ["alumno","=",data["alumno"]["id"]],
      ["dis_pla-plan","=",data["alumno"]["plan"]]
    ])
    display.setOrder({"dis_pla-anio":"asc","dis_pla-semestre":"asc"})
    return this.dd.post("ids","calificacion", display).pipe(
      switchMap(
        ids => this.rel.getAllConfig("calificacion", ids, this.config.controls["calificacion/alumno"].controls)
      ),
      map(
        rows => {
          console.log(rows)
          data["calificacion/alumno"] = rows
          return data;
        }
      )

    )  
  }


  persist(): Observable<any> {
    /**
     * Persistencia
     * Se define un metodo independiente para facilitar la redefinicion
     * @return "datos de respuesta (habitualmente array de logs)"
     */
    return this.dd._post("persist_calificaciones_alumno", this.entityName, this.serverData())
  }

  

  ngOnInit(){
    super.ngOnInit()
    this.config.controls["per"].optTitle[0].control = this.form.controls["alumno"];
    this.config.controls["per"].optTitle[1].control = (this.form.controls["alumno"] as FormGroup).controls["id"];
  }


  switchOptField(data: any){
    switch(data.action){
      case "generar_calificacion_alumno":
        var s = this.dd.post("generar_calificacion_alumno", "alumno", data.control.value).subscribe(
          response => {
            this.response = response
            this.submitted()   
          }
        )
        this.subscriptions.add(s)
      break;
      default: super.switchOptField(data)
    }
  }


}


