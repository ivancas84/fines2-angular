import { Component } from '@angular/core';
import { CardComponent } from '@component/card/card.component';
import { Observable, of } from 'rxjs';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
})
export class CursoCardComponent extends CardComponent {

  comision$: Observable<any>;
  asignatura$: Observable<any>;

  constructor(
    protected dd: DataDefinitionService,
  ) {
    super();
  }

  ngOnInit(): void {

    this.comision$ = this.data$.pipe(mergeMap(
      curso => {
        if(isEmptyObject(curso) || !curso.hasOwnProperty('comision') || !curso['comision']) return of(null);
        return this.dd.get('comision', curso['comision']);        
      }
    ));

    this.asignatura$ = this.data$.pipe(mergeMap(
      curso => {
        if(isEmptyObject(curso) || !curso.hasOwnProperty('asignatura') || !curso['asignatura']) return of(null);
        return this.dd.get('asignatura', curso['asignatura']);        
      }
    ));

  }

}
