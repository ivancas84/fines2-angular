import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { chosenYearHandlerClose } from '@function/component';
import { getSemester } from '@function/get-semester';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { Observable, BehaviorSubject, map, of, switchMap } from 'rxjs';

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

  control: FormGroup = this.fb.group({
    id:this.fb.control(null),
    inicio:this.fb.control(null,),
    fin:this.fb.control(null,),
    anio:this.fb.control(null,{ validators:[Validators.required] }),
    semestre:this.fb.control(null, { validators:[Validators.required] }),
    descripcion:this.fb.control(null),
  })

  defaultValues: {[i:string]:any} = {anio:new Date(), semestre:getSemester()}

  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    this.loadStorage$ = this.tools.loadStorage(this.control)

  }

  protected loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
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
 
    return this.dd.unique("calendario", this.params).pipe(
      switchMap(
        (id) => {
          if(isEmptyObject(id)) return of({})

          return this.dd.get("calendario",id)
        }
      ),
    )
  }


  onSubmit(){

  }

}
