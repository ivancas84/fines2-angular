import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map, tap, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FieldTreeElement } from '@class/field-tree-element';

@Component({
  selector: 'app-comision-table',
  templateUrl: './comision-table.component.html',
  styles:[`
  .comision {
    background: #C0C0C0;
  }
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
    .red {
      background-color: #f2a5a5;
    }
    .green {
      background-color: #9dff9d;
    }
    
    .yellow {
      background-color: #ffff9d;
    }
  `],
})
export class ComisionTableComponent extends TableComponent implements OnChanges { 
  displayedColumns: string[] = ['comision', 'detalle'];

  constructor(
    protected dt: DataToolsService, 
    protected router: Router,
  ) {
    super(router);
  }

  load$: Observable<any>;
  load: boolean;
  data$: BehaviorSubject<any> = new BehaviorSubject(null);
  dataSource: any;
  @Input() data;

  planificacionTree = new FieldTreeElement({
    entityName:"planificacion",
    fkName:"plan",
    tree:[
      new FieldTreeElement({
        entityName:"plan",
        fieldNames:["orientacion","distribucion_horaria"],
        join:" - "
      })
    ]
  })

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
          return this.dt.asignarCursosAComisiones(comisiones);
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
