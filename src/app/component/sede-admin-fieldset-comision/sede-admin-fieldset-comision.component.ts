import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ComponentTableService } from '@service/component/component-table-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sede-admin-fieldset-comision',
  templateUrl: './sede-admin-fieldset-comision.component.html',
  styleUrls: ['./sede-admin-fieldset-comision.component.css']
})
export class SedeAdminFieldsetComisionComponent implements AfterViewInit {

  constructor(public ts: ComponentTableService) { }

  @Input() control!: FormArray

  protected subscriptions: Subscription = new Subscription() 
  
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["numero","tramo","horario","calendario-anio","calendario-semestre","apertura","autorizada","options"] //columnas a visualizar

  ngAfterViewInit(): void {
    var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }




}
