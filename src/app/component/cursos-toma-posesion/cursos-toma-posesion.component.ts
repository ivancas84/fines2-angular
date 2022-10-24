import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { ComponentSearchService } from '@service/component/component-search-service';
import { ComponentTableService } from '@service/component/component-table-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'core-table',
  templateUrl: './cursos-toma-posesion.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesionComponent implements AfterViewInit {
  entityName: string = "curso"

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display)
  /**
   * Se define como BehaviorSubject para facilitar la definicion de metodos 
   * avanzados, por ejemplo reload, clear, restart, etc.
   */

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display

  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts

  /**
   * Estructura principal para administrar un array de elementos
   */
  control: FormArray = this.fb.array([]);

  length!: number; //longitud total de los datos a mostrar
   
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
 
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns = ["sede","comision","domicilio","asignatura-nombre","tramo","horario","options"]

  serverSortTranslate: { [index: string]: string[] } = {
    sede:["sede-nombre"],
    comision:["sede-numero","comision-division","planificacion-anio","planificacion-semestre"],
    tramo:["planificacion-anio","planificacion-semestre"]};

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute, 
    protected fb: FormBuilder,
    protected searchService: ComponentSearchService,
    protected tableService: ComponentTableService,
  ) { }
  
  ngAfterViewInit(): void {
    var s = this.tableService.ngAfterViewInit(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
  }

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          var display = new Display();
          display.setParams(
            {"calendario-anio":"2022","calendario-semestre":2,"comision-autorizada":true}
          )
          display.setSize(0);
          display.setOrder({"sede-numero":"asc", "sede-nombre":"asc","planificacion-anio":"asc","planificacion-semestre":"asc","comision":"asc"})
          //display.setParamsByQueryParams(this.params);
          this.display$.next(display)
        
          return true;
        },
      ),
    )
  }

  loadDisplay(){
    /**
     * Se define un load independiente para el display, es util para reasignar
     * valores directamente al display y reinicializar por ejemplo al limpiar
     * o resetear el formulario
     */
     this.loadDisplay$ = this.display$.pipe(
     switchMap(
       () => {
         this.load = false
         return this.dd.post("count", this.entityName, this.display$.value);
       }
     ),
     switchMap(
       length => {
        this.length = length
        return (length === 0) ? of([]) : this.initData()
      }
     ),
     map(
       data => {
         this.setData(data)
         return this.load = true;
       }
     ),
   )
 }

  setData(data: any[]){
    if (!this.length && data.length) length = data.length
    this.control.clear();
    for(var i = 0; i <data.length; i++) this.control.push(this.formGroup());
    this.control.patchValue(data)
  }

  initData(): Observable<any>{
    if(this.length === 0) return of([]); 
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll(this.entityName, ids, [
          "id",
          "asignatura-nombre",
          "comision-division",
          "sede-nombre",
          "sede-numero",
          "domicilio-calle",
          "domicilio-entre",
          "domicilio-numero",
          "domicilio-barrio",
          "planificacion-anio",
          "planificacion-semestre",
          "plan-orientacion"
        ])
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_horario",{"horario":"horario"},"id","curso")
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_toma_activa",{"toma":"toma_activa"},"id","curso")
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["sede"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
            element["comision"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
            element["tramo"] =  element["planificacion-anio"] + "º" + element["planificacion-semestre"] + "º " + element["plan-orientacion"]
            element["domicilio"] =  element["domicilio-calle"];
            if(element["domicilio-entre"]) element["domicilio"] +=  " e/ " + element["domicilio-entre"]
            element["domicilio"] +=  " nº " + element["domicilio-numero"] 
            if(element["domicilio-barrio"]) element["domicilio"] +=  " " + element["domicilio-barrio"]
          })
          return data;
        }
      )
    )
  }


  formGroup(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
      "sede":this.fb.control(""),
      "comision":this.fb.control(""),
      "tramo":this.fb.control(""),
      "asignatura-nombre":this.fb.control(""),
      "domicilio":this.fb.control(""),
      "horario":this.fb.control(""),
    })
  }

  onChangeSort(sort: Sort): void {
    this.tableService.onChangeSort(sort, this.length, this.display$.value, this.control, this.serverSortTranslate)
  }

  
}



  
  
