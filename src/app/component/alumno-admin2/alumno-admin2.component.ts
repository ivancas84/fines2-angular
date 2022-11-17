import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { comisionLabel } from '@function/label';
import { logValidationErrors } from '@function/log-validation-errors';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { Observable, BehaviorSubject, map, switchMap, of, first } from 'rxjs';

@Component({
  selector: 'app-alumno-admin2',
  templateUrl: './alumno-admin2.component.html',
  styleUrls: ['./alumno-admin2.component.css']
})
export class AlumnoAdmin2Component implements OnInit {

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

    controlAlumno:FormGroup = this.fb.group({
      id:this.fb.control(null),
      documentacion_inscripcion:this.fb.control(null),
      anio_inscripcion:this.fb.control(null),
      anio_inscripcion_completo:this.fb.control(null),
      establecimiento_inscripcion:this.fb.control(null,),
      resolucion_inscripcion:this.fb.control(null),
      anio_ingreso:this.fb.control(null),
      plan:this.fb.control(null),
      adeuda_deudores:this.fb.control(null),
      adeuda_legajo:this.fb.control(null),
      libro:this.fb.control(null),
      folio:this.fb.control(null),
      estado_inscripcion:this.fb.control(null),
      observaciones:this.fb.control(null),
      tiene_dni:this.fb.control(null),
      tiene_partida:this.fb.control(null),
      tiene_constancia:this.fb.control(null),
      tiene_certificado:this.fb.control(null),
      previas_completas:this.fb.control(null),
      persona:{ validators:[Validators.required] }
    },{updateOn:"submit", asyncValidators: this.validators.uniqueMultiple("alumno", ["libro","folio"]) })
  
  
    defaultValuesAlumno:{[i:string]:any} = {
      tiene_dni:false,
      tiene_partida:false,
      tiene_constancia:false,
      tiene_certificado:false,
      previas_completas:false,
    }

    control: FormGroup = this.fb.group({
      persona: this.controlPersona,
      alumno: this.controlAlumno,
    })

    controlCalificacion_:FormArray = this.fb.array([], {updateOn:"submit"})
    controlDetallePersona_:FormArray = this.fb.array([], {updateOn:"submit"})
    controlAlumnoComision_:FormArray = this.fb.array([], {updateOn:"submit"})

    isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar

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
          () => this.initMainData()
        ),
        switchMap(
          (data: any) => this.initDetallePersona_(data)
        ),
        switchMap(
          (data: any) => this.initAlumnoComision_(data)
        ),
        switchMap(
          (data: any) => this.initCalificacion_(data)
        ),
        map(
          data => { 
            this.controlAlumno.patchValue({...this.defaultValuesAlumno, ...this.params, ...data["alumno"]})
            this.controlPersona.patchValue(data["persona"])
   
            this.controlAlumnoComision_.clear();
            for(var i = 0; i <data["alumno_comision_"].length; i++) this.controlAlumnoComision_.push(this.formGroupAlumnoComision(data["alumno_comision_"][i]));

            this.controlDetallePersona_.clear();
            for(var i = 0; i <data["detalle_persona_"].length; i++) this.controlDetallePersona_.push(this.formGroupDetallePersona(data["detalle_persona_"][i]));

            this.controlCalificacion_.clear();
            for(var i = 0; i <data["calificacion_"].length; i++) this.controlCalificacion_.push(this.formGroupDetallePersona(data["calificacion_"][i]));
   
            return true;
          },
        ),
      )
    }

    initDetallePersona_(data: { [x: string]: any } = {}): Observable<any> {
      data["detalle_persona_"] = []
      if(!data["alumno"]["persona"]) return of(data)
      var display = new Display().setParams({"persona":data["alumno"]["persona"]})
  
      return this.dd.all("detalle_persona", display).pipe(
        map(
          (d_: any) => {
            if(d_.length) data["detalle_persona_"] = d_ 
            return data
          }
        )
      );
    }
  
    initAlumnoComision_(data: { [x: string]: any }): Observable<any> {
      data["alumno_comision_"] = []
      if(!data["alumno"]["id"]) return of(data)
      var display = new Display().setParams({"alumno":data["alumno"]["id"]})
  
      return this.dd.post("ids","alumno_comision", display).pipe(
        switchMap(
          ids => this.dd.entityFieldsGetAll({
            entityName:"alumno_comision",
            ids,fields:[
              "id",
              "activo",
              "alumno",
              "comision-division",
              "sede-numero",
              "planificacion-anio",
              "planificacion-semestre",
              "calendario-anio",
              "calendario-semestre"
          ]})
        ),
        map(
          data => {
            data.forEach((element: { [x: string]: string; }) => {
              element["comision-label"] = comisionLabel(element, "comision-")
            })
            return data;
          }
        ),
        map(
          (d_: any) => {
            if(d_.length) data["alumno_comision_"] = d_ 
            return data
          }
        )
      );
    }

    initCalificacion_(data: { [x: string]: any }): Observable<any> {
      data["calificacion_"] = []
      if(!data["alumno"]["id"]) return of(data)
      var display = new Display().setParams({"alumno":data["alumno"]["id"]})
  
      return this.dd.all("calificacion", display).pipe(
        map(
          (d_: any) => {
            if(d_.length) data["calificacion_"] = d_ 
            return data
          }
        )
      );
    }

    initMainData(): Observable<any> {
      var storageValues = this.tools.initStorageValues()
      if(!isEmptyObject(storageValues)) return of(storageValues)
   
      var data = {
        "persona":{}, 
        "alumno":{
          "id":null, //inicializamos campo id para facilitar comparacion
          "persona":null, //inicializamos campo persona para facilitar comparacion
        }, 
      }
      if(isEmptyObject(this.params)) return of(data)
      if(this.params.hasOwnProperty("persona")) data["alumno"]["persona"] = this.params["persona"];

      return this.dd.unique("alumno", this.params).pipe(
        map(
          (alumno: any) => {
            if (!isEmptyObject(alumno)) data["alumno"] = alumno
            return data
          }
        ),
        switchMap(
          data => {
            if (!data["alumno"]["persona"]) return of(data)
            return this.dd.get("persona", data["alumno"]["persona"]!).pipe(
              map(
                (persona: any) => {
                  data["persona"] = persona
                  return data
                }
              ),
            )
          }
        )
      )
    }
  
    formGroupAlumnoComision(data:{[i:string]:any}={}): FormGroup {
      var fg = this.fb.group({
        "id":this.fb.control(""),
        "comision-label":this.fb.control(""),
        "activo":this.fb.control(""),
        "alumno":this.fb.control(""),
        "_mode":this.fb.control("id"),
      })
      fg.patchValue(data)
      return fg;
    }

    formGroupCalificacion(data:{[i:string]:any}={}): FormGroup {
      var fg = this.fb.group({
        "id":this.fb.control(""),
        "asignatura":this.fb.control(""),
        "anio":this.fb.control(""),
        "semestre":this.fb.control(""),
        "nota_final":this.fb.control(""),
        "crec":this.fb.control(""),
        "alumno":this.fb.control(""),
        "_mode":this.fb.control("id"),
      })
      fg.patchValue(data)
      return fg;
    }

    formGroupDetallePersona(data:{[i:string]:any}={}): FormGroup {
      var fg = this.fb.group({
        "id":this.fb.control(null),
        "descripcion":this.fb.control(null,{validators:Validators.required}),
        "archivo":this.fb.control(null),
        "persona":this.fb.control(null,{validators:Validators.required}),
        "_mode":this.fb.control("id"),
      })

  
      fg.patchValue(data)
      return fg;
    }
  
  
    ngOnInit(): void {
      this.loadParams()
      this.loadDisplay()
      this.loadStorage$ = this.tools.loadStorage(this.control)
    }

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
  
    onSubmit(fieldset: string) {
      this.isSubmitted = true;
   
      switch(fieldset){
        case "persona": this.submitPersona(); break;
        case "alumno": this.submitAlumno(); break;
        case "detalle_persona": this.submitDetallePersona(); break;

      }
    }
  
    submitPersona(){
      if (!this.controlPersona.valid) {
        logValidationErrors(this.controlPersona)
        this.tools.cancelSubmit(this.controlPersona)
        this.isSubmitted = false;
      } else {
        this.dd._post("persist", "persona", this.controlPersona.value).pipe(first()).subscribe({
          next: (response: any) => {
            this.tools.submitted(response)
            this.controlPersona.get("id")?.setValue(response["id"])
            this.controlAlumno.get("persona")?.setValue(response["id"])
          },
          error: (error: any) => this.tools.dialogError(error),
          complete: () => this.isSubmitted = false
        });
    
      } 
    }

    submitAlumno(){
      this.tools.persist("alumno",this.controlAlumno,this.display$).pipe(first()).subscribe({
        error: (error: any) => this.tools.dialogError(error),
        complete: () => this.isSubmitted = false
      })
    }

    submitDetallePersona(){
      this.submitUm("detalle_persona", this.controlDetallePersona_)
    }

    submitAlumnoComision(){
      this.submitUm("alumno_comision", this.controlDetallePersona_)
    }

    addDetallePersona(){
      if(this.existePersona()) this.controlDetallePersona_.push(this.formGroupDetallePersona({persona:this.controlPersona.get("id")?.value}))
    }

    addAlumnoComision(){
      if(this.existeAlumno()) this.controlAlumnoComision_.push(this.formGroupAlumnoComision({alumno:this.controlAlumno.get("id")?.value}))
    }

    
  
    protected submitUm(fieldsetId: string, control: FormArray){
      if (!control.valid) {
        logValidationErrors(control)
        this.tools.cancelSubmit(control)
        this.isSubmitted = false;
      } else {
        this.dd._post("persist_rows", fieldsetId, control.value).pipe(first()).subscribe({
          next: (response: any) => {
            this.tools.submitted(response)
          },
          error: (error: any) => this.tools.dialogError(error),
          complete: () => this.isSubmitted = false
        });
    
      } 
    }

    protected existePersona(): boolean{
      if(!this.controlPersona.get("id")?.value)  {
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: "Debe registrar la persona para poder agregar un nuevo registro"}        
        });
        return false
      }
      return true
    }

    protected existeAlumno(): boolean{
      if(!this.controlAlumno.get("id")?.value)  {
        this.dialog.open(DialogAlertComponent, {
          data: {title: "Error", message: "Debe registrar al alumno para poder agregar un nuevo registro"}        
        });
        return false
      }
      return true
    }
   
   
}
