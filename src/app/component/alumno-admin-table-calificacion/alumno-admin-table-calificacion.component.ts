import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-table-calificacion',
  templateUrl: './alumno-admin-table-calificacion.component.html',
  styleUrls: ['./alumno-admin-table-calificacion.component.css']
})
export class AlumnoAdminTableCalificacionComponent implements AfterViewInit, OnInit {

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  displayedColumns = ["asignatura-nombre","planificacion-anio","planificacion-semestre","nota_final","crec","options"]


}
