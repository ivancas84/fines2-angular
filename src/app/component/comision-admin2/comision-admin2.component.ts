import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentFormService } from '@service/component/component-form-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { of } from 'rxjs';
import { Observable, BehaviorSubject, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-comision-admin2',
  templateUrl: './comision-admin2.component.html',
  styleUrls: ['./comision-admin2.component.css']
})
export class ComisionAdmin2Component implements OnInit {

  
  constructor(
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected validators: DdAsyncValidatorsService,
    protected formService: ComponentFormService,
  ) { }

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  loadStorage$!: Observable<any> //carga de storage
  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  params: { [x: string]: any } = {} //parametros del componente

 
  controlComision:FormGroup = this.fb.group({
    id:this.fb.control(null),
    sede:this.fb.control(null,{ validators:[Validators.required] }),
    division:this.fb.control(null,{ validators:[Validators.required] }),
    planificacion:this.fb.control(null,{ validators:[Validators.required] }),
    modalidad:this.fb.control(null,{ validators:[Validators.required] }),
    calendario:this.fb.control(null,{ validators:[Validators.required] }),
    comision_siguiente:this.fb.control(null),
    turno:this.fb.control(null),
    autorizada:this.fb.control(null),
    apertura:this.fb.control(null),
    publicada:this.fb.control(null),
    observaciones:this.fb.control(null),
  },{
    asyncValidators:[this.validators.uniqueMultiple("comision", ["sede", "division", "planificacion"])]
  })

  control: FormGroup = this.fb.group({
    comision: this.controlComision,
  }, {updateOn:"blur"})

  controlCurso_:FormArray = this.fb.array([])

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          this.params = queryParams
          var display = new Display().setSize(100).setParamsByQueryParams(queryParams);
          this.display$.next(display)
          return true;
        },
      ),
    )
  }

  loadDisplay(){
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => {
          var storageValues = this.formService.initStorageValues()
          if(!isEmptyObject(storageValues)) return of(storageValues)
          else return this.initComision();
        }
      ),
      // switchMap(
      //   (data: any) => {
      //     //return this.initCurso_(data)
      //   }
      // ),
      map(
        data => { 
          // this.form.reset() comente el reset porque no se si aporta alguna funcionalidad
          // this.controlDomicilio.patchValue(this.defaultValuesDomicilio)
          // /**
          //  * Se asigna inicialmente los valores por defecto, nada me garantiza
          //  * que el parametro "data" posea todos los valores definidos.
          //  */
          // if(!isEmptyObject(this.params)) this.controlSede.patchValue(this.params);
 
          // this.controlComision_.clear();
          // for(var i = 0; i <data["comision/sede"].length; i++) this.controlComision_.push(this.formGroupComision());
          // console.log(data);
          // this.control.patchValue(data)
 
          return true;
        },
      ),
    )
  }

  initComision(): Observable<any> {
    var data = {
      "comision":{}, 
    }
    if(isEmptyObject(this.params)) return of(data)
 
    return this.dd.unique("comision", this.params).pipe(
      switchMap(
        (comision) => {
          if(isEmptyObject(comision)) return of(data)
          data["comision"] = comision
          return this.dd.mergeObjectGet_({
            data:data, 
            entityName:"comision", 
            fields:["id","calle","numero","localidad","entre","piso","departamento","barrio"],
            id:"sede"
          }) 
        }
      ),
      // switchMap(
      //   (data: any) => {
      //     return this.initCurso_(data)
      //   }
 
      // )
    )
  }



  
  ngOnInit(): void {
  }

}
