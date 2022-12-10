import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sede-admin-fieldset-comision',
  templateUrl: './sede-admin-fieldset-comision.component.html',
  styleUrls: ['./sede-admin-fieldset-comision.component.css']
})
export class SedeAdminFieldsetComisionComponent implements AfterViewInit {

  constructor(public tools: ComponentToolsService) { }

  @Input() control!: FormArray

  protected subscriptions: Subscription = new Subscription() 
  
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["numero","tramo","horario","calendario-anio","calendario-semestre","apertura","autorizada","options"] //columnas a visualizar

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

 
  
  @ViewChild("mainContent") content!: ElementRef;
 
  copyContent(): void {
    this.tools.copyContent(this.content, this.displayedColumns)
  }
 
  printContent(): void {
    this.tools.printContent(this.content, this.displayedColumns)
  }


}
