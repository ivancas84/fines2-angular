import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-asignatura-array2',
  templateUrl: './asignatura-array2.component.html',
  styleUrls: ['./asignatura-array2.component.css']
})
export class AsignaturaArray2Component implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected tools: ComponentToolsService
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga

  control: FormArray = this.fb.array([]);

  length!: number; //longitud total de los datos a mostrar

  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
  }


   loadParams(){
    
    this.loadParams$ =  this.route.queryParams.pipe(
      map(
        queryParams => { 
          var display = new Display().setSize(0).setParamsByQueryParams(queryParams);
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
         return this.dd.post("count", "asignatura", this.display$.value);
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
        this.control.clear();
        for(var i = 0; i <data.length; i++) this.control.push(this.formGroup(data[i]));
        return this.load = true;
       }
     ),
   )
  }


  initData(): Observable<any>{
    return this.dd.post("ids", "asignatura", this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll({
            entity_name: "asignatura", ids, fields: [
              "id",
              "nombre",
              "formacion",
              "clasificacion",
              "codigo",
              "perfil",
            ]
          })
      ),
    )
  }

  formGroup(data:{[index:string]:any}): FormGroup {
    var fb = this.fb.group({
      "id":this.fb.control(null),
      "nombre":this.fb.control(null,{validators:Validators.required}),
      "formacion":this.fb.control(null,{validators:Validators.required}),
      "clasificacion":this.fb.control(null),
      "codigo":this.fb.control(null),
      "perfil":this.fb.control(null),

    })
    fb.patchValue(data)
    return fb;
  }


 

}
