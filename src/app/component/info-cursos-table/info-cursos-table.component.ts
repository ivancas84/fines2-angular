import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ComponentToolsService } from '@service/component-tools/component-tools.service';
import { renderRowsOfTableOnValueChanges } from '@function/component';


@Component({
  selector: 'app-info-cursos-table',
  templateUrl: './info-cursos-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  .item { padding:0px 10px;  }
  `],
})
export class InfoCursosTableComponent implements AfterViewInit {
  protected subscriptions: Subscription = new Subscription() 
  @Input() control!: FormArray
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild("mainContent") content!: ElementRef;


  displayedColumns: string[] = [
    "toma_fecha_toma", 
    "sede-label",
    "domicilio-label",
    "comision-label",
    "tramo",
    "cantidad_alumnos",
    "asignatura-nombre",
    "horario",
    "toma_docente-label",
    "toma_docente-telefono"
  ]

  constructor(
    protected tools: ComponentToolsService,
  ) { }

  ngAfterViewInit(): void {
    var s = renderRowsOfTableOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  copyContent(): void {
    this.tools.copyContent(this.content, this.displayedColumns)
  }

  printContent(): void {
    this.tools.printContent(this.content, this.displayedColumns)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

  
  


}



  
  
