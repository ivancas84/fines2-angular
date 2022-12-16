import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadSearchControl } from '@function/component';

@Component({
  selector: 'app-curso-array',
  templateUrl: './curso-array.component.html',
  styleUrls: ['./curso-array.component.css']
})
export class CursoArrayComponent implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute,
    protected tools: ComponentToolsService,
    protected dialog: MatDialog,
    protected fb: FormBuilder
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  loadSearch$!: Observable<any> //carga de search
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
  data: {[i:string]:any}[] = []
  length!: number; //longitud total de los datos a mostrar


  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    this.loadSearch$ = loadSearchControl(this.controlSearch, this.display$)
  }

  controlSearch: FormGroup = this.fb.group({
    "calendario-anio":this.fb.control(""),
    "calendario-semestre":this.fb.control(""),
    "comision-autorizada":this.fb.control(""),
    "comision-id":this.fb.control(""),
  });

  
  protected loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => {

          var display = new Display().setSize(0).setParamsByQueryParams(queryParams).addParam("comision-autorizada",true)
          if(
            (!display.getParam("calendario-anio") || !display.getParam("calendario-semestre")) 
            && !display.getParam("comision-id")
          ) {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Error", message: "Debe indicarse el año y semestre, o la comisión en la búsqueda"}
            });
            return false
          }
          if(isEmptyObject(display.getOrder()))  display.setOrder({
            "sede-numero":"ASC", 
            "comision-division":"ASC", 
            "planificacion-anio":"ASC", 
            "planificacion-semestre":"ASC",
            "asignatura-nombre":"ASC",
          })
          this.display$.next(display)
 
          return true;
        },
      ),
    )
  }


  protected loadDisplay(){
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
          console.log(data)
          this.data = data
          return this.load = true;
        }
      ),
    )
  }


  protected initData(): Observable<any>{   
    return this.dd.post("ids", "curso", this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entityName: "curso", ids, fields: [
              "id",
              "asignatura-nombre",
              "comision-id",
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
      switchMap(
        data =>   this.dd.postMergeAll({ data, method: "info", entityName: "cantidad_alumnos_activos_comision", fields: { "cantidad_alumnos_activos": "cantidad" }, fieldNameData: "comision-id", fieldNameResponse: "comision" })
      ),
      switchMap(
        data =>   this.dd.postMergeAll_({ data, method: "info", entityName: "cantidad_calificaciones_cargadas_cursos", fields: ["cantidad_calificaciones"], fieldNameData: "id", fieldNameResponse: "curso" })
      ),
      switchMap(
        data =>   this.dd.entityFieldsMergeAll({data, entityName: "toma", fields: ["docente-email","docente-nombres","docente-apellidos","docente-telefono","docente-numero_documento"] , fieldNameData:"toma", fieldNameResponse:"id", prefix: "ta_" })
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["ta_docente-nombre"] = ""
            if(element["ta_docente-nombres"]) element["ta_docente-nombre"] =  element["ta_docente-nombres"] + " " + element["ta_docente-apellidos"] + " " + element["ta_docente-numero_documento"]
            element["sede-label"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
            element["comision-label"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
            element["planificacion-label"] =  element["planificacion-anio"] + "º" + element["planificacion-semestre"] + "º " + element["plan-orientacion"]
            element["domicilio-label"] =  element["domicilio-calle"];
            if(element["domicilio-entre"]) element["domicilio-label"] +=  " e/ " + element["domicilio-entre"]
            element["domicilio-label"] +=  " nº " + element["domicilio-numero"]
            if(element["domicilio-barrio"]) element["domicilio-label"] +=  " " + element["domicilio-barrio"]
          })
          return data;
        }
      )
    )
  }


}
