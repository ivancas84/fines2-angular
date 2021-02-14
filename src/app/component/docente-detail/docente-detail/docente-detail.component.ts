import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DetailComponent } from '@component/detail/detail.component';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FieldViewOptions } from '@class/field-view-options';


@Component({
  selector: 'app-docente-detail',
  templateUrl: './docente-detail.component.html',
})
export class DocenteDetailComponent extends DetailComponent {
  readonly entityName: string = "docente";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"nombres",
      label:"Nombres",
    }),
    new FieldViewOptions({
      field:"apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"fecha_nacimiento",
      label:"Fecha Nacimiento",
      type:"date",
      format:"dd/MM/yyyy",
    }),
    new FieldViewOptions({
      field:"numero_documento",
      label:"Numero Documento",
    }),
    new FieldViewOptions({
      field:"cuil",
      label:"Cuil",
    }),
    
    new FieldViewOptions({
      field:"telefono",
      label:"Telefono",
    }),
    new FieldViewOptions({
      field:"email",
      label:"Email",
    }),
    new FieldViewOptions({
      field:"email_abc",
      label:"Email Abc",
    }),
    
  ];  




  tomasColumns = [
    {
      field:"fecha_toma",
      label:"Fecha Toma",
      type:"date",
      format: "dd/MM/yyyy",
      routerLink:"toma-detail",
      queryParamField:"id",
    },
    {
      field:"fecha_fin",
      label:"Fecha Fin",
      type:"date",
      format:"dd/MM/yyyy"
    },
    {
      field:"estado",
      label:"Estado",
    },
    {
      field:"estado_contralor",
      label:"Estado Contralor",
    },
    {
      field:"numero_sede",
      label:"Número",
    },
    {
      field:"nombre_sede",
      label:"Sede",
    },
    {
      field:"nombre_asignatura",
      label:"Asignatura",
    },
    {
      field:"horas_catedra",
      label:"Horas Cátedra",
    },
    {
      field:"numero_comision",
      label:"Comision",
      routerLink:"comision-admin",
      queryParamField:"comision",
    },
    {
      field:"tramo",
      label:"Tramo",
    },
    {
      field:"numero_planilla_docente",
      label:"Planilla Docente",
    },

  ];

  
  constructor(
    protected route: ActivatedRoute,
    protected location: Location,
    protected ddt: DataDefinitionToolService,
    protected dialog: MatDialog
  ) {
    super(route, location, ddt, dialog);

  }

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
        () => {return this.initTomas();}
      ), 
      map(
        () => { return this.load = true;}
      )
    )
  }

  tomas: { [index: string]: any }[] = []; //datos de tomas

  initTomas(): Observable<any>{
    var display = new Display;
    display.addCondition(["docente","=", this.data["id"]]);
    display.addOrder("fecha_toma","desc");

    return this.ddt.all("toma",display).pipe( 
      switchMap(
        tomas => {return this.ddt.advancedColumnDataGroup(tomas, "toma", "asignacion_planilla_docente", ["planilla_docente.max"], {toma:"toma",ultima_planilla_docente:"planilla_docente_max"})}
      ),   
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "ultima_planilla_docente", "planilla_docente",{numero_planilla_docente:"numero"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "curso", "curso",{comision:"comision", asignatura:"asignatura", horas_catedra:"horas_catedra" })}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "asignatura", "asignatura",{nombre_asignatura:"nombre"})}
      ),
      switchMap(
        tomas => {return this.ddt.advancedColumnData(tomas, "comision", "comision",{calendario:"calendario", sede:"sede", numero_comision:"numero", tramo:"tramo"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "calendario", "calendario",{fecha_fin:"fin"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "sede", "sede",{numero_sede:"numero",nombre_sede:"nombre"})}
      ),
      
      map(
        tomas => {
          return this.tomas = tomas;
        }
      )
    );
  }

}

