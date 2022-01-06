import { Component } from '@angular/core';
import { FieldWidthOptions } from '@class/field-width-options';
import { FormControlConfig, FormStructureConfig } from '@class/reactive-form-config';
import { AdminComponent } from '@component/admin/admin.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { FieldsetDynamicConfig } from '@component/fieldset/fieldset-dynamic.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { InputCheckboxConfig } from '@component/input-checkbox/input-checkbox.component';
import { InputSelectConfig } from '@component/input-select/input-select.component';
import { InputTextConfig } from '@component/input-text/input-text.component';
import { TableDynamicConfig } from '@component/table/table-dynamic.component';
import { TextareaConfig } from '@component/textarea/textarea.component';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-comision-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class ComisionAdminComponent extends AdminComponent {
  readonly entityName: string = "comision"; 
  
  queryData(): Observable<any> {
    /**
     * Consulta y definicion de datos
     * Se utilizan dos servicios para definir datos, 
     * cada servicio identifica las relaciones correspondientes de la configuracion (fk o um) 
     * y efectua las acciones correspondientes para obtener y asociar datos
     */
    return this.relFk.uniqueConfig(this.entityName, this.display$.value, this.config.controls).pipe(
      switchMap(
        row => {
          return this.relUm.group(this.entityName, row, this.config.controls)
        }
      ),
      switchMap(
        row => {
          return this.dd.postAllConnection(
            row["curso/comision"], 
            "info",
            "id",
            "curso",
            "curso_horario",
            {"horario":"horario"}
            ).pipe(
              map(
                () => { return row }
              )
            )
        }
      ),
      tap(
        row =>{ console.log(row)}
      )
    )
    //return this.dd.unique(this.entityName, this.display$.value) 
    //return this.dd.post(this.queryApi, this.entityName, this.display$.value);
  }
  
  config: FormStructureConfig = new FormStructureConfig({
    title:"Comision"
  },{
    "comision": new FieldsetDynamicConfig(
      {
        title:"Comisión",
      }, {
        "id": new FormControlConfig({}),
        "sede": new InputAutocompleteConfig({
          label:"Sede",
          entityName:"sede",
          width:new FieldWidthOptions
        }),
        "division": new InputTextConfig({
          label:"División",
          width:new FieldWidthOptions
        }),
        "planificacion": new InputSelectConfig({
          label:"Planificacion",
          entityName:"planificacion" ,
          width:new FieldWidthOptions
        }),
        "modalidad": new InputSelectConfig({
          label:"Modalidad",
          entityName:"modalidad" ,
          width:new FieldWidthOptions
        }),
        "comision_siguiente": new InputAutocompleteConfig({
          label:"Comision Siguiente",
          entityName:"comision_siguiente" ,
          width:new FieldWidthOptions
        }),
        "calendario": new InputAutocompleteConfig({
          label:"Calendario",
          entityName:"calendario" ,
          width:new FieldWidthOptions
        }),
        "turno": new InputTextConfig({
          label:"Turno",
          width:new FieldWidthOptions
        }),
        "autorizada": new InputCheckboxConfig({
          label:"Autorizada",
          width:new FieldWidthOptions
        }),
        "apertura": new InputCheckboxConfig({
          label:"Apertura",
          width:new FieldWidthOptions
        }),
        "publicada": new InputCheckboxConfig({
          label:"Publicada",
          width:new FieldWidthOptions
        }),
        "observaciones": new TextareaConfig({
          label:"Observaciones",
          width:new FieldWidthOptions
        }),
      }
    ),
    "curso/comision": new TableDynamicConfig({title:"Cursos"}, {
        "asignatura": new  InputSelectConfig(
          {entityName:"asignatura"}
        ),
        "horas_catedra": new  InputTextConfig({
          type:"number"
        }),
        "horario": new  ControlValueConfig(
          {readonly:true, disabled:true}
        ),
      }
    )
  })

  ngOnInit(){
    super.ngOnInit();
    this.optFooter.push({
      config: new EventIconConfig({
        icon: "list", //texto del boton
        action: "crear_cursos_comision", //accion del evento a realizar
        color: "primary",
        title:"Crear Cursos Comision",
        fieldEvent: this.optField
      })
    })
  }

  switchOptField(data: any){
    switch(data.action){
      case "crear_cursos_comision": 
        this.crearCursosComision()
        break;
      default: return super.switchOptField(data)
    }
  }


  crearCursosComision(){
    var s = this.dd.post("persist","crear_cursos_comision",this.form.controls["comision"].get("id").value)
    .subscribe(
      response => {
        this.response = response
        this.submitted()        
      },
      error => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    );
    this.subscriptions.add(s);
  }
  
}

