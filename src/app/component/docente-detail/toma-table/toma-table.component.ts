import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { TableDefinableComponent } from '@component/table-definable/table-definable.component';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  constructor(
    protected router: Router,
    protected ddt: DataDefinitionToolService
  ) {
    super(router);

  }
  
  infoColumns = [
    {
      field:"fecha_toma",
      label:"Fecha Toma",
      type:"date",
      format: "dd/MM/yyyy"
    },
    {
      field:"fecha_fin",
      label:"Fecha Fin",
      type:"date",
      format:"dd/MM/yyyy"
    },
    {
      field:"estado",
      label:"Estado",
      type:"string",
    },
  ];

  initData(data): Observable<any>{
    var display = new Display;
    display.addCondition(["docente","=", data["id"]]);
    display.addOrder("fecha_toma","desc");

    return this.ddt.all("toma",display).pipe(
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "curso", "curso",{comision:"comision"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "comision", "comision",{calendario:"calendario", sede:"sede"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "calendario", "calendario",{fecha_fin:"fin"})}
      ),
      switchMap(
        tomas => {return this.ddt.getAllColumnData(tomas, "sede", "sede",{numero_sede:"numero",nombre_sede:"nombre"})}
      ),
    );
  }


}
