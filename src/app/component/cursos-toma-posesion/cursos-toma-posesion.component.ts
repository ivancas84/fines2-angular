import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Display } from '@class/display';
import { FormArrayConfig } from '@class/reactive-form-config';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { Array2Component } from '@component/structure/array2.component';
import { StructureComponent } from '@component/structure/structure.component';
import { TablePaginatorComponent } from '@component/structure/table-paginator.component';
import { TableSortComponent } from '@component/structure/table-sort.component';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'core-table',
  templateUrl: './cursos-toma-posesion.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  `],
})
export class CursosTomaPosesionComponent extends TableSortComponent implements AfterViewInit {
  override entityName: string = "curso"
 
  override initDisplay() {
    var display = new Display();
    display.setParams(
      {"calendario-anio":"2022","calendario-semestre":2,"comision-autorizada":true}
    )
    display.setSize(0);
    display.setOrder({"sede-numero":"asc", "sede-nombre":"asc","planificacion-anio":"asc","planificacion-semestre":"asc","comision":"asc"})
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }

  override initDisplayedColumns() {
    this.displayedColumns = ["sede","comision","domicilio","asignatura-nombre","tramo","horario","options"]
  }
  
  override initData(): Observable<any>{
    if(this.length === 0) return of([]); 
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll(this.entityName, ids, [
          "id",
          "asignatura-nombre",
          "comision-division",
          "sede-nombre",
          "sede-numero",
          "domicilio-calle",
          "domicilio-entre",
          "domicilio-numero",
          "domicilio-barrio",
          "planificacion-anio",
          "planificacion-semestre",
          "plan-orientacion"
        ])
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_horario",{"horario":"horario"},"id","curso")
      ),
      switchMap(
        data =>   this.dd.postAllConnection(data, "info","curso_toma_activa",{"toma":"toma_activa"},"id","curso")
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["sede"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
            element["comision"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
            element["tramo"] =  element["planificacion-anio"] + "º" + element["planificacion-semestre"] + "º " + element["plan-orientacion"]
            element["domicilio"] =  element["domicilio-calle"];
            if(element["domicilio-entre"]) element["domicilio"] +=  " e/ " + element["domicilio-entre"]
            element["domicilio"] +=  " nº " + element["domicilio-numero"] 
            if(element["domicilio-barrio"]) element["domicilio"] +=  " " + element["domicilio-barrio"]
          })
          return data;
        }
      )
    )
  }

  override serverSortTranslate: { [index: string]: string[] } = {
    sede:["sede-nombre"],
    comision:["sede-numero","comision-division","planificacion-anio","planificacion-semestre"],
    tramo:["planificacion-anio","planificacion-semestre"]};

  formGroup(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
      "sede":this.fb.control(""),
      "comision":this.fb.control(""),
      "tramo":this.fb.control(""),
      "asignatura-nombre":this.fb.control(""),
      "domicilio":this.fb.control(""),
      "horario":this.fb.control(""),
    })
  }

  
}



  
  
