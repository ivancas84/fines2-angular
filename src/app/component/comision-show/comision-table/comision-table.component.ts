import { Component } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';

@Component({
  selector: 'app-comision-table',
  templateUrl: './comision-table.component.html',
  styles:[`
  .comision {
    background: #C0C0C0;
  }
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
  `],
})
export class ComisionTableComponent extends TableComponent { 
  displayedColumns: string[] = ['comision', 'detalle'];

  constructor(
    protected dt: DataToolsService, 
    protected router: Router,
  ) {
    super(router);
  }

  initData(){
    return this.data$.pipe(
      mergeMap(
        comisiones => {
          return this.dt.asignarCursosAComisiones(comisiones)
        }
      )
    )
  }

    

  
   
  

}
