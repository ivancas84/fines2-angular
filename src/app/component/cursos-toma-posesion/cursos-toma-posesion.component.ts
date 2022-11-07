import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'core-table',
  templateUrl: './cursos-toma-posesion.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesionComponent {

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  control: FormArray = this.fb.array([]); //control con los valores de la tabla
  length!: number; //longitud total de los datos a mostrar
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
 
  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute, 
    protected fb: FormBuilder,
  ) { }
  

  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
  }

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          var display = new Display().setSize(0).setParams(
            {"calendario-anio":"2022",
            "calendario-semestre":2,
            "comision-autorizada":true
          }).setOrder({
            "sede-numero":"asc", 
            "sede-nombre":"asc",
            "planificacion-anio":
            "asc","planificacion-semestre":"asc",
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
         return this.dd.post("count", "curso", this.display$.value);
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
        if (!this.length && data.length) length = data.length
        this.control.clear();
        for(var i = 0; i <data.length; i++) this.control.push(this.formGroup());
        this.control.patchValue(data)
        return this.load = true;
       }
     ),
   )
  }

  initData(): Observable<any>{
    if(this.length === 0) return of([]); 
    return this.dd.post("ids", "curso", this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entityName: "curso", ids, fields: [
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
            ]
          })
      ),
      switchMap(
        data =>   this.dd.postMergeAll({ data, method: "info", entityName: "curso_horario", fields: { "horario": "horario" }, fieldNameData: "id", fieldNameResponse: "curso" })
      ),
      switchMap(
        data =>   this.dd.postMergeAll({ data, method: "info", entityName: "curso_toma_activa", fields: { "toma": "toma_activa" }, fieldNameData: "id", fieldNameResponse: "curso" })
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

  
}



  
  
