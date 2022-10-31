import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentFormService } from '@service/component/component-form-service';
import { ComponentLoadService } from '@service/component/component-load-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sede-admin2',
  templateUrl: './sede-admin2.component.html',
  styleUrls: ['./sede-admin2.component.css']
})
export class SedeAdmin2Component implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected storage: SessionStorageService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected router: Router, 
    protected route: ActivatedRoute, 
    protected location: Location, 
    protected fb: FormBuilder, 
    protected validators: DdAsyncValidatorsService,
    protected loadService: ComponentLoadService,
    protected formService: ComponentFormService,
  ) { }

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  loadStorage$!: Observable<any> //carga de storage
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  storageValues: any = null //valores del storage
  params: { [x: string]: any } = {} //parametros del componente,

  controlSede:FormGroup = this.fb.group({
    id:this.fb.control(null,{ validators:[Validators.required] }),
    numero:this.fb.control(null,{ validators:[Validators.required] }),
    nombre:this.fb.control(null,{ validators:[Validators.required] }),
    centro_educativo:this.fb.control(null,{ validators:[Validators.required] }),
    observaciones:this.fb.control(null),
    domicilio:this.fb.control(null),
  })

  controlDomicilio:FormGroup = this.fb.group({
    id:this.fb.control(null,{ validators:[Validators.required] }),
    calle:this.fb.control(null,{ validators:[Validators.required] }),
    numero:this.fb.control(null,{ validators:[Validators.required] }),
    localidad:this.fb.control(null,{ validators:[Validators.required] }),
    entre:this.fb.control(null),
    piso:this.fb.control(null),
    departamento:this.fb.control(null),
    barrio:this.fb.control(null),
  })

  controlComision_:FormArray = this.fb.array([])

  control: FormGroup = this.fb.group({
    sede: this.controlSede,
    domicilio: this.controlDomicilio,
    "comision/sede":this.controlComision_
  }, {updateOn:"blur"})

  
  defaultValuesDomicilio: {[index:string]: any} = {
      localidad:"La Plata"
  }

  formGroupComision(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
    })
  }

  ngOnInit(): void {
    this.loadParams$ = this.loadService.loadParams2(this.display$, this.params)
    this.loadDisplay()
  }

  initStorage(): Observable<any>{
    /**
     * Comportamiento habitual de inicializacion del storage
     */
    var storageValues = this.formService.initStorageValues()
    if(!isEmptyObject(storageValues)) return of(storageValues)
    else return this.initData();
  }

  initData(): Observable<any> {
    var data = {
      "sede":{}, 
      "domicilio":{}, 
      "comision/sede":[], 
    }
    if(isEmptyObject(this.params)) return of(data)

    return this.dd.unique("sede", this.params).pipe(
      switchMap(
        (sede) => {
          if(isEmptyObject(sede)) return of(data)
          return this.dd.getRelObject_({
            data:data, 
            entityName:"domicilio", 
            fields:["id","calle","numero","localidad","entre","piso","departamento","barrio"],
            id:"sede"
          }) 
        }
      ),
      switchMap(
        (data: any) => {
          return this.initMultiple(data)
        }

      )
    )
  }

  initMultiple(data: { [x: string]: any }): Observable<any> {
    var display = new Display()
    display.setParams({"sede":data["sede"]["id"]})
    display.setOrder({ "division":"ASC", "calendario-anio":"ASC", "calendario-semestre":"ASC"})
    return this.dd.all("comision", display).pipe(
      map(
        (comision_: any) => {
          if(comision_.length) data["comision/sede"] = comision_
          return data
        }
      )
    )
  }

  loadDisplay(){
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => {
          return this.initStorage()
        }
      ),
      map(
        data => { 
          // this.form.reset() comente el reset porque no se si aporta alguna funcionalidad
          this.controlDomicilio.patchValue(this.defaultValuesDomicilio)
          /**
           * Se asigna inicialmente los valores por defecto, nada me garantiza
           * que el parametro "data" posea todos los valores definidos.
           */
          if(!isEmptyObject(this.params)) this.control.controls["sede"].patchValue(this.params);

          var controlComision_ = this.control.controls["comision/sede"] as FormArray
          controlComision_.clear();
          for(var i = 0; i <data["comision/sede"].length; i++) controlComision_.push(this.formGroupComision());

          this.control.patchValue(data)

          return true;
        }
      ),
    )
  }

}
