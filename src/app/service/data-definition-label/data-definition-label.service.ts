import { Injectable } from '@angular/core';
import { Parser } from '@class/parser';

import { _DataDefinitionLabelService } from '@service/data-definition-label/_data-definition-label.service';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataDefinitionLabelService extends _DataDefinitionLabelService{ 

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
  
}
