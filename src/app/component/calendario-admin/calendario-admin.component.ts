import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { chosenYearHandlerClose, onSubmit } from '@function/component';
import { getSemester } from '@function/get-semester';
import { isEmptyObject } from '@function/is-empty-object.function';
import { logValidationErrors } from '@function/log-validation-errors';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { Observable, BehaviorSubject, map, of, switchMap, filter, startWith, Subject, take, tap, first } from 'rxjs';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: './calendario-admin.component.html',
  styleUrls: ['./calendario-admin.component.css']
})
export class CalendarioAdminComponent implements OnInit {

  chosenYearHandlerClose = chosenYearHandlerClose
  
  constructor(
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected validators: DdAsyncValidatorsService,
    protected tools: ComponentToolsService,
  ) { }

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  loadStorage$!: Observable<any> //carga de storage
  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  params: { [x: string]: any } = {} //parametros del componente
  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar
  onSubmit$:Subject<any> = new Subject();

  control: FormGroup = this.fb.group({
    id:this.fb.control(null),
    inicio:this.fb.control(null,),
    fin:this.fb.control(null,),
    anio:this.fb.control(null,{ validators:[Validators.required] }),
    semestre:this.fb.control(null, { validators:[Validators.required] }),
    descripcion:this.fb.control(null,{ validators:[Validators.required] }),
  })

  defaultValues: {[i:string]:any} = {anio:new Date(), semestre:getSemester()}

  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    this.loadStorage$ = this.tools.loadStorage(this.control)
    onSubmit(this.onSubmit$,this.control).subscribe((validationSuccessful) => this.submit());
  }

  
  protected loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          console.log(queryParams)
          this.params = queryParams
          var display = new Display().setSize(1).setParamsByQueryParams(queryParams);
          this.display$.next(display)
          return true;
        },
      ),
    )
  }

  protected loadDisplay(){
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => this.initData()
      ),
      map(
        data => {
          console.log(data)
          this.control.reset()
          this.control.patchValue({...this.defaultValues, ...this.params, ...data})
          return true;
        },
      ),
    )
  }

  protected initData(): Observable<any> {
    var storageValues = this.tools.initStorageValues()
    if(!isEmptyObject(storageValues)) return of(storageValues)
 
    if(isEmptyObject(this.params)) return of({})
 
    return this.dd.post("unique_id", "calendario", this.params).pipe(
      switchMap(
        id => {
          if(!id) return of({})
          return this.dd.get("calendario",id)
        }
      )
    )

  }


  submit(){
      if (!this.control.valid) {
        logValidationErrors(this.control)
        this.tools.cancelSubmit(this.control)
        this.isSubmitted = false;
      } else {
        this.dd._post("persist", "calendario", this.control.value).pipe(first()).subscribe({
          next: (response: any) => {
            this.tools.submittedDisplay(response, this.display$)
          },
          error: (error: any) => this.tools.dialogError(error),
          complete: () => this.isSubmitted = false
        });
   
      }
    }



}
