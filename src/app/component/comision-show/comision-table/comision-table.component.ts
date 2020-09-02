import { Component } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';

@Component({
  selector: 'app-comision-table',
  templateUrl: './comision-table.component.html',
  styles:[`
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
    this.load$ = this.data$.pipe(
      mergeMap(
        comisiones => {
          return this.dt.asignarCursosAComisiones(comisiones)
        }
      ),
      map(
        data => {
          console.log(data);
          this.dataSource = data;
          return this.dataSource;
        }
      )
    )
  }

    

  
   
  

}
