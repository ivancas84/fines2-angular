import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { ComponentLoadService } from '@service/component/component-load-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

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
    protected ls: ComponentLoadService
  ) { }

  display$:BehaviorSubject<Display> = new BehaviorSubject(new Display) //presentacion
  loadParams$!: Observable<any> //carga de parametros
  loadDisplay$!: Observable<any> //carga de display
  control: FormArray = this.fb.array([],{updateOn:"submit"});
  load: boolean = false; //Atributo auxiliar necesario para visualizar la barra de carga

  loadParams(){
    this.loadParams$ = this.route.queryParams.pipe(
      map(
        queryParams => { 
          if(!queryParams.hasOwnProperty("curso-comision")) throw "No esta definido el identificador de comision"
          var display = new Display().setSize(0).setParamsByQueryParams(queryParams);
          this.display$.next(display)
          return true;
        },
      ),
    )
  }

  ngOnInit(): void {
    this.loadDisplay()
    this.loadParams()
  }


  formGroup(data:{[index:string]:any}): FormGroup {
    var fb = this.fb.group({
      "id":this.fb.control(""),
      "hora_inicio":this.fb.control(""),
      "hora_fin":this.fb.control(""),
      "curso":this.fb.control(""),
      "dia":this.fb.control(""),
    })
    if(data.hasOwnProperty("hora_inicio") && data["hora_inicio"].length>8) data["hora_inicio"] = new Date(data["hora_inicio"]).toTimeString().split(' ')[0];
    if(data.hasOwnProperty("hora_fin") && data["hora_fin"].length>8) data["hora_fin"] = new Date(data["hora_fin"]).toTimeString().split(' ')[0];

    fb.patchValue(data)
    return fb;
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
        this.control.clear();
        for(var i = 0; i <data.length; i++) this.control.push(this.formGroup(data[i]));
        return this.load = true;
       }
     ),
   )
  }

}
