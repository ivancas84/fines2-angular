import { Injectable } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { of, Observable } from 'rxjs';
import { arrayColumn } from '@function/array-column';
import { Display } from '@class/display';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataToolsService {

  constructor(protected dd: DataDefinitionService){ }

  asignarTomasACursos(cursos: any): Observable<any>{
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

  
  asignarHorariosACursos(cursos:any): Observable<any>{
    var ids = arrayColumn(cursos,"id");
    var display = new Display();
    display.setSize(0);
    display.addParam("curso",ids);
    return this.dd.base("curso_horario",ids).pipe(
      map(
        cursoHorario => {
          for(var j = 0; j < cursos.length; j++){
            cursos[j]["horario"] = [];
            for(var i = 0; i < cursoHorario.length; i++) { if(cursos[j]["id"] == cursoHorario[i]["curso"]) cursos[j]["horario"] = cursoHorario[i]["horario"]; }
          }
  
          return cursos;              }
      )
    )
  }
  asignarCursosAComisiones(comisiones: any){
    if(!comisiones || !comisiones.length) return of(null);

    var ids = arrayColumn(comisiones,"id");
    
    var display = new Display();
    display.setSize(0);
    display.addParam("comision",ids);
    return this.dd.all("curso", display).pipe(
      mergeMap(
        cursos => { return this.asignarTomasACursos(cursos); }
      ),
      mergeMap(
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
