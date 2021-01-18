import { Injectable } from '@angular/core';
import { Parser } from '@class/parser';

import { _DataDefinitionLabelService } from '@service/data-definition-label/_data-definition-label.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataDefinitionLabelService extends _DataDefinitionLabelService{ 
  constructor(protected dd: DataDefinitionToolService){ 
    super(dd) 
  }

  label(entityName: string, id: string): Observable<string> {
    var l = super.label(entityName, id);
    if(l) return l;
    switch(entityName){
      case "calendario_as": return this.labelCalendarioAs(id);  
    }
  }

  labelCalendarioAsRow (row: any): string {
    if(!row) return null;
    let ret = "";
    if (row["anio"]) ret = Parser.dateFormat(row["anio"], 'Y');
    if (row["semestre"]) ret = ret + "-"+row["semestre"];
    return ret;
  }

  labelCalendarioAs(id: string): Observable<any> {
    return this.dd.get("calendario", id).pipe(
      switchMap(
        row => {
          if(!row) return of(null);
          return combineLatest([
            of(this.labelCalendarioAsRow(row)),
          ])
        }
      ),
      map(
        response => { return (!response)? null : response.join(" "); }
      )
    );
  }

  labelCurso(id: string): Observable<any> {
    return this.dd.get("curso", id).pipe(
      switchMap(
        curso => {
          return this.dd.getColumnData(curso,"asignatura","asignatura",{asignatura:"nombre"})
        }
      ),
      switchMap(
        curso => {
          return this.dd.getColumnData(curso,"comision","comision",{division:"division",sede:"sede",planificacion:"planificacion"})
        }
      ),
      switchMap(
        curso => {
          return this.dd.getColumnData(curso,"planificacion","planificacion",{anio:"anio",semestre:"semestre"})
        }
      ),
      switchMap(
        curso => {
          return this.dd.getColumnData(curso,"sede","sede",{numero_sede:"numero"})
        }
      ),
      map(
        curso => { 
          return (!curso)? null : curso["numero_sede"]+curso["division"]+"/"+curso["anio"]+curso["semestre"]+" "+curso["asignatura"]; 
        }
      )
    );
  }


  labelComision(id: string): Observable<any> {
    return this.dd.get("comision", id).pipe(
      switchMap(
        curso => {
          return this.dd.getColumnData(curso,"planificacion","planificacion",{anio:"anio",semestre:"semestre"})
        }
      ),
      switchMap(
        curso => {
          return this.dd.getColumnData(curso,"sede","sede",{numero_sede:"numero"})
        }
      ),
      map(
        curso => { 
          return (!curso)? null : curso["numero_sede"]+curso["division"]+"/"+curso["anio"]+curso["semestre"]; 
        }
      )
    );
  }
  
}
