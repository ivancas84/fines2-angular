import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Observable, of } from 'rxjs';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';

@Component({
  selector: 'app-comision-curso-grid',
  templateUrl: './comision-curso-grid.component.html',
})
export class ComisionCursoGridComponent extends ShowElementComponent {
  cursos$: Observable<any>;
 
  constructor(
    protected dd: DataDefinitionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.cursos$ = this.data$.pipe(mergeMap(
      comision => {   
        if(comision && comision.hasOwnProperty("id") && comision["id"]) {
          if(isEmptyObject(comision)) return of(null);

          return this.dd.data("cursos_con_horarios_de_comision", comision["id"]).pipe(mergeMap(
            cursos_con_horarios => {
              var d = new Display();
              d.setParams({"comision":comision["id"]});
              d.setOrder({"asi_nombre":"asc"});

              if(cursos_con_horarios && cursos_con_horarios.length){
                var idCursos = arrayColumn(cursos_con_horarios,"curso");
                d.addCondition(["id","!=",idCursos]);
              }
              
              return this.dd.all("curso", d);  
            }
          ))
        }
      }
    ));
  }
 
}
