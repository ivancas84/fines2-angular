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
  constructor(protected override dd: DataDefinitionToolService){ 
    super(dd) 
  }

  override label(entityName: string, id: string): Observable<string> {
    if(!id) return of("");
    var l = super.label(entityName, id);
    if(l) return l;
    switch(entityName){
      case "calendario_as": return this.labelCalendarioAs(id);
      default: return of("");  
    }
  }

  override labelCalendarioRow (row: any): string {
    if(!row) return "";
    let ret = "";
    if (row["anio"]) ret = Parser.dateFormat(row["anio"], 'Y');
    if (row["semestre"]) ret = ret + "-"+row["semestre"];
    if (row["descripcion"]) ret = ret + " "+row["descripcion"];

    return ret.trim();
  }


  labelCalendarioAsRow (row: any): string {
    if(!row) return "";
    let ret = "";
    if (row["anio"]) ret = Parser.dateFormat(row["anio"], 'Y');
    if (row["semestre"]) ret = ret + "-"+row["semestre"];
    return ret;
  }

  labelCalendarioAs(id: string): Observable<string> {
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
        response => { return (!response)? "" : response.join(" "); }
      )
    );
  }

  override labelCurso(id: string): Observable<string> {
    return this.dd.get("curso", id).pipe(
      switchMap(
        curso => {
          return this.dd.getConnection(curso,"asignatura",{codigo:"codigo"})
        }
      ),
      switchMap(
        curso => {
          return this.dd.getConnection(curso,"comision",{division:"division",sede:"sede",planificacion:"planificacion"})
        }
      ),
      switchMap(
        curso => {
            return this.dd.getConnection(curso,"planificacion",{anio:"anio",semestre:"semestre"})
        }
      ),
      switchMap(
        curso => {
          return this.dd.getConnection(curso,"sede",{numero_sede:"numero", nombre_sede:"nombre"})
        }
      ),
      map(
        curso => { 
          return (!curso)? "" : curso["numero_sede"]+curso["division"]+"/"+curso["anio"]+curso["semestre"]+" "+curso["codigo"]+ " ("+curso["horas_catedra"] + ")"; 
        }
      )
    );
  }



  override labelDomicilioRow (row: any): string {
    if(!row) return "";

    let ret = row["calle"] + " N° " + row["numero"];

    if (row["entre"]) ret += " entre " + row["entre"];

    return ret.trim();
  }

  override labelPersonaRow (row: any): string {
    if(!row) return "";

    let ret = "";
    if (row["nombres"]) ret = ret.trim() + " " + row["nombres"];

    if (row["apellidos"]) ret = ret.trim() + " " + row["apellidos"];

    if (row["cuil"]) ret = ret.trim() + " " + row["cuil"];

    if (!row["cuil"] && row["numero_documento"]) ret = ret.trim() + " " + row["numero_documento"];
    return ret.trim();
  }
  
}
