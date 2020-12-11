import { Component } from '@angular/core';
import { TableComponent } from '@component/table/table.component';

@Component({
  selector: 'app-docente-table',
  templateUrl: './docente-table.component.html',
  styles:[`
    .mat-card-content { overflow-x: auto; }
    .mat-table.mat-table { min-width: 700px; }
    tr.mat-footer-row { font-weight: bold; }
  `],
})
export class DocenteTableComponent extends TableComponent { 
  displayedColumns: string[] = ['nombres', 'apellidos', 'fecha_nacimiento', 'numero_documento', 'cuil', 'genero', 'apodo', 'telefono', 'email', 'email_abc', 'alta'];

}
