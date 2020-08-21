import { Component } from '@angular/core';
import { TableComponent } from '@component/table/table.component';

@Component({
  selector: 'app-persona-table',
  templateUrl: './persona-table.component.html',
   styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
  `],
})
export class PersonaTableComponent extends TableComponent { 
  displayedColumns: string[] = ['nombres', 'apellidos', 'fecha_nacimiento', 'numero_documento', 'cuil', 'genero', 'apodo', 'telefono', 'email', 'alta', 'domicilio'];

}
