import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { first, of } from 'rxjs';
import { Observable, BehaviorSubject, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-comision-admin',
  templateUrl: './comision-admin.component.html',
  styleUrls: ['./comision-admin.component.css']
})
export class ComisionAdminComponent implements OnInit {

  
  constructor(
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected validators: DdAsyncValidatorsService,
    protected tools: ComponentToolsService,
    protected snackBar: MatSnackBar,
  ) { }

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  loadStorage$!: Observable<any> //carga de storage
  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  params: { [x: string]: any } = {} //parametros del componente

  idComision?:string
 
  controlComision:FormGroup = this.fb.group({
    id:this.fb.control(null),
    sede:this.fb.control(null,{ validators:[Validators.required] }),
    division:this.fb.control(null,{ validators:[Validators.required] }),
    planificacion:this.fb.control(null,{ validators:[Validators.required] }),
    modalidad:this.fb.control(null,{ validators:[Validators.required] }),
    calendario:this.fb.control(null,{ validators:[Validators.required] }),
    comision_siguiente:this.fb.control(null),
    turno:this.fb.control(null),
    autorizada:this.fb.control(false),
    apertura:this.fb.control(false),
    publicada:this.fb.control(false),
    observaciones:this.fb.control(null),
  },{
    asyncValidators:[this.validators.uniqueMultiple("comision", ["sede", "division", "planificacion"])]
  })


  controlCurso_:FormArray = this.fb.array([])

    
  defaultValuesComision: {[index:string]: any} = {
      apertura:false,
      autorizada:false,
      publicada:false
  }

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
          return this.initComision();
        }
      ),
      switchMap(
        (data: any) => {
          return this.initCurso_(data)
        }
      ),
      map(
        data => { 
          this.controlComision.reset() //debe limpiarse el formulario, ya que los pathValue solo asignan valores existentes y el resto los dejan intactos
      
          /**
           * Se asigna inicialmente los valores por defecto, nada me garantiza
           * que el parametro "data" posea todos los valores definidos.
           */
          this.controlComision.patchValue(this.defaultValuesComision)
          if(!isEmptyObject(this.params)) this.controlComision.patchValue(this.params);
          this.controlComision.patchValue(data["comision"])
          
          if(data["comision"].hasOwnProperty("id") && data["comision"]["id"]) this.idComision = data["comision"]["id"]
          this.controlCurso_.clear();
          
          for(var i = 0; i <data["curso/comision"].length; i++) this.controlCurso_.push(this.formGroupCurso());
          this.controlCurso_.patchValue(data["curso/comision"])
 
          return true;
        },
      ),
    )
  }

  initComision(): Observable<any> {
    var data:{[i:string]:any} = {
      "comision":{}, 
    }

    var storageValues = this.tools.initStorageValues()
    if(!isEmptyObject(storageValues)) {
      data["comision"] = storageValues
      return of(data)
    }
    
    if(isEmptyObject(this.params)) return of(data)
 
    return this.dd.post("unique_id", "comision", this.params).pipe(
      switchMap(
        id => {
          if(!id) return of({})
          return this.dd.get("comision",id)
        }
      ),
      map(
        (comision) => {
          if(isEmptyObject(comision)) return data
          data["comision"] = comision
          return data
        }
      ),
      switchMap(
        data => {
          console.log(data)
          if(!isEmptyObject(data["comision"]) && data["comision"].hasOwnProperty("sede") && data["comision"]["sede"]){
            return this.dd.get("sede",data["comision"]["sede"]).pipe(
              map(
                sede => {
                  data["sede-numero"] = sede["numero"]
                  return data
                }
              )
            )
          }
          data["sede-numero"] = null
          return of(data)
        }
      )
    )
  }

  initCurso_(data: { [x: string]: any }): Observable<any> {
    data["curso/comision"] = [];

    if(isEmptyObject(data["comision"])) return of(data);

    var display = new Display()
      .setParams({"comision":data["comision"]["id"]})
      .setOrder({ "asignatura-nombre":"ASC"})

    return this.dd.post("ids", "curso", display).pipe(
      switchMap(
        (ids:string[]) => this.dd.entityFieldsGetAll({ 
          entityName: "curso", 
          ids:ids, 
          fields:["id","asignatura-nombre","horas_catedra"]
        }),
      ),
      switchMap(
        (curso_:{[index:string]:any}[]) => this.dd.postMergeAll_({ 
          data:curso_, 
          method: "horario", 
          entityName: "curso", 
          fields: ["horario"], 
          fieldNameData: "id", 
          fieldNameResponse: "curso" 
        })
      ),
      map(
        curso_ => {
          data["curso/comision"] = curso_
          return data;
        }
      )
    )
  }

  formGroupCurso(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
      "horas_catedra":this.fb.control(""),
      "asignatura-nombre":this.fb.control(""),
      "horario":this.fb.control(""),
      "_mode":this.fb.control(""),
    })
  }

  addCurso(){
    this.controlCurso_.push(this.formGroupCurso())
  }

  removeCurso(index: number){
    var fg = this.controlCurso_.controls[index]
    if(!fg.get("id")!.value) this.controlCurso_.removeAt(index)
    else fg.get("_mode")!.setValue("delete");
  }

  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    this.loadStorage$ = this.tools.loadStorage(this.controlComision)
  }

  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar

  onSubmit() {
    this.isSubmitted = true;

    if (this.controlComision.pending) {
      this.controlComision.statusChanges.pipe(first()).subscribe(() => {
        if (this.controlComision.valid) this.submit()
      });
    } else this.submit();
  }

  submit(){

    if (!this.controlComision.valid) {
      this.tools.cancelSubmit(this.controlComision)
      this.isSubmitted = false;
    } else {
      this.dd._post("persist", "comision", this.controlComision.value).pipe(first()).subscribe({
        next: (response: any) => {
          this.tools.submittedDisplay(response,this.display$)
          this.isSubmitted = false;
        },
        error: (error: any) => {
          this.dialog.open(DialogAlertComponent, {
            data: {title: "Error", message: error.error}
          });
          this.isSubmitted = false;
        }
      });
    }
  }




  





}
