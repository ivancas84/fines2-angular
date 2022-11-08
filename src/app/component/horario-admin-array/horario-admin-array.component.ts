import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { ComponentFormService } from '@service/component/component-form-service';
import { ComponentLoadService } from '@service/component/component-load-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, combineLatest, first, map, Observable, ObservableNotification, switchMap } from 'rxjs';

@Component({
  selector: 'app-horario-admin-array',
  templateUrl: './horario-admin-array.component.html',
  styleUrls: ['./horario-admin-array.component.css']
})
export class HorarioAdminArrayComponent implements OnInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected formService: ComponentFormService,
    protected dialog: MatDialog,
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  controlHorario: FormArray = this.fb.array([]);
  control: FormGroup = this.fb.group({
    "horario": this.controlHorario
  },{updateOn:"submit"})
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga
  idComision!: string;

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          if(!queryParams.hasOwnProperty("curso-comision")) throw "No esta definido el identificador de comision"
          this.idComision = queryParams["curso-comision"];
          var display = new Display().setSize(0).setParamsByQueryParams(queryParams);
          this.display$.next(display)
        },
      ),
      switchMap(
        () => this.initOptions()
      )
    )
  }

  initOptions(): Observable<any> {
    var display = new Display().addParam("comision",this.idComision).setSize(0).addOrder("asignatura-nombre","ASC")

    var curso = this.dd.post("ids","curso", display).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll({
          entityName:"curso",
          ids:ids,
          fields:["id","asignatura-nombre"]
        })
      )
    )

    var dia = this.dd.post("label_all","dia", new Display)


    return combineLatest([curso,dia]).pipe(
      map(
        response => {
          this.options["curso"]=response[0]
          this.options["dia"]=response[1]
          return true
        }
      )
    )
  }

  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
  }


  formGroup(data:{[index:string]:any}): FormGroup {
    var fg = this.fb.group({
      "id":this.fb.control("",{validators:Validators.required}),
      "hora_inicio":this.fb.control("",{validators:Validators.required}),
      "hora_fin":this.fb.control("",{validators:Validators.required}),
      "curso":this.fb.control("",{validators:Validators.required}),
      "dia":this.fb.control("",{validators:Validators.required}),
    })
    if(data.hasOwnProperty("hora_inicio") && data["hora_inicio"].length>8) data["hora_inicio"] = new Date(data["hora_inicio"]).toTimeString().split(' ')[0];
    if(data.hasOwnProperty("hora_fin") && data["hora_fin"].length>8) data["hora_fin"] = new Date(data["hora_fin"]).toTimeString().split(' ')[0];

    fg.patchValue(data)
    return fg;
  }


  loadDisplay(){
    /**
     * Se define un load independiente para el display, es util para reasignar
     * valores directamente al display y reinicializar por ejemplo al limpiar
     * o resetear el formulario
     */
     this.loadDisplay$ = this.display$.pipe(
     switchMap(
       () => this.dd.all("horario", this.display$.value)
     ),
     map(
       data => {
        this.controlHorario.clear();
        for(var i = 0; i <data.length; i++) this.controlHorario.push(this.formGroup(data[i]));
        return this.load = true;
       }
     ),
   )
  }




  isSubmitted: boolean = false //Flag para habilitar/deshabilitar boton aceptar

  onSubmit() {
    this.isSubmitted = true;
 
    if (this.control.pending) {
      this.control.statusChanges.pipe(first()).subscribe(() => {
        if (this.control.valid) this.submit()
      });
    } else this.submit();
  }


  submit(){
    if (!this.control.valid) {
      this.formService.cancelSubmit(this.control)
      this.isSubmitted = false;
    } else {
      this.dd._post("persist_rows", "horario", this.controlHorario.value).pipe(first()).subscribe({
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
    }
  }

  options$!: Observable<any>;
  options: {[i:string]:{[i:string]:any}[]} = {}

  
}
