import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { loadSearchControl } from '@function/component';
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
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  control: FormArray = this.fb.array([]);
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
  length!: number; //longitud total de los datos a mostrar
  loadSearch$!: Observable<any> //carga de display
  
  controlSearch: FormGroup = this.fb.group({
    "calendario-anio":this.fb.control(""),
    "calendario-semestre":this.fb.control(""),
    "autorizada":this.fb.control(""),
    "sede":this.fb.control(""),
    "division":this.fb.control(""),
  });


  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
    this.loadSearch$ = loadSearchControl(this.controlSearch, this.display$)
  }

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          var display = new Display().setSize(100).setParamsByQueryParams(queryParams);
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
        this.aperturas = 0
        this.autorizadas = 0 
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
                    entity_name: "comision", ids, fields: [
                    "id",
                    "division",
                    "autorizada",
                    "apertura",
                    "sede-id",
                    "sede-nombre",
                    "sede-numero",
                    "domicilio-calle",
                    "domicilio-entre",
                    "domicilio-numero",
                    "domicilio-barrio",
                    "planificacion-anio",
                    "planificacion-semestre",
                    "calendario-anio",
                    "calendario-semestre",
                    "plan-orientacion",
                    "modalidad-nombre",
                    "turno"
                    ]
                }),
            ),
            
            switchMap(
                data => this.dd.postMergeAll_({
                data:data, 
                entity_name:"comision", 
                method:"horarios",
                fields:["dias_dias","hora_inicio","hora_fin"], 
                field_nameData:"id",
                field_nameResponse:"comision"
                }),
            ),
            switchMap(
                data => this.dd.postMergeAll_({
                data:data, 
                entity_name:"sede", 
                method:"referentes",
                fields:["sede","referentes"], 
                field_nameData:"sede-id",
                field_nameResponse:"sede"
                }),
            ),
            map(
                data => {
                    console.log(data)
                    data.forEach((element: { [x: string]: string; }) => {
                        element["sede"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
                        element["label"] =  element["sede-numero"] + element["division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
                        element["tramo"] =  element["planificacion-anio"] + "º" + element["planificacion-semestre"] + "º " + element["plan-orientacion"]
                        element["domicilio"] =  element["domicilio-calle"];
                        element["calendario"] =  new Date(element["calendario-anio"]).getFullYear() + "-" +element["calendario-semestre"];
                        
                        if(element["domicilio-entre"]) element["domicilio"] +=  " e/ " + element["domicilio-entre"]
                        element["domicilio"] +=  " nº " + element["domicilio-numero"]
                        if(element["domicilio-barrio"]) element["domicilio"] +=  " " + element["domicilio-barrio"]
                        if(element["dias_dias"]) element["horario"] =   element["dias_dias"] + " " + element["hora_inicio"] + " a " + element["hora_fin"] 
                        
                    })
                    return data;
                }
            )
        )
    }

    aperturas:number = 0
    autorizadas:number= 0

  formGroup(data:{[index:string]:any}): FormGroup {
    var fg = this.fb.group({
      "id":this.fb.control(""),
      "sede":this.fb.control(""),
      "sede-id":this.fb.control(""),
      "label":this.fb.control(""),
      "tramo":this.fb.control(""),
      "domicilio":this.fb.control(""),
      "horario":this.fb.control(""),
      "calendario":this.fb.control(""),
      "autorizada":this.fb.control(""),
      "apertura":this.fb.control(""),
      "modalidad-nombre":this.fb.control(""),
      "turno":this.fb.control(""),
      "referentes":this.fb.control("")
    })
    fg.patchValue(data)
    if(data["apertura"]) this.aperturas++
    if(data["autorizada"]) this.autorizadas++

    return fg;
  }




}
