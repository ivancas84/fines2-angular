import { Component, OnInit } from '@angular/core';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { tap, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-consolidado-admin-table',
  templateUrl: './consolidado-admin-table.component.html',
})
export class ConsolidadoAdminTableComponent extends ShowElementComponent implements OnInit {

  readonly entityName = 'comision';
  comisiones$: Observable<any>;

  constructor(protected dd: DataDefinitionService) {
    super();
  }

  asignarTomasACursosYComisiones(comisiones:any, cursos:any): Observable<any>{
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
      mergeMap(
        cursos => {
          return this.dd.data("curso_horario",ids).pipe(
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
    );
  }
  
  asignarCursosAComisiones(comisiones: any){
    if(!comisiones || !comisiones.length) return of(null);

    var ids = arrayColumn(comisiones,"id");
    
    var display = new Display();
    display.setSize(0);
    display.addParam("comision",ids);
    return this.dd.all("curso", display).pipe(
      mergeMap(
        cursos => { return this.asignarTomasACursosYComisiones(comisiones, cursos); }
      )
    )
  }

  ngOnInit(): void {
    this.comisiones$ = this.data$.pipe(
      mergeMap(
        comisiones => {
          return this.asignarCursosAComisiones(comisiones)
        }
      )
    )
  }
}
