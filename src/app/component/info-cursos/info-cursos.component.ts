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
import { arrayColumn } from '@function/array-column';
import { arrayObjectsMerge } from '@function/array-objects-merge';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'core-table',
  templateUrl: './info-cursos.component.html',
  styles:[`
  .mat-card-content { overflow-x: auto; }
  .mat-table.mat-table { min-width: 500px; }
  .highlight{
      background: #ff9999; 
    }
  `],
})
export class InfoCursosComponent extends TableSortComponent {
  override entityName: string = "curso"
 
  override initDisplay() {
    var display = new Display();
    display.setParamsByQueryParams(this.params);
    display.setSize(0);
    display.setOrder({
      "sede-numero":"asc", 
      "sede-nombre":"asc",
      "planificacion-anio":"asc",
      "planificacion-semestre":"asc",
      "comision":"asc"
    })
    //display.setParamsByQueryParams(this.params);
    this.display$.next(display)
  }
  
  override initData(): Observable<any>{
    if(this.length === 0) return of([]); 
    return this.dd.post("ids", this.entityName, this.display$.value).pipe(
      switchMap(
        ids => this.dd.entityFieldsGetAll(this.entityName, ids, [
          "id",
          "comision-division",
          "sede-nombre",
          "sede-numero",
          "domicilio-calle",
          "domicilio-entre",
          "domicilio-numero",
          "domicilio-barrio",
          "asignatura-nombre",
          "planificacion-anio",
          "planificacion-semestre",
          "plan-orientacion"
        ])
      ),
      switchMap(
        response =>   this.dd.postAllConnection(response, "info","curso_toma_activa",{"toma":"toma_activa"},"id","curso")
      ),
      switchMap(
        response =>   {
          var ids = arrayColumn(response, "toma")
          return this.dd.entityFieldsGetAll("toma",ids, [
            "fecha_toma",
            "docente-telefono",
          ]).pipe(
            map(
              data => arrayObjectsMerge(response, data, "toma", "id")
            )
          )
        }
      ),
      switchMap(
        response =>   this.dd.postAllConnection(response, "info","curso_horario",{"horario":"horario"},"id","curso")
      ),
      switchMap(
        data =>   {
           return this.dd.postAllConnection(data, "info", "cantidad_alumnos_activos_comision", {"cantidad_alumnos":"cantidad"}, "comision", "comision")
        }
      ),
      map(
        data => {
          data.forEach((element: { [x: string]: string; }) => {
            element["sede-label"] =  element["sede-nombre"] + " (" + element["sede-numero"] + ")"
            element["comision-label"] =  element["sede-numero"] + element["comision-division"] + "/" + element["planificacion-anio"] + element["planificacion-semestre"]
            element["tramo"] =  element["planificacion-anio"] + "º" + element["planificacion-semestre"] + "º " + element["plan-orientacion"]
            element["domicilio-label"] =  element["domicilio-calle"];
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
    "sede-label":["sede-nombre"],
    "comision-label":["sede-numero","comision-division","planificacion-anio","planificacion-semestre"],
    "tramo":["planificacion-anio","planificacion-semestre"]};

  formGroup(): FormGroup {
    return this.fb.group({
      "id":this.fb.control(""),
      "sede-label":this.fb.control(""),
      "comision-label":this.fb.control(""),
      "tramo":this.fb.control(""),
      "asignatura-nombre":this.fb.control(""),
      "domicilio-label":this.fb.control(""),
      "horario":this.fb.control(""),
    })
  }

  
}



  
  
