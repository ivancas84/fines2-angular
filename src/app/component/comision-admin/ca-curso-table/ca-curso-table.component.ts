import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { TableComponent } from '@component/table/table.component';
import { arrayColumn } from '@function/array-column';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { DataToolsService } from '@service/data-tools.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ca-curso-table',
  templateUrl: './ca-curso-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
  `],
})
export class CaCursoTableComponent extends TableComponent implements OnDestroy { 
  displayedColumns: string[] = ['asignatura', 'horas_catedra', 'horario', 'docentes'];

  idComision: string;
  
  cursos$: BehaviorSubject<{ [index: string]: any }[]> = new BehaviorSubject([]);

  protected subscriptions = new Subscription();

  constructor(
    protected router: Router, 
    protected dd: DataDefinitionService, 
    protected dialog: MatDialog,
    protected dt: DataToolsService,
    protected storage: SessionStorageService,
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.load$ = this.cursos$.pipe(
      map(cursos => {
        this.dataSource = cursos;
        return true;
      })
    );
   
    var s = this.data$.subscribe(
      comision => {
        this.idComision = (comision && comision.id) ? comision.id : null
        this.initCursos();
    })
    this.subscriptions.add(s);
  }


  initCursos(){
    let display: Display = new Display();
    display.addParam("comision",this.idComision);

    this.dd.all("curso", display).pipe(
      mergeMap(cursos => { return this.dt.asignarTomasACursos(cursos); } ),
      mergeMap( cursos => { return this.dt.asignarHorariosACursos(cursos); } ),
      first(),
    ).subscribe(
      cursos => this.cursos$.next(cursos)
    )
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
          this.dd.post("persist", "comision_cursos", {id:this.idComision}).subscribe(
            () => {
              this.storage.removeItemsContains(".");
              this.initCursos();
              this.dialog.open(DialogAlertComponent, {
                data: {title: "Registro exitoso", message: "Se han agregado los cursos"}
              }) ;
            }
          );
        }
      });
    }
  }

  agregarHorarios(){
    if(!this.dataSource.length) { 
      this.dialog.open(DialogAlertComponent, {
        data: {title: "Error", message: "No existen cursos, no puede agregar horarios"}
      }) ;
      return;
    }

    var idCursos = arrayColumn(this.dataSource, "id");
    var display = new Display();
    display.addParam("curso",idCursos);
    var s = this.dd.post("count","horario", display).subscribe(
      cantidad => {
        if(cantidad) {
          this.dialog.open(DialogAlertComponent, {
            data: {title: "Error", message: "Ya existen horarios, no puede agregar nuevos"}
          }) ;
          return;
        }
        this.router.navigate(['/comision-horarios-admin'], { queryParams: { id: this.idComision } });
      }
    )
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
            response => {
              this.storage.removeItemsContains(".");
              this.storage.removeItemsPersisted(response["detail"]);
              this.initCursos();
              this.dialog.open(DialogAlertComponent, {
                data: {title: "Eliminación exitosa", message: "Se han eliminado los cursos de la comisión"}
              }) ;
            }
          );
        }
      });
    }
  }

  ngOnDestroy () { this.subscriptions.unsubscribe() }


}
