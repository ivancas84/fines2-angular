import { Component, SimpleChanges } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map, tap, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-cr-comision-table',
  templateUrl: './comision-table.component.html',
  styles:[`
  #comisiones mat-card{
    width: 100%;
    height: 100%;
  }
  
  .comision-bg-light {
    background: #d6d6c2;
  }
  
  .comision-bg-dark {
    background: #C0C0C0;
  }
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
  `],
})
export class CrComisionTableComponent extends TableComponent { 
  displayedColumns: string[] = ['comision', 'detalle'];
  load$: Observable<any>;
  load: boolean;
  data$: BehaviorSubject<any> = new BehaviorSubject(null);
  dataSource: any;
  
  constructor(
    protected dt: DataToolsService, 
    protected router: Router,
  ) {
    super(router);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['data'] && changes['data'].previousValue != changes['data'].currentValue ) {    
        this.data$.next(changes['data'].currentValue);
    }
  }

  ngOnInit(): void {
    this.load$ = this.data$.pipe(      
      switchMap(
        comisiones => {
          this.load = false;
          return this.dt.asignarCursosAComisionesTomasActivas(comisiones);
        }
      ),
      map(
        data => {
          this.dataSource = data;
          return this.load = true;
        }
      )
    )
  }
  

}
