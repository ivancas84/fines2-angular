import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputAutocompleteOptions, FieldInputTextOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { Observable } from 'rxjs';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Display } from '@class/display';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-curso-show',
  templateUrl: './curso-show.component.html',
})
export class CursoShowComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "curso";

  queryData(): Observable<any>{
    return this.dd.post("ids", this.entityName, this.display).pipe(
      switchMap(
        ids => {
          return this.ddra.main(this.entityName, ids);
        }
      ),
      switchMap(
        (data: any) => {
          return this.dd.getAllColumnDataUm(data, "comision", "comision", "comision_relacionada")
        }
      ),
      tap(
        data => {
          console.log(data)
        }
      )
    )
  }
  
  initDisplay() {
    this.display = new Display();
    this.display.setSize(100);
    this.display.setParamsByQueryParams(this.params);
    this.display.setCondition([
      ["com_sed-centro_educativo","=","6047d36d50316"],
      ["com_cal-anio","=","2021"],
      ["com_cal-semestre","=","1"],
      ["com-autorizada","=",true]
    ])
  }
  
  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"ige",
      label:"Ige",
    }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type:new TypeLabelOptions({entityName: "asignatura"}),
      //aux:new RouterLinkOptions({path: "asignatura-detail", params:{id:"{{asignatura}})"}}), 
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:new TypeLabelOptions({entityName: "comision"}),
      //aux:new RouterLinkOptions({path: "comision-detail", params:{id:"{{comision}})"}}), 
    }),
    new FieldViewOptions({
      field:"horas_catedra",
      label:"Horas Catedra",
    }),
    
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: new FieldInputAutocompleteOptions({entityName:'comision'}),
    }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type: new FieldInputAutocompleteOptions({entityName:'asignatura'}),
    }),
  ];  
}

