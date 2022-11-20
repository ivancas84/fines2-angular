import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { chosenMonthHandler, chosenYearHandler, onSubmit, renderRowsOfTableOnValueChanges } from '@function/component';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-table-calificacion',
  templateUrl: './alumno-admin-table-calificacion.component.html',
  styleUrls: ['./alumno-admin-table-calificacion.component.css']
})
export class AlumnoAdminTableCalificacionComponent implements AfterViewInit, OnInit {

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
  controlContainer: FormGroup = new FormGroup({},{updateOn:"submit"})
  @Output() add: EventEmitter <void> = new EventEmitter <void>();
  @ViewChild(MatTable) table!: MatTable<any>;
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();
  onSubmit$:Subject<any> = new Subject();
  @Input() options: {[i:string]:{[i:string]:any}[]} = {}

  constructor() { }

  chosenYearHandler = chosenYearHandler
  chosenMonthHandler = chosenMonthHandler

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  displayedColumns = ["disposicion","nota_final","crec","fecha","docente-label"]

  ngOnInit(){
    this.controlContainer.addControl("control",this.control)
    onSubmit(this.onSubmit$,this.control,this.onSubmit,"detalle_persona")
  }

  remove(index: number){
    var fg = this.control.controls[index]
    if(!fg.get("id")!.value) this.control.removeAt(index)
    else fg.get("_mode")!.setValue("delete");
  }

  

}
