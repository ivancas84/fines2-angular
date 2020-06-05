import { Component } from '@angular/core';
import { CardComponent } from '@component/card/card.component';
import { Observable, of } from 'rxjs';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { mergeMap } from 'rxjs/operators';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-comision-card',
  templateUrl: './comision-card.component.html',
})
export class ComisionCardComponent extends CardComponent {

  sede$: Observable<any>;
  plan$: Observable<any>;
  modalidad$: Observable<any>;
  comisionSiguiente$: Observable<any>;

  constructor(
    protected dd: DataDefinitionService,
  ) {
    super();
  }

  ngOnInit(): void {

    this.sede$ = this.data$.pipe(mergeMap(
      comision => {
        if(isEmptyObject(comision) || !comision.hasOwnProperty('sede') || !comision['sede']) return of(null);
        return this.dd.get('sede', comision['sede']);        
      }
    ));

    this.plan$ = this.data$.pipe(mergeMap(
      comision => {
        if(isEmptyObject(comision) || !comision.hasOwnProperty('plan') || !comision['plan']) return of(null);
        return this.dd.get('plan', comision['plan']);        
      }
    ));

    this.modalidad$ = this.data$.pipe(mergeMap(
      comision => {
        if(isEmptyObject(comision) || !comision.hasOwnProperty('modalidad') || !comision['modalidad']) return of(null);
        return this.dd.get('modalidad', comision['modalidad']);        
      }
    ));

    this.comisionSiguiente$ = this.data$.pipe(mergeMap(
      comision => {
        if(isEmptyObject(comision) || !comision.hasOwnProperty('comision_siguiente') || !comision['comision_siguiente']) return of(null);
        return this.dd.get('comision', comision['comision_siguiente']);        
      }
    ));

  }

}
