import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { FormArrayConfig, FormControlConfig, FormGroupConfig } from '@class/reactive-form-config';
import { ControlBooleanConfig } from '@component/control-boolean/control-boolean.component';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { InputAutocompleteConfig } from '@component/input-autocomplete/input-autocomplete.component';
import { RouteIconConfig } from '@component/route-icon/route-icon.component';
import { TableComponent } from '@component/structure/table.component';
import { Observable, switchMap } from 'rxjs';

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
    "alumno": new FormControlConfig()
  })

  comisionControl: FormGroup =  new FormGroup({})
  comisionConfig: FormGroupConfig = new FormGroupConfig({
    "sede": new InputAutocompleteConfig({readonly:true, disabled:true}),
  })

  override ngOnInit(){
    this.comisionConfig.initControl(this.comisionControl)
    super.ngOnInit()
  }

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
      
      // map(
      //   data => {
      //     return this.formatData(data)
      //   }
      // ),
   
    )
  }

  override setData(data: any[]){
    if (!this.length && data.length) this.length = data.length
    this.control.clear();
    for(var i = 0; i <data.length; i++) this.control.push(this.config.factory!.formGroup());
    this.control.patchValue(data)
    if(data.length) this.comisionControl.patchValue(data[0])
  }

  formatData(data: { [x: string]: string; }[]){
    data.forEach((element: { [x: string]: string; }) => {
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




}


  
  
