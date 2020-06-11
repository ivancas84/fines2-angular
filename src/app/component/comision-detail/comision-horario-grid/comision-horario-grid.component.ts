import { Component, OnInit } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Display } from '@class/display';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comision-horario-grid',
  templateUrl: './comision-horario-grid.component.html',
})
export class ComisionHorarioGridComponent extends ShowElementComponent implements OnInit {
  cursos$: Observable<any>;
 
  constructor(
    protected dd: DataDefinitionService, protected router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.cursos$ = this.data$.pipe(mergeMap(
      comision => {
    
        if(comision && comision.hasOwnProperty("id") && comision["id"]) {
          if(isEmptyObject(comision)) return of(null);

          var d = new Display();
          d.setParams({"cur_comision":comision["id"]});
          return this.dd.all("horario", d);

        }
      }
    ));
  }
 
}
