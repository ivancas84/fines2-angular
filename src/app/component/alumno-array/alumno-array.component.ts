import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { arrayColumn } from '@function/array-column';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-alumno-array',
  templateUrl: './alumno-array.component.html',
  styleUrls: ['./alumno-array.component.css']
})
export class AlumnoArrayComponent implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected tools: ComponentToolsService,
    protected dialog: MatDialog
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
  control: FormArray = this.fb.array([]);
  length!: number; //longitud total de los datos a mostrar

  ngOnInit(): void {
    this.loadParams$ = this.tools.loadParams(this.display$)
    this.loadParams()
  }

  protected loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => {
 
          var display = new Display()
          .setSize(0)
          .setParamsByQueryParams(queryParams)
          .addParam("comision-autorizada",true)
          .setFields_(["alumno"])
 
          if(!display.getParam("calendario-anio") && !display.getParam("calendario-semestre")) {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Error", message: "Debe indicarse el año y semestre en la búsqueda"}
            });
            return false
          }
          if(isEmptyObject(display.getOrder())) display.setOrder({
            "persona-apellidos":"ASC",
            "persona-nombres":"ASC",
            "persona-numero_documento":"ASC",
          })


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
              this.setData(data)
              return this.load = true;
            }
          ),
      )
  }

  protected initData(): Observable<any>{
    return this.dd.post("select", "alumno_comision", this.display$.value).pipe(
      map(
        alumno_comision_ => arrayColumn(alumno_comision_,"alumno")
      ),
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entityName: "alumno", ids, fields: [
              "id",
              "persona-apellidos",
              "persona-nombres",
              "persona-numero_documento",
              "persona-telefono",
              "persona-email",
              "estado_inscripcion",
              "observaciones",
              "tramo_ingreso",
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




}
