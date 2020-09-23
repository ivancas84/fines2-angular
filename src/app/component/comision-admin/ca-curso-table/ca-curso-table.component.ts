import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { TableComponent } from '@component/table/table.component';
import { arrayColumn } from '@function/array-column';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { DataToolsService } from '@service/data-tools.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ca-curso-table',
  templateUrl: './ca-curso-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
  `],
})
export class CaCursoTableComponent extends TableComponent { 
  displayedColumns: string[] = ['asignatura', 'horas_catedra', 'horario', 'docentes'];

  idComision: string;
  
  cursos$: ReplaySubject<any> = new ReplaySubject();
  loadCursos$: Observable<any>;
  
  constructor(
    protected router: Router, 
    protected dd: DataDefinitionService, 
    protected dialog: MatDialog,
    protected dt: DataToolsService,
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.loadCursos$ = this.cursos$.pipe(
      map(cursos => {
        this.dataSource = cursos;
        return true;
      })
    );
      
      
    this.load$ = this.initData().pipe(
      map(data => {
        this.cursos$.next(data);
        return true;
      })
    );
  }

  initData(){
    return this.data$.pipe(
      tap(comision => {
        if(comision && comision.id) this.idComision = comision.id
        else this.idComision = null;
      }),
      mergeMap(comision => {
        if(comision) {
          let display: Display = new Display();
          display.addParam("comision",comision.id);

          return this.dd.all("curso", display).pipe(
            mergeMap(cursos => { return this.dt.asignarTomasACursos(cursos); } ),
            mergeMap( cursos => { return this.dt.asignarHorariosACursos(cursos); } ),
          )
        }
        return of([]);
      })
    );
  }

  agregarCursos(){
        
    if(this.dataSource.length) { 
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "Ya existen cursos, no puede agregar nuevos"}
      }) ;
    } else {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {title: "Agregar Cursos", message: "Está seguro?"}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.dd.post("persist", "comision_cursos", this.idComision).subscribe(
            () => {
              this.dialog.open(DialogAlertComponent, {
                data: {title: "Registro exitoso", message: "Se han agregado los cursos"}
              }) ;
            }
          );
        }
      });
    }
  }

  existenTomas(){
    for(var i = 0; i < this.dataSource.length; i++){
      if(this.dataSource[i].tomas.length) return true;
    }
    return false;      
  }

  eliminarCursos(){
    if(!this.dataSource.length) { 
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "No existen cursos para eliminar"}
      }) ;
    } else if(this.existenTomas()) {
      const dialogRef = this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "No se pueden eliminar cursos con tomas asignadas"}
      });
    } else {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {title: "Eliminar Cursos", message: "¿Está seguro que desea eliminar cursos?"}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.dd.post("delete", "curso", arrayColumn(this.dataSource, "id")).subscribe(
            () => {
              this.dialog.open(DialogAlertComponent, {
                data: {title: "Eliminación exitosa", message: "Se han eliminado los cursos de la comisión"}
              }) ;
            }
          );
        }
      });
    }
  }

}
