import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { onChangeSortData } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-array-table',
  templateUrl: './curso-array-table.component.html',
  styleUrls: ['./curso-array-table.component.css']
})
export class CursoArrayTableComponent implements OnInit {

  constructor(
    protected tools: ComponentToolsService
  ) { }

  @Input() data!: {[i:string]:any}[]

  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;
  
  @Input() length!: number
  @Input() display!: Display

  @ViewChild("mainContent") content!: ElementRef;

  
  ngOnInit(): void {

  }

  displayedColumns = ["sede-label","domicilio-label","comision-label","planificacion-label","asignatura-nombre","horario","cantidad_alumnos_activos","ta_docente-nombre", "ta_docente-telefono","ta_docente-email","options"]

  @ViewChild(MatPaginator) paginator?: MatPaginator; //referencia al paginador
  pageSizeOptions: number[] =[10, 25, 50, 100] 

  onChangePage($event: PageEvent){
    this.tools.onChangePage($event, this.display)
  }

  onChangeSort(sort: Sort): void {
    onChangeSortData(sort, this.data, this.table)
  }

  copyContent(): void {
    this.tools.copyContent(this.content, this.displayedColumns)
  }
 
  printContent(): void {
    this.tools.printContent(this.content, this.displayedColumns)
  }

 
}
