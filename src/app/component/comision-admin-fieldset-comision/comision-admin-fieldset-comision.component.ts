import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Display } from '@class/display';
import { ComponentFormService } from '@service/component/component-form-service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comision-admin-fieldset-comision',
  templateUrl: './comision-admin-fieldset-comision.component.html',
  styleUrls: ['./comision-admin-fieldset-comision.component.css']
})
export class ComisionAdminFieldsetComisionComponent implements OnInit {

  constructor(
    protected formService: ComponentFormService,
    protected dd: DataDefinitionService
  ) { }

  @Input() control!: FormGroup

  ngOnInit(): void {
    this.initAutocompleteSede()
    this.initOptionsPlanificacion()
  }

 
  optionsPlanificacion$!: Observable<Array<any>>;
  initOptionsPlanificacion(): void {
    var display = new Display().addCondition(["plan-distribucion_horaria","=~","713"]).addOrder("plan-orientacion","ASC")
    this.optionsPlanificacion$ = this.dd.post("label_all","planificacion", display)
  }


  loadAutocompleteSede$!: Observable<any>;
  searchControlSede: FormControl = new FormControl(null); //busqueda
  filteredOptionsSede$!: Observable<Array<{ [key: string]: any; }>>;
  labelSede: string = "";
  initAutocompleteSede(): void {
    this.filteredOptionsSede$ = this.formService.filteredOptionsAutocomplete({
      entityName:"sede",
      control:this.control.get("sede")!,
      searchControl:this.searchControlSede,
    })

    this.loadAutocompleteSede$ = this.formService.labelAutocomplete({
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

}
