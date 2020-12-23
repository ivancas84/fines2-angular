import { Component } from '@angular/core';
import { DetailComponent } from '@component/detail/detail.component';
import { FieldConfig } from '@class/field-config';
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
  
  fieldsConfig: FieldConfig[] = [
    new FieldConfig({
      field:"docente",
      label:"Docente",
      type:"label",
      entityName: "persona",
      routerLink: "persona-detail",
      queryParamField:"docente", 
      widthXs: "50%",
      widthMd: "100%",
    }),

    new FieldConfig({
      field:"reemplazo",
      label:"Reemplazo",
      type:"label",
      entityName: "persona",
      routerLink: "persona-detail",
      queryParamField:"reemplazo", 
      widthXs: "50%",
      widthMd: "100%",
    }),


    new FieldConfig({
      field:"curso",
      label:"Curso",
      type:"label",
      entityName: "curso",
      routerLink: "curso-detail",
      queryParamField:"curso", 
      widthXs: "100%",
      widthMd: "100%",
    }),

    new FieldConfig({
      field:"fecha_toma",
      label:"Fecha Toma",
      type:"date",
      format:"dd/MM/yyyy",
    }),

    new FieldConfig({
      field:"estado",
      label:"Estado",
    }),

    new FieldConfig({
      field:"observaciones",
      label:"Observaciones",
    }),

    new FieldConfig({
      field:"comentario",
      label:"Comentario",
    }),

    new FieldConfig({
      field:"tipo_movimiento",
      label:"Tipo Movimiento",
    }),

    new FieldConfig({
      field:"estado_contralor",
      label:"Estado Contralor",
    }),

    new FieldConfig({
      field:"alta",
      label:"Alta",
      type:"date",
      format:"dd/MM/yyyy HH:mm",
    }),
  ];  

  fieldsConfigApd: FieldConfig[] = [
    {
      field:"insertado",
      label:"Insertado",
      type:"date",
      format:"dd/MM/yyyy HH:mm"
    },
    {
      field:"planilla_docente",
      label:"Planilla Docente",
      type:"label",
      entityName: "planilla_docente",
      routerLink: "asignacion-planilla-docente-admin",
      queryParamField:"id", 
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

