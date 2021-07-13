import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionRelFieldsService } from '@service/data-definition/data-definition-rel-fields.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';

@Component({
  selector: 'app-referente-toma-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class ReferenteTomaShowComponent extends ShowRelDynamicComponent {
  /**
   * Lista de referentes de toma de posesion
   */


  readonly entityName: string = "comision_relacionada";

  title: string = "Referentes";

  initParams(params: any){ 
    if(!params.hasOwnProperty("com-id")) throw "Error de parametros";
    this.params = params; 
  }

  initLength(): Observable<any> {
    return of(undefined);
  }


  queryData(): Observable<any>{
    return this.dd.all("comision_relacionada", this.display).pipe(
      switchMap(
        comision_relacionada_ => {
          var id_comision_ = arrayColumn(comision_relacionada_,'relacion');
          id_comision_.push(this.params["com-id"]);
          return this.dd.getAll("comision", id_comision_)
        }
      ),
      switchMap(
        comision_ => {
          var id_sede_ = arrayColumn(comision_,"sede");

          var display = new Display();
          display.setSize(0);
          display.setCondition([
            ["sede","=",id_sede_],
            ["hasta","=",false],
            ["cargo","=",1] //referente
          ]);

          return this.dd.post("ids", "designacion", display);
        }
      ),
      switchMap(
        ids => this.ddrf.getAllFvo("designacion", ids, this.fieldsViewOptions)
      )
    )
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"sed-numero",
      label:"Grupo de Alumnos",
    }),
    new FieldViewOptions({
      field:"per-nombres",
      label:"Nombres",
    }),
    new FieldViewOptions({
      field:"per-apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"per-telefono",
      label:"Teléfono",
    }),
    new FieldViewOptions({
      field:"per-email",
      label:"Email",
    }),
  ];  
}

