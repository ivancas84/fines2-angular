import { Component } from '@angular/core';
import { TableOneComponent } from '@component/structure/table-one.component';

@Component({
  selector: 'app-table-resumen-comisiones',
  templateUrl: './table-resumen-comisiones.component.html',
  styles:[`
    .highlight{
      background: #ff9999; 
    }
  `],
})
export class TableResumenComisionesComponent extends TableOneComponent {

}


  
  
