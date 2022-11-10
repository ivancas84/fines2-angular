import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Display } from '@class/display';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos-toma-posesion-table',
  templateUrl: './cursos-toma-posesion-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesionTableComponent implements AfterViewInit {
  @Input() control!: FormArray
  @Input() length!: number
  @Input() display!: Display
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild("mainContent") content!: ElementRef;
 
  copyContent(): void {
    this.tools.copyContent(this.content, this.displayedColumns)
  }
 
  printContent(): void {
    this.tools.printContent(this.content, this.displayedColumns)
  }

  displayedColumns = ["sede","comision","domicilio","asignatura-nombre","tramo","horario","options"]

  serverSortTranslate: { [index: string]: string[] } = {
    sede:["sede-nombre"],
    comision:["sede-numero","comision-division","planificacion-anio","planificacion-semestre"],
    tramo:["planificacion-anio","planificacion-semestre"]};

  constructor(
    protected dd: DataDefinitionToolService,
    protected route: ActivatedRoute, 
    protected fb: FormBuilder,
    protected tools: ComponentToolsService,
  ) { }
  
  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  onChangeSort(sort: Sort): void {
    this.tools.onChangeSort(sort, this.length, this.display, this.control, this.serverSortTranslate)
  }

  
}



  
  
