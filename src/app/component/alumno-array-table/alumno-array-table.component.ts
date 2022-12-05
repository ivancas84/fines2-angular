import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-array-table',
  templateUrl: './alumno-array-table.component.html',
  styleUrls: ['./alumno-array-table.component.css']
})
export class AlumnoArrayTableComponent implements AfterViewInit {

  constructor() { }

  @Input() control!: FormArray

  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() length!: number
  @Input() display!: Display

  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts

  @ViewChild("mainContent") content!: ElementRef;

  displayedColumns = [
    "persona-apellidos",
    "persona-nombres",
    "persona-numero_documento",
    "persona-telefono",
    "persona-email",
    "comision-label",
    "estado",
    "alumno-estado_inscripcion",
    "alumno-tiene_constancia",
    "alumno-tiene_certificado",
    "alumno-previas_completas",
    "cantidad_aprobadas_11",
    "cantidad_aprobadas_12",
    "cantidad_aprobadas_21",
    "cantidad_aprobadas_22",
    "cantidad_aprobadas_31",
    "cantidad_aprobadas_32",
    "alumno-tramo_ingreso",
    "alumno-observaciones",
    "options",
  ]


  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }


}
