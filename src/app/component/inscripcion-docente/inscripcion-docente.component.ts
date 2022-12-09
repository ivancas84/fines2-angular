import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { onSubmit } from '@function/component';
import { domicilioLabel } from '@function/label';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DdAsyncValidatorsService } from '@service/validators/dd-async-validators.service';
import { Observable, map, Subject, first } from 'rxjs';

@Component({
  selector: 'app-inscripcion-docente',
  templateUrl: './inscripcion-docente.component.html',
  styleUrls: ['./inscripcion-docente.component.css']
})
export class InscripcionDocenteComponent implements OnInit {
  
  constructor(
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected validators: DdAsyncValidatorsService,
    protected tools: ComponentToolsService,
    protected router: Router
  ) { }

  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  params: { [x: string]: any } = {} //parametros del componente
  data: { [x: string]: any } = {} //datos a visualizar en el template
  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar
  onSubmit$:Subject<any> = new Subject();

  control: FormGroup = this.fb.group({
    id:this.fb.control(null),
    curso:this.fb.control(null,{ validators:[Validators.required] }),
    email:this.fb.control(null,{ validators:[Validators.required] }),
    nombres:this.fb.control(null,{ validators:[Validators.required] }),
    apellidos:this.fb.control(null,{ validators:[Validators.required] }),
    numero_documento:this.fb.control(null,{ validators:[Validators.required] }),
    cuil:this.fb.control(null,{ validators:[Validators.required] }),
    genero:this.fb.control(null,{ validators:[Validators.required] }),
    fecha_nacimiento:this.fb.control(null,{ validators:[Validators.required] }),
    telefono:this.fb.control(null,{ validators:[Validators.required] }),
  })

  ngOnInit(): void {
    this.loadParams()
    this.loadDisplay()
    onSubmit(this.onSubmit$,this.control).subscribe((validationSuccessful) => this.submit());
  }

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(map(
        queryParams => {
            this.params = queryParams
            if(!queryParams.hasOwnProperty("curso") || !queryParams["curso"]) {
              this.dialog.open(DialogAlertComponent, {
                data: {title: "Error", message: "No está definido el curso"}
              });
              return false
            }
            this.control.get("curso")!.setValue(this.params["curso"])
            if(!queryParams.hasOwnProperty("email") || !queryParams["email"]) this.control.get("email")!.setValue(this.params["email"]) 
            return true;
        },
    ))
  }

  loadDisplay(){
    this.loadDisplay$ = this.dd.entityFieldsGet({entityName:"curso", id:this.params["curso"], fields:[
      "id",
      "comision-division",
      "asignatura-nombre",
      "sede-numero",
      "sede-nombre",
      "planificacion-anio",
      "planificacion-semestre",
      "plan-orientacion",
      "domicilio-calle",
      "domicilio-entre",
      "domicilio-numero",
      "domicilio-barrio",
      "domicilio-localidad",
    ]}).pipe(
      map(
        data => {
          data["domicilio-label"] = domicilioLabel(data)
          data["comision-numero"] = data["sede-numero"] + data["comision-division"] + "/" + data["planificacion-anio"] + data["planificacion-semestre"]
          this.data = data
          
        }
      )
    )
  }

  submit(){
    this.isSubmitted = true;
        this.dd._post("persist", "inscripcion_docente", this.control.value).pipe(first()).subscribe({
          next: () => {
            this.router.navigateByUrl('/inscripcion-docente-correcta', {replaceUrl: true});
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
