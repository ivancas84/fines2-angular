import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { loadSearchControl } from '@function/component';
import { domicilioLabel } from '@function/label';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, Observable, map, switchMap, of, tap } from 'rxjs';

/**
 * Se filtran las sedes en base a los parametros de comision
 * @param dd S
 * @param route 
 * @param fb 
 */

@Component({
  selector: 'app-sede-array',
  templateUrl: './sede-array.component.html',
  styleUrls: ['./sede-array.component.css']
})
export class SedeArrayComponent implements OnInit {

  
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
  });

  idSedes: string[] = []

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
          var display: Display = new Display
          Object.assign(display, this.display$.value)
          display.setFields_(["sede"]).setSize(0).setGroup_(["sede"])
          this.load = false
          return this.dd.post("select", "comision", display);
        }
     ),
     switchMap(
       ids => {
        this.length = ids.length
        return (this.length === 0) ? of([]) : this.initData()
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
    var display: Display = new Display
    Object.assign(display, this.display$.value)
    display.setFields_(["sede"]).setSize(0).setGroup_(["sede"])
    return this.dd.post("select", "comision", display).pipe(
      map(
        rows => arrayColumn(rows,"sede")
      ),
  
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entityName: "sede", ids, fields: [
              "id",
              "numero",
              "nombre",
              "centro_educativo-nombre",
              "domicilio-id",
              "domicilio-calle",
              "domicilio-entre",
              "domicilio-numero",
              "domicilio-barrio",
            ]
          }),
      ),
    
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["domicilio"] = domicilioLabel(element, "domicilio-")
          })
          return data;
        }
      )
    )
  }


  formGroup(data:{[index:string]:any}={}): FormGroup {
    var fg = this.fb.group({
      "id":this.fb.control(""),
      "numero":this.fb.control(""),
      "nombre":this.fb.control(""),
      "domicilio":this.fb.control(""),
      "centro_educativo-nombre":this.fb.control(""),
    })
    fg.patchValue(data)
    return fg;
  }



}
