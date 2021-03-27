import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableComponent } from '@component/table/table.component';
import { mergeMap, map, tap, first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataToolsService } from '@service/data-tools.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FieldTreeElement } from '@class/field-tree-element';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { recursiveData } from '@function/recursive-data';
import { arrayColumn } from '@function/array-column';
import { Display } from '@class/display';

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
          return this.ddt.getAllColumnDataUm(data,"id","comision","curso")
        }
      ),
      switchMap(
        data => {
          return this.ddt.getTree(["_curso"],data,"getAllColumnDataUm",{fieldName:"id",fkName:"curso",entityName:"toma"});
        }
      ),
      switchMap(
        data => {
          return this.alumnosActivos(data);
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


  alumnosActivos(
    data: { [index: string]: any }[], 
  ): Observable<{ [index: string]: any }[]>{
    /**
     * Consulta avanzada de relaciones con agrupamiento
     * Define "ids" filtra el campo "id" del parametro "data"
     * Define "display.fields", asigna el parametro fields
     * Define "display.group", asigna el parametro fieldName
     * Define "display.condition", utiliza el parametro "fieldName" y el array ids
     * Consulta entidad indicada en parametro "entityName" para obtener "response"
     * Realiza asociacion entre "data" y "response"
     * Si data[i]["id"] == response[j][fieldName] almacena en data los campos indicados en parametro "fieldsResponse"
     * "fieldsResponse" es un objeto de la forma {nombre_identificacion:nombre_field}
     * si "nombre_field" es un array realiza un join utilizando el parametro "join"
     * A diferencia de las consultas no avanzadas, se especifican los fields directamente en la consulta y se retornan dichos fields que seran asignados
     * Tiene la ventaja de que se reducen los parametros, pero como desventaja no utilizan el storage para las entities.
     */

    var ids = arrayColumn(data, "id")
    for(var i = 0; i < data.length; i++) data["alumnos"] = 0;
    if(!ids.length) return of(data);
    var display = new Display();
    display.setSize(0);
    display.setFields({alumnos:"count"});
    display.setGroup(["comision"]);
    display.addCondition(["comision","=",ids]);
    display.addCondition(["activo","=",true]);
    return this.ddt.post("advanced","alumno", display).pipe(
      map(
        response => {
          for(var i = 0; i < data.length; i++){
            for(var j = 0; j < response.length; j++){
              if(data[i]["id"] == response[j]["comision"]) {
                data[i]["alumnos"] = response[j]["alumnos"];
                break;
              }
            }
          }
          return data;
        }
      )
    );  
  }


}
