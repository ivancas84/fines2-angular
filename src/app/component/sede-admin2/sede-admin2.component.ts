import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { emptyUrl } from '@function/empty-url.function';
import { isEmptyObject } from '@function/is-empty-object.function';
import { markAllAsDirty } from '@function/mark-all-as-dirty';
import { ComponentFormService } from '@service/component/component-form-service';
import { ComponentLoadService } from '@service/component/component-load-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { BehaviorSubject, map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';

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
    protected fb: FormBuilder, 
    protected validators: DdAsyncValidatorsService,
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
    id:this.fb.control(null),
    numero:this.fb.control(null,{ validators:[Validators.required] }),
    nombre:this.fb.control(null,{ validators:[Validators.required] }),
    centro_educativo:this.fb.control(null,{ validators:[Validators.required] }),
    observaciones:this.fb.control(null),
    domicilio:this.fb.control(null),
  })

  controlDomicilio:FormGroup = this.fb.group({
    id:this.fb.control(null),
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


  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts



  formGroupComision(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
    })
  }

  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    this.loadStorage$ = this.formService.loadStorage(this.control)
    //this.loadSwitchDomicilio()

  }

   /**
   * @example this.loadParams$ = loadParams2(this.display$) 
   */
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
          data["sede"] = sede
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
      .setParams({"sede":data["sede"]["id"]})
      .setOrder({ "division":"ASC", "calendario-anio":"ASC", "calendario-semestre":"ASC"})
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
          var storageValues = this.formService.initStorageValues()
          if(!isEmptyObject(storageValues)) return of(storageValues)
          else return this.initData();
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
          if(!isEmptyObject(this.params)) this.controlSede.patchValue(this.params);

          this.controlComision_.clear();
          for(var i = 0; i <data["comision/sede"].length; i++) this.controlComision_.push(this.formGroupComision());
          console.log(data);
          this.control.patchValue(data)

          return true;
        },
      ),
    )
  }

  onSubmit(fieldset: string){
    this.isSubmitted = true;
    if (!this.control.valid) {
      this.formService.cancelSubmit(this.control)
      this.isSubmitted = false;
    } else {
      switch(fieldset){
        case "sede": this.submitSede(); break;
        case "domicilio": this.submitDomicilio(); break;
      }
    } 
  }

  protected submitSede() {
    var s = this.dd._post("persist", "sede", this.controlSede.value).subscribe({
      next: (response: any) => {
        this.formService.submittedDisplay(response,this.display$)
        this.isSubmitted = false;
      },
      error: (error: any) => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    });
    this.subscriptions.add(s);
  }

  protected submitDomicilio() {
    var s = this.dd._post("persist", "domicilio", this.controlDomicilio.value).subscribe({
      next: (response: any) => {
          this.formService.submitted(response)
          this.controlSede.get("domicilio")?.setValue(response["id"])
          this.isSubmitted = false;
      },
      error: (error: any) => { 
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: error.error}
        });
        this.isSubmitted = false;
      }
    });
    this.subscriptions.add(s);
  }
  
  ngOnDestroy () { this.subscriptions.unsubscribe() }


  

}
