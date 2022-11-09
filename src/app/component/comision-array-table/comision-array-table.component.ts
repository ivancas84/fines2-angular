import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { ComponentTableService } from '@service/component/component-table-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comision-array-table',
  templateUrl: './comision-array-table.component.html',
  styleUrls: ['./comision-array-table.component.css']
})
export class ComisionArrayTableComponent implements OnInit {

  constructor(
    protected ts: ComponentTableService,
  ) { }

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() length!: number
  @Input() display!: Display

  @ViewChild("mainContent") content!: ElementRef;

  ngAfterViewInit(): void {
    var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  displayedColumns = ["label","sede","domicilio","tramo","horario","calendario","apertura","autorizada"]

  
  ngOnInit(): void {
  }

}
