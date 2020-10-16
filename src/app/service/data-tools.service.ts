import { Injectable } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { of, Observable } from 'rxjs';
import { arrayColumn } from '@function/array-column';
import { Display } from '@class/display';
import { map, first, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataToolsService {

  constructor(protected dd: DataDefinitionService, protected snackBar: MatSnackBar){ }

  static displayComisionesActuales(){
    var display = new Display();
    display.setSize(100);
    display.addParam("cal_anio", "2020");
    display.addParam("cal_semestre", "2");
    display.addParam("sed_centro_educativo", "1");
    display.addParam("modalidad", "1");
    display.addParam("autorizada", true);
    display.addParam("publicada", true);
    display.setOrder({sed_numero:"asc"})
    return display;
  }

  asignarTomasACursos(cursos: any[]): Observable<any>{
    if(!cursos.length) return of([]);
    var ids = arrayColumn(cursos,"id");
    var display = new Display();
    display.setSize(0);
    display.addParam("curso",ids);
    return this.dd.all("toma", display).pipe(
      map(tomas => {
        for(var j = 0; j < cursos.length; j++){
          cursos[j]["tomas"] = [];
          for(var i = 0; i < tomas.length; i++) { if(cursos[j]["id"] == tomas[i]["curso"]) cursos[j]["tomas"].push(tomas[i]); }
        }

        return cursos;
      }),
    );
  }

  asignarTomasActivasACursos(cursos: any[]): Observable<any>{
    if(!cursos.length) return of([]);
    var ids = arrayColumn(cursos,"id");
    var display = new Display();
    display.setSize(0);
    display.addParam("curso",ids);
    display.addParam("estado","Aprobada");
    return this.dd.all("toma", display).pipe(
      map(tomas => {
        for(var j = 0; j < cursos.length; j++){
          cursos[j]["tomas"] = [];
          for(var i = 0; i < tomas.length; i++) { if(cursos[j]["id"] == tomas[i]["curso"]) cursos[j]["tomas"].push(tomas[i]); }
        }

        return cursos;
      }),
    );
  }
  
  asignarHorariosACursos(cursos:any): Observable<any>{
    if(!cursos.length) return of([]);
    var ids = arrayColumn(cursos,"id");
    var display = new Display();
    display.setSize(0);
    display.addParam("curso",ids);
    return this.dd.post("info","curso_horario",ids).pipe(
      map(
        cursoHorario => {
          for(var j = 0; j < cursos.length; j++){
            cursos[j]["horario"] = [];
            for(var i = 0; i < cursoHorario.length; i++) { if(cursos[j]["id"] == cursoHorario[i]["curso"]) cursos[j]["horario"] = cursoHorario[i]["horario"]; }
          }
  
          return cursos;
        }
      )
    )
  }

  asignarCursosAComisiones(comisiones: any){
    if(!comisiones || !comisiones.length) return of([]);
    var ids = arrayColumn(comisiones,"id");
    var display = new Display();
    display.setSize(0);
    display.addParam("comision",ids);
    return this.dd.all("curso", display).pipe(
      switchMap(
        cursos => { 
          return this.asignarTomasACursos(cursos); }
      ),
      switchMap(
        cursos => { 
          return this.asignarHorariosACursos(cursos); }
      ),
      map(
        cursos => {
          for(var j = 0; j < comisiones.length; j++){
            comisiones[j]["cursos"] = [];
            for(var i = 0; i < cursos.length; i++) { 
              if(comisiones[j]["id"] == cursos[i]["comision"]) comisiones[j]["cursos"].push(cursos[i]); }
          }
  
          return comisiones;
        }
      )
    )
  }

  asignarCursosAComisionesTomasActivas(comisiones: any){
    if(!comisiones || !comisiones.length) return of([]);

    var ids = arrayColumn(comisiones,"id");
    
    var display = new Display();
    display.setSize(0);
    display.addParam("comision",ids);
    return this.dd.all("curso", display).pipe(
      switchMap(
        cursos => { 
          return this.asignarTomasActivasACursos(cursos); }
      ),
      switchMap(
        cursos => { 
          return this.asignarHorariosACursos(cursos); }
      ),
      map(
        cursos => {
          for(var j = 0; j < comisiones.length; j++){
            comisiones[j]["cursos"] = [];
            for(var i = 0; i < cursos.length; i++) { 
              if(comisiones[j]["id"] == cursos[i]["comision"]) comisiones[j]["cursos"].push(cursos[i]); }
          }
  
          return comisiones;
        }
      )
    )
  }

  asignarCursosAComisionesSinTomas(comisiones: any){
    if(!comisiones || !comisiones.length) return of([]);

    var ids = arrayColumn(comisiones,"id");
    
    var display = new Display();
    display.setSize(0);
    display.addParam("comision",ids);
    return this.dd.all("curso", display).pipe(
      switchMap(
        cursos => { return this.asignarHorariosACursos(cursos); }
      ),
      map(
        cursos => {
          for(var j = 0; j < comisiones.length; j++){
            comisiones[j]["cursos"] = [];
            for(var i = 0; i < cursos.length; i++) { 
              if(comisiones[j]["id"] == cursos[i]["comision"]) comisiones[j]["cursos"].push(cursos[i]); }
          }
  
          return comisiones;
        }
      )
    )
  }
}
