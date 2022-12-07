import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { naturalCompare } from '@function/natural-compare';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendario-array-table',
  templateUrl: './calendario-array-table.component.html',
  styleUrls: ['./calendario-array-table.component.css']
})
export class CalendarioArrayTableComponent implements OnChanges {

  @Input() data!: {[index:string]:any}[]
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() length!: number
  @Input() display!: Display

  @ViewChild("mainContent") content!: ElementRef;

  displayedColumns = ["inicio","fin","anio","semestre","descripcion", "options"]

  @ViewChild(MatPaginator) paginator?: MatPaginator; //referencia al paginador
  pageSizeOptions: number[] =[10, 25, 50, 100] 

  
  constructor(protected tools: ComponentToolsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty("data") && this.table) this.table.renderRows()
  }

  ngOnInit(): void {
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }


  onChangeSort(sort: Sort): void {
    if(this.paginator) this.paginator.pageIndex = 0;

    if(this.tools.serverSort(sort,this.length, this.display, this.data)) return;

    if (!sort.active || sort.direction === '') return;
    
    this.data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {    
      return (sort.direction === 'asc') ? naturalCompare(a[sort.active],b[sort.active]) : naturalCompare(b[sort.active],a[sort.active])
    });

    this.table.renderRows()
  }

  onChangePage($event: PageEvent){
    this.tools.onChangePage($event, this.display)
  }
 
}
