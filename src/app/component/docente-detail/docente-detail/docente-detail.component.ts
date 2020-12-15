import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DetailComponent } from '@component/detail/detail.component';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-docente-detail',
  templateUrl: './docente-detail.component.html',
})
export class DocenteDetailComponent extends DetailComponent {
  readonly entityName: string = "docente";

  tomasColumns = [
    {
      field:"fecha_toma",
      label:"Fecha Toma",
      type:"date",
      format: "dd/MM/yyyy"
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
      type:"string",
    },
    {
      field:"numero_sede",
      label:"Número",
      type:"string",
    },
    {
      field:"nombre_sede",
      label:"Sede",
      type:"string",
    },
    {
      field:"nombre_asignatura",
      label:"Asignatura",
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
        tomas => {return this.ddt.getAllColumnData(tomas, "curso", "curso",{comision:"comision", asignatura:"asignatura"})}
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

