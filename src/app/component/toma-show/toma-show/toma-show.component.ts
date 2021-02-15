import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FieldDateOptions, FieldLabelOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldViewOptions } from '@class/field-view-options';
import { ShowComponent } from '@component/show/show.component';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-toma-show',
  templateUrl: './toma-show.component.html',
})
export class TomaShowComponent extends ShowComponent {

  readonly entityName: string = "toma";

  constructor(
    protected ddt: DataDefinitionToolService,
    protected route: ActivatedRoute,
    protected dialog: MatDialog
  ) {
    super(ddt, route, dialog);

  }
  
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
      type: new FieldLabelOptions({entityName:"curso"}),
      aux: new RouterLinkOptions({path:"curso-admin", params:{id:"{{curso}}"}})
    },
    {
      field:"docente",
      label:"Docente",
      type: new FieldLabelOptions({entityName:"persona"}),
      aux: new RouterLinkOptions({path:"docente-detail", params:{id:"{{docente}}"}})
    },
    {
      field:"reemplazo",
      label:"Reemplazo",
      type: new FieldLabelOptions({entityName:"persona"}),
      aux: new RouterLinkOptions({path:"docente-detail", params:{id:"{{reemplazo}}"}})
    },
    {
      field:"numero_planilla_docente",
      label:"Planilla Docente",
      sortDisabled:true
    },
  ];  


  queryData(): Observable<any>{
    return this.ddt.all("toma",this.display).pipe( 
      switchMap(
        tomas => {
          return this.ddt.advancedColumnDataGroup(tomas, "toma", "asignacion_planilla_docente", ["planilla_docente.max"], {ultima_planilla_docente:"planilla_docente_max"})}
      ),   
      switchMap(
        tomas => {
          return this.ddt.getAllColumnData(tomas, "ultima_planilla_docente", "planilla_docente",{numero_planilla_docente:"numero"})}
      ),
      switchMap(
        tomas => {
          return this.ddt.getAllColumnData(tomas, "curso", "curso",{comision:"comision", asignatura:"asignatura", horas_catedra:"horas_catedra" })}
      ),
      switchMap(
        tomas => {
          return this.ddt.getAllColumnData(tomas, "asignatura", "asignatura",{nombre_asignatura:"nombre"})}
      ),
      switchMap(
        tomas => {
          return this.ddt.advancedColumnData(tomas, "comision", "comision",{calendario:"calendario", sede:"sede", numero_comision:"numero", tramo:"tramo"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "calendario", "calendario",{fecha_fin:"fin"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "sede", "sede",{numero_sede:"numero",nombre_sede:"nombre"})}
      )
    )
   }

}

