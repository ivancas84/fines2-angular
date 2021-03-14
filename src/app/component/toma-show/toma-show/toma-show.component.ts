import { Component } from '@angular/core';
import { FieldDateOptions, TypeLabelOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldViewOptions } from '@class/field-view-options';
import { ShowComponent } from '@component/show/show.component';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-toma-show',
  templateUrl: './toma-show.component.html',
})
export class TomaShowComponent extends ShowComponent {

  readonly entityName: string = "toma";

  fieldsViewOptions: FieldViewOptions[] = [
    {
      field:"fecha_toma",
      label:"Fecha Toma",
      type:new FieldDateOptions(),
    },
    {
      field:"estado",
      label:"Estado",
    },
    {
      field:"observaciones",
      label:"Observaciones",
    },
    {
      field:"comentario",
      label:"Comentario",
    },
    {
      field:"tipo_movimiento",
      label:"Tipo Movimiento",
    },
    {
      field:"estado_contralor",
      label:"Estado Contralor",
    },
    {
      field:"curso",
      label:"Curso",
      type: new TypeLabelOptions({entityName:"curso"}),
      aux: new RouterLinkOptions({path:"curso-admin", params:{id:"{{curso}}"}})
    },
    {
      field:"docente",
      label:"Docente",
      type: new TypeLabelOptions({entityName:"persona"}),
      aux: new RouterLinkOptions({path:"docente-detail", params:{id:"{{docente}}"}})
    },
    {
      field:"reemplazo",
      label:"Reemplazo",
      type: new TypeLabelOptions({entityName:"persona"}),
      aux: new RouterLinkOptions({path:"docente-detail", params:{id:"{{reemplazo}}"}})
    },
    {
      field:"numero_planilla_docente",
      label:"Planilla Docente",
      sortDisabled:true
    },
  ];  


  queryData(): Observable<any>{
    return this.dd.all("toma",this.display).pipe( 
      switchMap(
        tomas => {
          return this.dd.advancedColumnDataGroup(tomas, "toma", "asignacion_planilla_docente", {ultima_planilla_docente:"planilla_docente.max"})}
      ),   
      switchMap(
        tomas => {
          return this.dd.getAllColumnData(tomas, "ultima_planilla_docente", "planilla_docente",{numero_planilla_docente:"numero"})}
      ),
      switchMap(
        tomas => {
          return this.dd.getAllColumnData(tomas, "curso", "curso",{comision:"comision", asignatura:"asignatura", horas_catedra:"horas_catedra" })}
      ),
      switchMap(
        tomas => {
          return this.dd.getAllColumnData(tomas, "asignatura", "asignatura",{nombre_asignatura:"nombre"})}
      ),
      switchMap(
        tomas => {
          return this.dd.advancedColumnData(tomas, "comision", "comision",{calendario:"calendario", sede:"sede", numero_comision:"numero", tramo:"tramo"})}
      ),
      switchMap(
        tomas => {return this.dd.getAllColumnData(tomas, "calendario", "calendario",{fecha_fin:"fin"})}
      ),
      switchMap(
        tomas => {return this.dd.getAllColumnData(tomas, "sede", "sede",{numero_sede:"numero",nombre_sede:"nombre"})}
      )
    )
   }

}

