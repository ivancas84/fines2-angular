import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sede-array-table',
  templateUrl: './sede-array-table.component.html',
  styleUrls: ['./sede-array-table.component.css']
})
export class SedeArrayTableComponent implements AfterViewInit {

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() length!: number
  @Input() display!: Display

  @ViewChild("mainContent") content!: ElementRef;

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["numero","nombre","domicilio","centro_educativo-nombre","options"]


}
