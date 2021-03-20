import { Component  } from '@angular/core';
import { TableDynamicComponent } from '@component/table-dynamic/table-dynamic.component';

@Component({
  selector: 'app-curso-toma-posesion-table',
  templateUrl: './curso-toma-posesion-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursoTomaPosesionTableComponent extends TableDynamicComponent {
 
  ngOnInit(): void {
    super.ngOnInit();
    //this.displayedColumns.push("comision")
    this.displayedColumns.push("options")
    
  }
  
}
