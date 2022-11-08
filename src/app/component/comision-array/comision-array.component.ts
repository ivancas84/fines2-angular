import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { ComponentLoadService } from '@service/component/component-load-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-comision-array',
  templateUrl: './comision-array.component.html',
  styleUrls: ['./comision-array.component.css']
})
export class ComisionArrayComponent implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected ls: ComponentLoadService,
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  control: FormArray = this.fb.array([]);
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
  length!: number; //longitud total de los datos a mostrar


  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams$ = this.ls.loadParams(this.display$)
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
         return this.dd.post("count", "comision", this.display$.value);
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
        for(var i = 0; i <data.length; i++) this.control.push(this.formGroup(data[i]));
        return this.load = true;
       }
     ),
   )
  }


  initData(): Observable<any>{
    if(this.length === 0) return of([]);
    return this.dd.post("ids", "comision", this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entityName: "comision", ids, fields: [
              "id",
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
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["sede"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
            element["label"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
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


  formGroup(data:{[index:string]:any}): FormGroup {
    var fg = this.fb.group({
      "id":this.fb.control(""),
      "sede":this.fb.control(""),
      "label":this.fb.control(""),
      "tramo":this.fb.control(""),
      "domicilio":this.fb.control(""),
      "horario":this.fb.control(""),
    })
    fg.patchValue(data)
    return fg;
  }




}
