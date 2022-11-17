import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { onSubmit, renderRowsOfTableOnValueChanges } from '@function/component';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-table-alumno-comision',
  templateUrl: './alumno-admin-table-alumno-comision.component.html',
  styleUrls: ['./alumno-admin-table-alumno-comision.component.css']
})
export class AlumnoAdminTableAlumnoComisionComponent implements AfterViewInit, OnInit {

  controlContainer: FormGroup = new FormGroup({},{updateOn:"submit"})
  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  @Output() add: EventEmitter <void> = new EventEmitter <void>();
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();

  onSubmit$:Subject<any> = new Subject();

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["comision","estado","activo","options"]

  constructor() { }

  ngOnInit(): void {
    onSubmit(this.onSubmit$,this.control,this.onSubmit,"alumno_comision")
  }

  remove(index: number){
    var fg = this.control.controls[index]
    if(!fg.get("id")!.value) this.control.removeAt(index)
    else fg.get("_mode")!.setValue("delete");
  }



}
