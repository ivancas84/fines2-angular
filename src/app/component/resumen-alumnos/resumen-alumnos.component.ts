import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { AbstractControlViewOption } from '@component/abstract-control-view/abstract-control-view.component';
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { EventIconConfig } from '@component/event-icon/event-icon.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { TableComponent } from '@component/structure/table.component';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-resumen-alumnos',
  templateUrl: './resumen-alumnos.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  `],
})
/**
 * Resumen alumnos de una determinada comision.
 * Se requiere el id de comision para generar el listado.
 */
export class ResumenAlumnosComponent extends TableComponent {
  
  override readonly entityName: string = "alumno_comision";


  override config: FormArrayConfig = new FormArrayConfig({
    "id": new FormControlConfig,
    //"ige": new ControlValueConfig,
    "apellidos": new ControlValueConfig,
    "nombres": new ControlValueConfig,
    "numero_documento": new ControlValueConfig,
    "telefono": new ControlValueConfig,
    "activo": new ControlBooleanConfig,
    "anio_ingreso": new ControlValueConfig,
    "estado_inscripcion": new ControlValueConfig,
    "adeuda_legajo": new ControlValueConfig,
    "adeuda_deudores": new ControlValueConfig,
    "observaciones_alumno": new ControlValueConfig,
    "cantidades": new ControlValueConfig,
    "alumno": new FormControlConfig()
  })



  comisionIdControl!: FormControl
  


  override optTitle: AbstractControlViewOption[] = [
    {
      config: new EventIconConfig({
        icon: "123", //icono del boton
        action: "update_anio_ingreso", //accion del evento a realizar
        fieldEvent: this.optField,
        title: "Actualizar año de Ingreso de todos los alumnos"
      })
    },
    {
      config: new EventIconConfig({
        icon: "abc", //icono del boton
        action: "update_plan", //accion del evento a realizar
        fieldEvent: this.optField,
        title: "Actualizar plan de todos los alumnos"
      }),
    },
    {
      config: new EventIconConfig({
        icon: "content_copy", //icono del boton
        action: "copy_content", //accion del evento a realizar
        fieldEvent: this.optField,
        title: "Copiar"
      })
    },
    {
      config: new EventIconConfig({
        icon: "print", //icono del boton
        action: "print_content", //accion del evento a realizar
        fieldEvent: this.optField,
        title: "Imprimir"
      })
    },

  ]; 


  override initParams(params: { [x: string]: any }){ 
    this.params = params; 
    
    if(!this.params.hasOwnProperty("comision")) {
      var error = "No esta definido el id de comisión"
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: error}
      });
      throw new Error(error)
    }
  }

  override initDisplay() {
    var display = new Display();
    display.setSize(100);
    display.setParamsByQueryParams(this.params);
    display.setOrder({"alu_per-apellidos":"asc","alu_per-nombres":"asc"})
    this.display$.next(display)
  }

  override initData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.getAll(this.entityName, ids)
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "alumno", {"anio_ingreso":"anio_ingreso", "estado_inscripcion":"estado_inscripcion", "adeuda_legajo":"adeuda_legajo", "adeuda_deudores":"adeuda_deudores","persona":"persona","observaciones_alumno":"observaciones"}, "alumno")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "persona", {"nombres":"nombres", "apellidos":"apellidos", "numero_documento":"numero_documento","telefono":"telefono"}, "persona")
      ),
      switchMap(
        data => this.dd.getAllConnection(data, "comision", {"sede":"sede"}, "comision")
      ),
      switchMap(
        data => this.dd.postAllConnection(
          data, 
          "cantidad_asignaturas_aprobadas_alumnos_tramo", 
          "alumno", 
          {
            "cantidad_aprobadas_11":"cantidad_aprobadas_11",
            "cantidad_aprobadas_12":"cantidad_aprobadas_12",
            "cantidad_aprobadas_21":"cantidad_aprobadas_21",
            "cantidad_aprobadas_22":"cantidad_aprobadas_22",
            "cantidad_aprobadas_31":"cantidad_aprobadas_31",
            "cantidad_aprobadas_32":"cantidad_aprobadas_32",
            "cantidad_aprobadas":"cantidad_aprobadas"
          }, 
          "alumno", 
          "alumno" 
        )
      ),
      map(
        data => {
         return this.formatData(data)
        }
      ),
   
      tap(
        data => {
          console.log(data)
        }
      ),
    )
  }

  override setData(data: any[]){
    if (!this.length && data.length) this.length = data.length
    this.control.clear();
    for(var i = 0; i <data.length; i++) this.control.push(this.config.factory!.formGroup());
    this.control.patchValue(data)
    this.comisionIdControl = new FormControl(this.params["comision"])
  }

  formatData(data: { [x: string]: string; }[]){
    data.forEach((element: { [x: string]: string; }) => {
      element["cantidades"] = ""
      if(element["cantidad_aprobadas"]) element["cantidades"] = element["cantidad_aprobadas"] + " (" + element["cantidad_aprobadas_11"] + "-" + element["cantidad_aprobadas_12"] + "-" + element["cantidad_aprobadas_21"] + "-" + element["cantidad_aprobadas_22"] + "-" + element["cantidad_aprobadas_31"] + "-" + element["cantidad_aprobadas_32"] + ") ";
      // element["sede"] =  element["nombre"] + " (" + element["numero"] + ")"
      // // element["comision"] =  element["numero"] + element["division"] + "/" + element["anio"] + element["semestre"]
      // element["tramo"] =  element["anio"] + "º" + element["semestre"] + "º " + element["orientacion"]
      // element["domicilio"] =  element["calle"] + " e/ " + element["entre"] + " nº " + element["dom_numero"] + " " + element["barrio"]
    })
    return data;
    }

  



  override optColumn: FormControlConfig[] = [
    new RouteIconConfig(
      {icon:'edit', routerLink:'alumno-admin', params:{'id':'{{alumno}}'}}
    ),
  ]


  override switchOptField($event: { action: any; index: any; }){
    switch($event.action){
      case "update_anio_ingreso": 
        this.updateAlumnoComision("actualizar_anio_alumnos");
        break;
      case "update_plan": 
        this.updateAlumnoComision("actualizar_plan_alumnos");
        break;
      default: super.switchOptField($event);
    }
  }


  protected updateAlumnoComision(api:string){
    var s =  this.dd._post(api,"alumno",this.params["comision"]).subscribe({
      next: response => {
        this.response = response
        this.submitted()        
      },
      error: error => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    });
    this.subscriptions.add(s);
  }



}


  
  
