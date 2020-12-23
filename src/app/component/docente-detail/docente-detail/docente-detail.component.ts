import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DetailComponent } from '@component/detail/detail.component';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FieldConfig } from '@class/field-config';


@Component({
  selector: 'app-docente-detail',
  templateUrl: './docente-detail.component.html',
})
export class DocenteDetailComponent extends DetailComponent {
  readonly entityName: string = "docente";

  fieldsConfig: FieldConfig[] = [
    {
      field:"nombres",
      label:"Nombres",
      widthXs:"25%",
      widthMd:"50%",
    },
    {
      field:"apellidos",
      label:"Apellidos",
      widthXs:"25%",
      widthMd:"50%",
    },
    {
      field:"fecha_nacimiento",
      label:"Fecha Nacimiento",
      type:"date",
      format:"dd/MM/yyyy",
      widthXs:"25%",
      widthMd:"50%",
    },
    {
      field:"numero_documento",
      label:"Numero Documento",
      widthXs:"25%",
      widthMd:"50%",
    },
    {
      field:"cuil",
      label:"Cuil",
      widthXs:"25%",
      widthMd:"50%",
    },
    
    {
      field:"telefono",
      label:"Telefono",
      widthXs:"25%",
      widthMd:"50%",
    },
    {
      field:"email",
      label:"Email",
      widthXs:"25%",
      widthMd:"50%",
    },
    {
      field:"email_abc",
      label:"Email Abc",
      widthXs:"25%",
      widthMd:"50%",
    },
    
  ];  




  tomasColumns = [
    {
      field:"fecha_toma",
      label:"Fecha Toma",
      type:"date",
      format: "dd/MM/yyyy",
      routerLink:"toma-detail",
      queryParamField:"toma",
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

