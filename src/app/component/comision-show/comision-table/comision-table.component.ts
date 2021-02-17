import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map, tap, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FieldTreeElement } from '@class/field-tree-element';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { recursiveData } from '@function/recursive-data';

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
    protected ddt: DataDefinitionToolService,
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
    super.ngOnInit();
    this.load$ = this.data$.pipe(
      switchMap(
        data => {
          this.load = false;
          return this.ddt.getAllColumnDataUm(data,"comision","curso")
        }
      ),
      switchMap(
        data => {
          return this.ddt.getTree(["_curso"],data,"getAllColumnDataUm",{fkName:"curso",entityName:"toma"});
        }
      ),
      switchMap(
        data => {
          return this.ddt.advancedColumnDataGroup(data,"comision","alumno",{alumnos:"count"});
        }
      ),
      switchMap(
        data => {
          return this.ddt.getTree(["_curso"],data,"getPostAllColumnData",{
            method:"info", entityName:"curso_horario",
            fieldNameData:"id",  fieldNameResponse:"curso",
            fields:{horario:"horario"}
          });
        }
      ),
      switchMap(
        data => {
          return this.ddt.getTree(["_curso","_toma"],data,"advancedColumnDataGroup",{
            fieldName:"toma", entityName:"asignacion_planilla_docente",
            fields:{"planilla_docente":"pd-numero.max"}
          });
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
