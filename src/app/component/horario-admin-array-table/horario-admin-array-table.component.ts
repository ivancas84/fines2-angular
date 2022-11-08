import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { ComponentTableService } from '@service/component/component-table-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { combineAll, combineLatest, map, Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-horario-admin-array-table',
  templateUrl: './horario-admin-array-table.component.html',
  styleUrls: ['./horario-admin-array-table.component.css'],
})
export class HorarioAdminArrayTableComponent implements OnInit, AfterViewInit {

  constructor(
    protected dd: DataDefinitionToolService,
    protected ts: ComponentTableService,
  ) { }


  @Input() control!: FormArray
  @Input() idComision!: string
  
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit(): void {
    var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["curso","dia","hora_inicio","hora_fin"]



  options$!: Observable<any>;
  ngOnInit(): void {
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


    this.options$ = combineLatest([curso,dia]).pipe(
      map(
        response => {
          return {
            curso:response[0],
            dia:response[1]
          }
        }
      )
    )
  }


  onChangeSort(sort: Sort): void {
    this.ts.onChangeSortLocal(sort, this.control)
  }


}
