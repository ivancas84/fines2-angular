import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { ComponentSearchService } from '@service/component/component-search-service';
import { ComponentTableService } from '@service/component/component-table-service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { BehaviorSubject, map, Observable, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-toma-posesion-table',
  templateUrl: './cursos-toma-posesion-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesionTableComponent implements AfterViewInit {
  entityName: string = "curso"

  @Input() control!: FormArray
  @Input() length!: number
  @Input() display!: Display

  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns = ["sede","comision","domicilio","asignatura-nombre","tramo","horario","options"]

  serverSortTranslate: { [index: string]: string[] } = {
    sede:["sede-nombre"],
    comision:["sede-numero","comision-division","planificacion-anio","planificacion-semestre"],
    tramo:["planificacion-anio","planificacion-semestre"]};

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute, 
    protected fb: FormBuilder,
    protected searchService: ComponentSearchService,
    protected tableService: ComponentTableService,
  ) { }
  
  ngAfterViewInit(): void {
    var s = this.tableService.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  onChangeSort(sort: Sort): void {
    this.tableService.onChangeSort(sort, this.length, this.display, this.control, this.serverSortTranslate)
  }

  
}



  
  
