import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { Observable, BehaviorSubject, map, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-docente-admin',
  templateUrl: './docente-admin.component.html',
  styleUrls: ['./docente-admin.component.css']
})
export class DocenteAdminComponent implements OnInit {

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

  controlPersona:FormGroup = this.fb.group({
    id:this.fb.control(null),
    nombres:this.fb.control(null),
    apellidos:this.fb.control(null),
    numero_documento:this.fb.control(null,{ 
      validators:[Validators.required],
      asyncValidators:[this.validators.unique("numero_documento", "persona")]
    }),
    cuil:this.fb.control(null,{
      asyncValidators:[this.validators.unique("cuil", "persona")]
    }),
    genero:this.fb.control(null),
    fecha_nacimiento:this.fb.control(null),
    telefono:this.fb.control(null),
    email:this.fb.control(null),
    lugar_nacimiento:this.fb.control(null),
    telefono_verificado:this.fb.control(null),
    email_verificado:this.fb.control(null),
    info_verificada:this.fb.control(null),
  })


  control: FormGroup = this.fb.group({
    persona: this.controlPersona,
  })

  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    this.loadStorage$ = this.tools.loadStorage(this.control)
  }


  loadParams(){
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

  loadDisplay(){
    this.loadDisplay$ = this.display$.pipe(
      switchMap(
        () => this.initMainData()
      ),
      map(
        data => {
          this.controlPersona.reset()
          this.controlPersona.patchValue({...this.params, ...data["persona"]})

          return true;
        },
      ),
    )
  }


  initMainData(): Observable<any> {
    var storageValues = this.tools.initStorageValues()
    if(!isEmptyObject(storageValues)) return of(storageValues)
 
    var data = {
      "persona":{}, 
    }
    if(isEmptyObject(this.params)) return of(data)
 
    return this.dd.post("unique_id", "persona", this.params).pipe(
      map(
        (response) => {
          if(isEmptyObject(response)) return of(response)
          data["persona"] = response
          return data 
        }
      ),
    )
  }

}
