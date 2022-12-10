import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { renderRowsOfTableOnValueChanges } from '@function/component';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sede-admin-fieldset-designacion',
  templateUrl: './sede-admin-fieldset-designacion.component.html',
  styleUrls: ['./sede-admin-fieldset-designacion.component.css']
})
export class SedeAdminFieldsetDesignacionComponent implements AfterViewInit {
  
  constructor(public ts: ComponentToolsService) { }

  @Input() control!: FormArray

  protected subscriptions: Subscription = new Subscription() 
  
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ["persona-apellidos","persona-nombres","persona-telefono","persona-email","cargo-descripcion"] //columnas a visualizar

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }



  @ViewChild("mainContent") content!: ElementRef;
 
  copyContent(): void {
    this.ts.copyContent(this.content, this.displayedColumns)
  }
 
  printContent(): void {
    this.ts.printContent(this.content, this.displayedColumns)
  }


}
