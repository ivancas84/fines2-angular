import { Component } from '@angular/core';
import { CardComponent } from '@component/card/card.component';
import { Observable, of } from 'rxjs';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-ta-curso-card',
  templateUrl: './ta-curso-card.component.html',
})
export class TaCursoCardComponent extends CardComponent {

  curso$: Observable<any>;
  //comision$: Observable<any>;
  //asignatura$: Observable<any>;

  constructor(
    protected dd: DataDefinitionService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.curso$ = this.data$.pipe(mergeMap(
      toma => {
        if(isEmptyObject(toma) || !toma.hasOwnProperty('curso') || !toma['curso']) return of(null);
        return this.dd.get('curso', toma['curso']);        
      }
    ));

    /*
    this.asignatura$ = this.data$.pipe(mergeMap(
      curso => {
        if(isEmptyObject(curso) || !curso.hasOwnProperty('asignatura') || !curso['asignatura']) return of(null);
        return this.dd.get('asignatura', curso['asignatura']);        
      }
    ));
    */
  }

}
