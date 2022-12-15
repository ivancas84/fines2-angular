import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comision-array-table',
  templateUrl: './comision-array-table.component.html',
  styleUrls: ['./comision-array-table.component.css']
})
export class ComisionArrayTableComponent implements AfterViewInit {

  constructor(
    protected tools: ComponentToolsService,
    protected dd: DataDefinitionService,
  ) { }

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

  displayedColumns = ["id", "label","sede","domicilio","tramo","horario","calendario","modalidad-nombre","turno","apertura","autorizada","options"]

  copyContent(): void {
    this.tools.copyContent(this.content, this.displayedColumns)
  }
 
  printContent(): void {
    this.tools.printContent(this.content, this.displayedColumns)
  }

  asignarPlan(index:number): void {
    console.log(this.control.controls[index].get("id")!.value)
    // this.dd._post("persist","actualizar_plan_alumnos_comision",this.control.controls[index].get("id")!.value)
  }

  asignarAnio(index:number): void {
    this.dd._post("persist","actualizar_anio_alumnos_comision",this.control.controls[index].get("id")!.value)
  }

}
