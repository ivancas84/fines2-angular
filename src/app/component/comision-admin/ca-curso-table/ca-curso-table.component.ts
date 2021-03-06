import { OnInit, OnChanges, Component, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from '@component/dialog-confirm/dialog-confirm.component';
import { TableComponent } from '@component/table/table.component';
import { arrayColumn } from '@function/array-column';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { DataToolsService } from '@service/data-tools.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ca-curso-table',
  templateUrl: './ca-curso-table.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 700px; }
  `],
})
export class CaCursoTableComponent extends TableComponent implements OnInit, OnChanges, OnDestroy { 
  load$: Observable<any>;
  load: boolean;
  data$: BehaviorSubject<any> = new BehaviorSubject(null);
  dataSource: any;

  displayedColumns: string[] = ['asignatura', 'horas_catedra', 'horario', 'docentes'];
  idComision: string;

  protected subscriptions = new Subscription();

  constructor(
    protected router: Router,
    protected dd: DataDefinitionToolService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected storage: SessionStorageService,

    protected dt: DataToolsService,
    
  ) {
    super(router, dd, dialog, snackBar, storage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['data'] && changes['data'].previousValue != changes['data'].currentValue ) {    
        this.data$.next(changes['data'].currentValue);
    }
  }
  
  ngOnInit(): void {
    this.load$ = this.data$.pipe(
      tap(
        comision => {
          this.load = false;
          this.idComision = (comision && comision.id) ? comision.id : null
          this.initCursos();
        }
      ),  
      switchMap(
        () => {return this.initCursos();}
      ),
      map(
        data => {
          this.dataSource = data;
          this.load = true;
          return true;
        }
      )
    )
  }

  initCursos(): Observable<any>{
    if(!this.idComision) return of([]);
    let display: Display = new Display();
    display.addParam("comision",this.idComision);

    return this.dd.all("curso", display).pipe(
      mergeMap(cursos => { return this.dt.asignarTomasACursos(cursos); } ),
      mergeMap( cursos => { return this.dt.asignarHorariosACursos(cursos); } ),   
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

      var s = dialogRef.afterClosed().subscribe(result => {
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

      this.subscriptions.add(s);
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
