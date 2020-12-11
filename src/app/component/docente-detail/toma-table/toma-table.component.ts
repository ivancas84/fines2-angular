import { Component } from '@angular/core';
import { Display } from '@class/display';
import { TableDefinableComponent } from '@component/table-definable/table-definable.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dd-toma-table',
  templateUrl: './toma-table.component.html',
  styles:[`
    .mat-card-content { overflow-x: auto; }
    .mat-table.mat-table { min-width: 700px; }
    tr.mat-footer-row { font-weight: bold; }
  `],
})
export class DdTomaTableComponent extends TableDefinableComponent { 
  displayedColumns: string[] = ['fecha_toma', 'estado', 'observaciones', 'comentario', 'tipo_movimiento', 'estado_contralor', 'alta', 'curso',  'reemplazo', 'planilla_docente'];

  initData(data): Observable<any>{
    var display = new Display;
    display.addCondition(["docente","=", data["id"]]);
    return this.dd.all("toma",display);
  }


}
