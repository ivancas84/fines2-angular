import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ComponentTableService } from '@service/component/component-table-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comision-admin-fieldset-curso',
  templateUrl: './comision-admin-fieldset-curso.component.html',
  styleUrls: ['./comision-admin-fieldset-curso.component.css']
})
export class ComisionAdminFieldsetCursoComponent implements AfterViewInit {

  constructor(
    protected ts: ComponentTableService,
  ) { }

  @Input() control!: FormArray
  @Input() idComision?: string

  protected subscriptions: Subscription = new Subscription() //suscripciones en el ts
 
  @ViewChild(MatTable) table!: MatTable<any>;


  ngAfterViewInit(): void {
    var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }


  displayedColumns = ["asignatura-nombre","horas_catedra","horario"]

  onChangeSort(sort: Sort): void {
    this.ts.onChangeSortLocal(sort, this.control)
  }

    
  @ViewChild("mainContent") content!: ElementRef;
  copyContent(): void {
    this.ts.copyContent(this.content, this.displayedColumns)
  }
 
  printContent(): void {
    this.ts.printContent(this.content, this.displayedColumns)
  }


}
