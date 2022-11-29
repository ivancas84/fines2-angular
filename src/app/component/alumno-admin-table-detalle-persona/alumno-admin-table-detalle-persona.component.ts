import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { onSubmit, renderRowsOfTableOnValueChanges } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-alumno-admin-table-detalle-persona',
  templateUrl: './alumno-admin-table-detalle-persona.component.html',
  styleUrls: ['./alumno-admin-table-detalle-persona.component.css']
})
export class AlumnoAdminTableDetallePersonaComponent implements AfterViewInit, OnInit {

  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
  controlContainer: FormGroup = new FormGroup({},{updateOn:"submit"})
  @Output() add: EventEmitter <void> = new EventEmitter <void>();
  @ViewChild(MatTable) table!: MatTable<any>;
  @Output() onSubmit: EventEmitter <string> = new EventEmitter <string>();
  onSubmit$:Subject<any> = new Subject();
  
  constructor(
    protected dd: DataDefinitionService,
    protected dialog: MatDialog,
    protected tools: ComponentToolsService
  ) { }

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["descripcion","archivo","options"]

  ngOnInit(){
    this.controlContainer.addControl("control",this.control)
    onSubmit(this.onSubmit$,this.control).subscribe((validationSuccessful) => this.onSubmit.emit("detalle_persona"));
  }

  remove(index: number){
    var fg = this.control.controls[index]
    if(!fg.get("id")!.value) this.control.removeAt(index)
    else fg.get("_mode")!.setValue("delete");
  }





}
