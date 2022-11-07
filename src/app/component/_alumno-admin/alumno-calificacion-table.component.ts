import { Component } from '@angular/core';
import { TableOneComponent } from '@component/structure/table-one.component';


@Component({
  selector: 'app-alumno-calificacion-table',
  templateUrl: './alumno-calificacion-table.component.html',
  styles: [`
  .highlight{
      background: #ff9999; 
    }
  `],
})

export class AlumnoCalificacionTableComponent extends TableOneComponent {

}


  
  
