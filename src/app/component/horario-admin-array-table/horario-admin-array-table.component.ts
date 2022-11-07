import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ComponentTableService } from '@service/component/component-table-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horario-admin-array-table',
  templateUrl: './horario-admin-array-table.component.html',
  styleUrls: ['./horario-admin-array-table.component.css']
})
export class HorarioAdminArrayTableComponent implements AfterViewInit {

  constructor(
    protected ts: ComponentTableService,
  ) { }


  @Input() control!: FormArray
  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;

  ngAfterViewInit(): void {
    var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  displayedColumns = ["hora_inicio","hora_fin","curso","dia"]


}
