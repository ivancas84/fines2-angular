import { Component } from '@angular/core';
import { FormArrayConfig } from '@class/reactive-form-config';
import { ControlValueConfig } from '@component/control-value/control-value.component';
import { TableComponent } from '@component/structure/table.component';

@Component({
  selector: 'core-table',
  templateUrl: '../../core/component/structure/table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class AsignaturaArrayComponent extends TableComponent {

  override readonly entityName: string = "asignatura";

  override config: FormArrayConfig = new FormArrayConfig({}, {
    "nombre": new ControlValueConfig,
    "formacion": new ControlValueConfig,
  })




}


  
  
