import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-table-alumno-comision',
  templateUrl: './alumno-admin-table-alumno-comision.component.html',
  styleUrls: ['./alumno-admin-table-alumno-comision.component.css']
})
export class AlumnoAdminTableAlumnoComisionComponent implements AfterViewInit {

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;


  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["comision-label","activo"]

  constructor() { }

  ngOnInit(): void {
  }

}
