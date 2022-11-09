import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { arrayObjectsMerge } from '@function/array-objects-merge';
import { BehaviorSubject, first, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { ComponentSearchService } from '@service/component/component-search-service';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { markAllAsTouched } from '@function/mark-all-as-touched';
import { MatDialog } from '@angular/material/dialog';
import { datePickerYearGroupKey, loadSearchControl } from '@function/component';


@Component({
  selector: 'core-table',
  templateUrl: './info-cursos.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  .item { padding:0px 10px;  }
  `],
})
export class InfoCursosComponent implements OnInit {

  datePickerYearGroupKey = datePickerYearGroupKey

  entityName: string = "curso"
  
  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display)
  /**
   * Se define como BehaviorSubject para facilitar la definicion de metodos 
   * avanzados, por ejemplo reload, clear, restart, etc.
   */

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  loadSearch$!: Observable<any> //carga de display

  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts

  /**
   * Estructura principal para administrar un array de elementos
   */
  control: FormArray = this.fb.array([]);

  length!: number; //longitud total de los datos a mostrar
   
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga

  controlSearch: FormGroup = this.fb.group({
    "calendario-anio":this.fb.control(""),
    "calendario-semestre":this.fb.control(""),
    "comision-autorizada":this.fb.control(""),
  });

  @ViewChild(MatExpansionPanel) searchPanel!: MatExpansionPanel;
  isSubmittedSearch: boolean = false;

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute, 
    protected fb: FormBuilder,
    protected dialog: MatDialog, 
    protected componentTools: ComponentSearchService,
  ) { }

  initData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entityName: this.entityName, ids, fields: [
              "id",
              "comision-division",
              "sede-nombre",
              "sede-numero",
              "domicilio-calle",
              "domicilio-entre",
              "domicilio-numero",
              "domicilio-barrio",
              "asignatura-nombre",
              "planificacion-anio",
              "planificacion-semestre",
              "plan-orientacion"
            ]
          })
      ),
      switchMap(
        response =>   this.dd.postMergeAll({ data: response, method: "info", entityName: "curso_toma_activa", fields: { "toma": "toma_activa" }, fieldNameData: "id", fieldNameResponse: "curso" })
      ),
      switchMap(
        response =>   {
          var ids = arrayColumn(response, "toma")
          return this.dd.entityFieldsGetAll({
              entityName: "toma", ids, fields: [
                "id",
                "fecha_toma",
                "docente-nombres",
                "docente-apellidos",
                "docente-numero_documento",
                "docente-telefono",
              ]
            }).pipe(
            map(
              data => arrayObjectsMerge(response, data, "toma", "id", "toma_")
            )
          )
        }
      ),
      switchMap(
        response => this.dd.postMergeAll({ data: response, method: "info", entityName: "curso_horario", fields: { "horario": "horario" }, fieldNameData: "id", fieldNameResponse: "curso" })
      ),
      switchMap(
        data =>   {
           return this.dd.postMergeAll({ data, method: "info", entityName: "cantidad_alumnos_activos_comision", fields: { "cantidad_alumnos": "cantidad" }, fieldNameData: "comision", fieldNameResponse: "comision" })
        }
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["sede-label"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
            element["comision-label"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
            element["tramo"] =  element["planificacion-anio"] + "º" + element["planificacion-semestre"] + "º " + element["plan-orientacion"]
            element["domicilio-label"] =  element["domicilio-calle"];
            if(element["domicilio-entre"]) element["domicilio"] +=  " e/ " + element["domicilio-entre"]
            element["domicilio"] +=  " nº " + element["domicilio-numero"] 
            if(element["domicilio-barrio"]) element["domicilio"] +=  " " + element["domicilio-barrio"]
            if(element["toma_docente-nombres"]) element["toma_docente-label"] = element["toma_docente-apellidos"] + ", " + element["toma_docente-nombres"] + " " + element["toma_docente-numero_documento"]
          })
          return data;
        }
      )
    )
  }

  formGroup(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
      "toma":this.fb.control(""),
      "comision":this.fb.control(""),
      "toma_fecha_toma": this.fb.control(""),
      "sede-label":this.fb.control(""),
      "domicilio-label":this.fb.control(""),
      "comision-label":this.fb.control(""),
      "tramo":this.fb.control(""),
      "cantidad_alumnos":this.fb.control(""),
      "asignatura-nombre":this.fb.control(""),
      "horario":this.fb.control(""),
      "toma_docente-label":this.fb.control(""),
      "toma_docente-telefono":this.fb.control(""),
    })
  }
  
  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
    this.loadSearch$ = loadSearchControl(this.controlSearch, this.display$)    
  }

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          var display = new Display();
          display.setParamsByQueryParams(queryParams);
          display.setOrder({
            "sede-numero":"asc", 
            "sede-nombre":"asc",
            "planificacion-anio":"asc",
            "planificacion-semestre":"asc",
            "comision":"asc"
          })
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
    

  onSubmitSearch() {
    this.isSubmittedSearch = true;
 
    if (this.controlSearch.pending) {
      this.controlSearch.statusChanges.pipe(first()).subscribe(() => {
        if (this.controlSearch.valid) this.submitSearch()
      });
    } else this.submitSearch();
  }

  submitSearch(): void {
    if (!this.control.valid) {
      markAllAsTouched(this.controlSearch);
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "El formulario posee errores."}
      });
      this.isSubmittedSearch = false;
    } else {
      this.componentTools.searchAndNavigateByUrl(this.controlSearch.value, this.display$.value, this.searchPanel)
    }
  }
  
  
}



  
  
