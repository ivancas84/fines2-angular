import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';

@Component({
  selector: 'app-referente-toma-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class ReferenteTomaShowComponent extends ShowRelDynamicComponent {
  /**
   * Lista de referentes de toma de posesion
   */

  readonly entityName: string = "comision_relacionada";

  initParams(params: any){ 
    if(!params.hasOwnProperty("comision")) throw "Error de parametros";
    return params; 
  }

  initLength(): Observable<any> {
    return of(false);
  }


  queryData(): Observable<any>{
    return this.dd.all("comision_relacionada", this.display).pipe(
      switchMap(
        comision_relacionada_ => {
          var id_comision_ = arrayColumn(comision_relacionada_,'comision');
          id_comision_.push(this.params["comision"]);
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
        ids => this.dd.relGetAllFvo("designacion", ids, this.fieldsViewOptions)
      )
    )
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type:new TypeLabelOptions({entityName: "sede"}),
      aux:new RouterLinkOptions({path: "sede-detail", params:{id:"{{sede}})"}}), 
    }),
    new FieldViewOptions({
      field:"per-nombres",
      label:"Nombres",
    }),
  ];  
}

