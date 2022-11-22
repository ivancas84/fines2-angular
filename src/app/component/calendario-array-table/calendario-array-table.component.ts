import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { renderRowsOfTableOnValueChanges, onChangeSortLocal } from '@function/component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendario-array-table',
  templateUrl: './calendario-array-table.component.html',
  styleUrls: ['./calendario-array-table.component.css']
})
export class CalendarioArrayTableComponent implements OnInit {

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() length!: number
  @Input() display!: Display

  @ViewChild("mainContent") content!: ElementRef;

  displayedColumns = ["inicio","fin","anio","semestre","descripcion"]

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  onChangeSort(sort: Sort): void {
    onChangeSortLocal(sort, this.control)
  }

}
