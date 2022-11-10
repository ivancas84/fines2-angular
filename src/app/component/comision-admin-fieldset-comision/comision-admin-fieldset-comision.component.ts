import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comision-admin-fieldset-comision',
  templateUrl: './comision-admin-fieldset-comision.component.html',
  styleUrls: ['./comision-admin-fieldset-comision.component.css']
})
export class ComisionAdminFieldsetComisionComponent implements OnInit {

  constructor(
    protected tools: ComponentToolsService,
    protected dd: DataDefinitionService
  ) { }

  @Input() control!: FormGroup

  ngOnInit(): void {
    console.log(this.control.value)
    this.initAutocompleteSede()
    this.initAutocompleteCalendario()
    this.initAutocompleteComisionSiguiente()
    this.initOptionsPlanificacion()
    this.initOptionsModalidad()
    this.initOptionsTurno()
  }

 
  optionsPlanificacion$!: Observable<Array<any>>;
  initOptionsPlanificacion(): void {
    var display = new Display().addCondition(["plan-distribucion_horaria","=~","713"]).addOrder("plan-orientacion","ASC")
    this.optionsPlanificacion$ = this.dd.post("label_all","planificacion", display)
  }


  optionsModalidad$!: Observable<Array<any>>;
  initOptionsModalidad(): void {
    // var display = new Display().addCondition(["plan-distribucion_horaria","=~","713"]).addOrder("plan-orientacion","ASC")
    this.optionsModalidad$ = this.dd.post("label_all","modalidad", new Display)
  }

  optionsTurno$!: Observable<Array<any>>;
  initOptionsTurno(): void {
    var display = new Display().addField("turno").addOrder("turno","ASC").addParam("turno",true)
    this.optionsTurno$ = this.dd.post("select","comision", display).pipe(
      map(
        rows => arrayColumn(rows,"turno")
      )
    )
  }

  loadAutocompleteSede$!: Observable<any>;
  searchControlSede: FormControl = new FormControl(null); //busqueda
  filteredOptionsSede$!: Observable<Array<{ [key: string]: any; }>>;
  labelSede: string = "";
  initAutocompleteSede(): void {
    this.filteredOptionsSede$ = this.tools.filteredOptionsAutocomplete({
      entityName:"sede",
      control:this.control.get("sede")!,
      searchControl:this.searchControlSede,
    })

    this.loadAutocompleteSede$ = this.tools.labelAutocomplete({
      entityName:"sede",
      control:this.control.get("sede")!,
      searchControl:this.searchControlSede,
    }).pipe(
        map(
          label => {
            this.labelSede = label;
            return true;
          }
        )
    )
  }



  loadAutocompleteCalendario$!: Observable<any>;
  searchControlCalendario: FormControl = new FormControl(null); //busqueda
  filteredOptionsCalendario$!: Observable<Array<{ [key: string]: any; }>>;
  labelCalendario: string = "";
  initAutocompleteCalendario(): void {
    this.filteredOptionsCalendario$ = this.tools.filteredOptionsAutocomplete({
      entityName:"calendario",
      control:this.control.get("calendario")!,
      searchControl:this.searchControlCalendario,
    })

    this.loadAutocompleteCalendario$ = this.tools.labelAutocomplete({
      entityName:"calendario",
      control:this.control.get("calendario")!,
      searchControl:this.searchControlCalendario,
    }).pipe(
        map(
          label => {
            this.labelCalendario = label;
            return true;
          }
        )
    )
  }




  loadAutocompleteComisionSiguiente$!: Observable<any>;
  searchControlComisionSiguiente: FormControl = new FormControl(null); //busqueda
  filteredOptionsComisionSiguiente$!: Observable<Array<{ [key: string]: any; }>>;
  labelComisionSiguiente: string = "";
  initAutocompleteComisionSiguiente(): void {
    this.filteredOptionsComisionSiguiente$ = this.tools.filteredOptionsAutocomplete({
      entityName:"comision",
      control:this.control.get("comision_siguiente")!,
      searchControl:this.searchControlComisionSiguiente,
    })

    this.loadAutocompleteComisionSiguiente$ = this.tools.labelAutocomplete({
      entityName:"comision",
      control:this.control.get("comision_siguiente")!,
      searchControl:this.searchControlComisionSiguiente,
    }).pipe(
        map(
          label => {
            this.labelComisionSiguiente = label;
            return true;
          }
        )
    )
  }

}
