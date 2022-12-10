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
import { Observable, map, first, Subject } from 'rxjs';

@Component({
  selector: 'app-toma-posesion-email',
  templateUrl: './toma-posesion-email.component.html',
  styleUrls: ['./toma-posesion-email.component.css']
})
export class TomaPosesionEmailComponent implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected validators: DdAsyncValidatorsService,
    protected tools: ComponentToolsService,
    protected router: Router, 
  ) { }
  
  ngOnInit(): void {
    this.loadParams();
    this.loadDisplay();
    onSubmit(this.onSubmit$,this.control).subscribe((validationSuccessful) => this.submit());
  }

  params: { [x: string]: any } = {} //parametros del componente
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar
  onSubmit$:Subject<any> = new Subject();

  control: FormGroup = this.fb.group({
    email:this.fb.control(null,{ validators:[Validators.required] }),
    curso: this.fb.control(null,{ validators:[Validators.required] }),
  })

  data!: {[i:string]:any}

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

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(map(
        queryParams => {
            this.params = queryParams
            if(!queryParams.hasOwnProperty("curso") || !queryParams["curso"]) {
              this.control.get("curso")!.setValue(this.params["curso"])
              this.dialog.open(DialogAlertComponent, {
                data: {title: "Error", message: "No está definido el curso"}
              });
              return false
            }
            return true;
        },
    ))
  }

  submit(){
    return this.dd._post("persist", "toma_posesion", this.control.value).pipe(first()).subscribe(
      response => {
        if(!response){
          this.router.navigate(['/inscripcion-docente'], { 
              queryParams : this.control.value 
          });
        } else {
          this.router.navigateByUrl('/inscripcion-docente-correcta', {replaceUrl: true});
        }
      }
    )
  }

}
