import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { acronym } from '@function/acronym';
import { arrayColumn } from '@function/array-column';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';

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
    this.loadParams()
    this.loadDisplay()

  }

  protected loadParams() {
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => {
 
          var display = new Display()
          .setSize(0)
          .setParamsByQueryParams(queryParams)
          .addParam("comision-autorizada",true)
 
          if(!display.getParam("calendario-anio") && !display.getParam("calendario-semestre")) {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Error", message: "Debe indicarse el año y semestre en la búsqueda"}
            });
            return false
          }
          if(isEmptyObject(display.getOrder())) display.setOrder({
            "sede-numero":"ASC",
            "comision-division":"ASC",
            "planificacion-tramo":"ASC",
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
              return this.dd.post("ids", "alumno_comision", this.display$.value)
            }
          ),
          switchMap(
            idAlumnoComision_ => {
              this.length = idAlumnoComision_.length
              return (this.length === 0) ? of([]) : this.initData(idAlumnoComision_)
            }
          ),
          map(
            data => {
              if (!this.length && data.length) length = data.length
              this.control.clear();
              for(var i = 0; i <data.length; i++) this.control.push(this.formGroup(data[i]));
              return this.load = true;
            }
          ),
      )
  }

  protected initData(ids:string[]): Observable<any>{
    return this.dd.entityFieldsGetAll({
            entityName: "alumno_comision", ids, fields: [
              "id",
              "estado",
              "persona-apellidos",
              "persona-nombres",
              "persona-numero_documento",
              "persona-telefono",
              "persona-email",
              "alumno-id",
              "alumno-estado_inscripcion",
              "alumno-observaciones",
              "alumno-tramo_ingreso",
              "alumno-tiene_dni",
              "alumno-tiene_constancia",
              "alumno-tiene_certificado",
              "alumno-previas_completas",
              "alumno-tiene_partida",
              "alumno-observaciones",
              "comision-division",
              "sede-numero",
              "planificacion-tramo",
              "plan-orientacion",
            ]
    }).pipe(
      switchMap(
        data =>  this.dd.postMergeAll_({
          data, 
          method: "cantidad_asignaturas_aprobadas_alumnos_tramo", 
          entityName: "alumno", 
          fields: [
            "cantidad_aprobadas_11",
            "cantidad_aprobadas_12",
            "cantidad_aprobadas_21",
            "cantidad_aprobadas_22",
            "cantidad_aprobadas_31",
            "cantidad_aprobadas_32",
            "cantidad_aprobadas"
          ], fieldNameData: "alumno-id", fieldNameResponse: "alumno" })
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["comision-label"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-tramo"] + " " + acronym(element["plan-orientacion"] )
          })
          return data;
        }
      )
    )
  }


  formGroup(data:{[index:string]:any}): FormGroup {
    var fb = this.fb.group({
      "id":this.fb.control("",{validators:Validators.required}),
      "estado":this.fb.control("",{validators:Validators.required}),
      "persona-apellidos":this.fb.control("",{validators:Validators.required}),
      "persona-nombres":this.fb.control("",{validators:Validators.required}),
      "persona-numero_documento":this.fb.control("",{validators:Validators.required}),
      "persona-telefono":this.fb.control("",{validators:Validators.required}),
      "persona-email":this.fb.control("",{validators:Validators.required}),
      "alumno-id":this.fb.control("",{validators:Validators.required}),
      "alumno-estado_inscripcion":this.fb.control("",{validators:Validators.required}),
      "alumno-observaciones":this.fb.control("",{validators:Validators.required}),
      "alumno-tramo_ingreso":this.fb.control("",{validators:Validators.required}),
      "alumno-tiene_dni":this.fb.control("",{validators:Validators.required}),
      "alumno-tiene_constancia":this.fb.control("",{validators:Validators.required}),
      "alumno-tiene_certificado":this.fb.control("",{validators:Validators.required}),
      "alumno-previas_completas":this.fb.control("",{validators:Validators.required}),
      "alumno-tiene_partida":this.fb.control("",{validators:Validators.required}),
      "estado_inscripcion":this.fb.control("",{validators:Validators.required}),
      "tramo_ingreso":this.fb.control("",{validators:Validators.required}),
      "cantidad_aprobadas_11":this.fb.control("",{validators:Validators.required}),
      "cantidad_aprobadas_12":this.fb.control("",{validators:Validators.required}),
      "cantidad_aprobadas_21":this.fb.control("",{validators:Validators.required}),
      "cantidad_aprobadas_22":this.fb.control("",{validators:Validators.required}),
      "cantidad_aprobadas_31":this.fb.control("",{validators:Validators.required}),
      "cantidad_aprobadas_32":this.fb.control("",{validators:Validators.required}),
      "comision-label":this.fb.control("",{validators:Validators.required}),
      "planificacion-tramo":this.fb.control("",{validators:Validators.required}),
    })
    fb.patchValue(data)
    return fb;
  }




}
