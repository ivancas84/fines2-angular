import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { ComponentSearchService } from '@service/component/component-search-service';
import { ComponentTableService } from '@service/component/component-table-service';
import { ComponentFormService } from '@service/component/component-form-service';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';


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

  entityName: string = "curso"
  
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
    protected ts: ComponentTableService,
  ) { }

  ngAfterViewInit(): void {
    var s = this.ts.renderRowsOnValueChanges(this.control, this.table)
    this.subscriptions.add(s)
  }

  copyContent(): void {
    this.ts.copyContent(this.content, this.displayedColumns)
  }

  printContent(): void {
    this.ts.copyContent(this.content, this.displayedColumns)
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }

}



  
  
