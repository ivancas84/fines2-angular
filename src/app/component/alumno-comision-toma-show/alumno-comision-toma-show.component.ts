import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { DataDefinitionRelFieldsService } from '@service/data-definition/data-definition-rel-fields.service';

@Component({
  selector: 'app-alumno-comision-toma-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class AlumnoComisionTomaShowComponent extends ShowRelDynamicComponent {
  /**
   * Lista de referentes de toma de posesion
   */

  readonly entityName: string = "alumno_comision";

  title: string = "Alumnos";


  initParams(params: any){ 
    if(!params.hasOwnProperty("com-id")) throw "Error de parametros";
    this.params = params; 
  }

  queryData(): Observable<any>{

    return this.dd.all("comision_relacionada", this.display).pipe(
      switchMap(
        comision_relacionada_ => {
          var id_comision_ = arrayColumn(comision_relacionada_,'relacion');
          id_comision_.push(this.params["com-id"]);

          var display = new Display();
          display.setSize(0);
          display.setCondition([
            ["comision","=",id_comision_],
            ["activo","=",true],
          ]);
          return this.dd.post("ids", "alumno_comision", display)
        }
      ),
      switchMap(
        ids => this.ddrf.getAllFvo("alumno_comision", ids, this.fieldsViewOptions)
      )
    )
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"alu_per-nombres",
      label:"Nombres",
    }),
    new FieldViewOptions({
      field:"alu_per-apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"alu_per-numero_documento",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"alu_per-telefono",
      label:"Teléfono",
    }),
    new FieldViewOptions({
      field:"alu_per-email",
      label:"Email",
    }),
  ];  
}

