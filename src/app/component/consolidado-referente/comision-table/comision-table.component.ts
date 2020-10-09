import { Component } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map, tap, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';

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

  constructor(
    protected dt: DataToolsService, 
    protected router: Router,
  ) {
    super(router);
  }

  initData(){
    this.load=false;
    return this.data$.pipe(
      switchMap(
        comisiones => {
          return this.dt.asignarCursosAComisionesTomasActivas(comisiones)
        }
      )
    )
  }

    

  
   
  

}
