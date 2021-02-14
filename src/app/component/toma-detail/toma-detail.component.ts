import { Component } from '@angular/core';
import { DetailComponent } from '@component/detail/detail.component';
import { FieldViewOptions } from '@class/field-view-options';
import { Display } from '@class/display';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Location } from '@angular/common';
import { TableDynamicOptions } from '@class/table-dynamic-options';

@Component({
  selector: 'app-toma-detail',
  templateUrl: './toma-detail.component.html',
})
export class TomaDetailComponent extends DetailComponent {
  readonly entityName: string = "toma";

  constructor(
    protected route: ActivatedRoute,
    protected location: Location,
    protected ddt: DataDefinitionToolService,
    protected dialog: MatDialog
  ) {
    super(route, location, ddt, dialog);

  }
  
  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"docente",
      label:"Docente",
      type:"label",
      entityName: "persona",
      routerLink: "persona-detail",
      queryParamField:"docente", 
      widthGtSm: "33%",
    }),

    new FieldViewOptions({
      field:"curso",
      label:"Curso",
      type:"label",
      entityName: "curso",
      routerLink: "curso-detail",
      queryParamField:"curso", 
      widthGtSm: "34%",
    }),


    new FieldViewOptions({
      field:"reemplazo",
      label:"Reemplazo",
      type:"label",
      entityName: "persona",
      routerLink: "persona-detail",
      queryParamField:"reemplazo",  
      widthGtSm: "33%",
    }),


    
    new FieldViewOptions({
      field:"fecha_toma",
      label:"Fecha Toma",
      type:"date",
      format:"dd/MM/yyyy",
    }),

    new FieldViewOptions({
      field:"estado",
      label:"Estado",
    }),

    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),

    new FieldViewOptions({
      field:"comentario",
      label:"Comentario",
    }),

    new FieldViewOptions({
      field:"tipo_movimiento",
      label:"Tipo Movimiento",
    }),

    new FieldViewOptions({
      field:"estado_contralor",
      label:"Estado Contralor",
    }),

    new FieldViewOptions({
      field:"alta",
      label:"Alta",
      type:"date",
      format:"dd/MM/yyyy HH:mm",
    }),
  ];  

  fieldsViewOptionsApd: FieldViewOptions[] = [
    {
      field:"planilla_docente",
      label:"Planilla Docente",
      type:"label",
      entityName: "planilla_docente",
      routerLink: "asignacion-planilla-docente-admin",
      queryParamField:"id", 
    },
    {
      field:"comentario",
      label:"Comentario",
    },
    {
      field:"reclamo",
      label:"Reclamo",
      type:"si_no",
    },
    
  ];  


  ngOnInit() {
    this.load$ = this.route.queryParams.pipe(
      tap(
        queryParams => { 
          this.load = false; 
          this.initParams(queryParams);
          this.initDisplay()
        }
      ),
      switchMap(
        () => {return this.initData()}
      ), 
      switchMap(
        () => {return this.initAsignacionPlanillaDocente();}
      ), 
      map(
        () => { return this.load = true;}
      )
    )
  }

  dataApd: { [index: string]: any }[] = []; //datos de apd

  initAsignacionPlanillaDocente(): Observable<any>{
    var display = new Display;
    display.addCondition(["toma","=", this.data["id"]]);
    display.addOrder("tom-fecha_toma","desc");

    return this.ddt.all("asignacion_planilla_docente",display).pipe(
      map(
        response => {
          return this.dataApd = response;
        }
      )
    );
  }

}

