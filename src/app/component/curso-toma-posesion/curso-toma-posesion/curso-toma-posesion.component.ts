import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputAutocompleteOptions, FieldInputTextOptions } from '@class/field-type-options';
 import { FieldWidthOptions } from '@class/field-width-options';
import { Observable } from 'rxjs';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Display } from '@class/display';
import { switchMap, tap } from 'rxjs/operators';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-curso-toma-posesion',
  templateUrl: './curso-toma-posesion.component.html',
})
export class CursoTomaPosesionComponent extends ShowComponent {
  /**
   * Lista de cursos para que el docente pueda seleccionar y tomar posesion
   */

  
  readonly entityName: string = "curso";

  

  queryData(): Observable<any>{
    return this.dd.all(this.entityName, this.display).pipe(
      switchMap(
        data => {
          return this.dd.advancedColumnData(data, "comision", "comision", {"numero":"numero", "sede":"sede"});
        }
      ),
      switchMap(
        (data: any) => {
          return this.dd.selectColumnDataUm(data, {"com_numero":"com-numero", "rel_numero":"rel-numero"}, "comision", "comision_relacionada", "comision")
        }
      ),
      switchMap(
        (data: any) => {
          return this.dd.getPostAllColumnData(data, "info", "id", "curso", "curso_horario", {"horario":"horario"})
        }
      ),

      switchMap(
        (data: any) => {
          return this.dd.getAllColumnData(data, "sede", "sede",  {"sed-nombre":"nombre","sed-domicilio":"domicilio"} )
        }
      ),
      switchMap(
        (data: any) => {
          return this.dd.advancedColumnData(data, "sed-domicilio", "domicilio", {"domicilio":"label"} )
        }
      ),
      tap(
        (data: any) => {
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
      [
        ["com_sed-centro_educativo","=","6047d36d50316"],
        ["com_cal-anio","=","2021"],
        ["com_cal-semestre","=","1"],
        ["com-autorizada","=",true]
      ],
      ["id","=",['5e501982a45f0','5f73a42629144'],"OR"] //horas remanentes
    ])
    this.display.setOrder({"com-numero":"asc"})
  }
  
  fieldsViewOptions: FieldViewOptions[] = [
    // new FieldViewOptions({
    //   field:"ige",
    //   label:"Ige",
    // }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type:new TypeLabelOptions({entityName: "asignatura"}),
      //aux:new RouterLinkOptions({path: "asignatura-detail", params:{id:"{{asignatura}})"}}), 
    }),
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
    }),
    new FieldViewOptions({
      field:"sed-nombre",
      label:"Sede",
    }),
    new FieldViewOptions({
      field:"horario",
      label:"Horario",
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
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

