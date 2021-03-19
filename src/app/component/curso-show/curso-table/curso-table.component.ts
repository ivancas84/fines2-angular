import { Component  } from '@angular/core';
import { TableDynamicComponent } from '@component/table-dynamic/table-dynamic.component';

@Component({
  selector: 'app-curso-table',
  templateUrl: './curso-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursoTableComponent extends TableDynamicComponent {
 
  ngOnInit(): void {
    super.ngOnInit();
    this.displayedColumns.push("options")
    
  }
  
}
