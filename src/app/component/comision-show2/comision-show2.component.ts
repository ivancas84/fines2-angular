import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldLabelOptions, FieldTreeOptions, FieldInputTextOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';

@Component({
  selector: 'app-comision-show2',
  templateUrl: '../../core/component/show/show.component.html',
})
export class ComisionShow2Component extends ShowComponent {

  readonly entityName: string = "comision";

  queryData(): Observable<any>{
    return this.dd.all(this.entityName, this.display).pipe(
      switchMap(data => {
        return this.dd.getAllColumnData(data, "sede", "sede", {domicilio:"domicilio",nombre_sede:"nombre",numero_sede:"numero"} )
      }),
      switchMap(data => {
        return this.dd.getAllColumnData(data, "planificacion", "planificacion", {plan:"plan",anio:"anio",semestre:"semestre"} )
      }),
      switchMap(data => {
        return this.dd.getAllColumnData(data, "plan", "plan", {orientacion:"orientacion"} )
      }),
      switchMap(data => {
        return this.alumnosActivos(data)
      }),
      map(data => {
        data.map (el => {
          el["numero"] =el["numero_sede"] + el["division"]
          el["tramo"] =el["anio"] + "º" + el["semestre"] + "C"

        }); 
        return data;
      }),
    );
  }

  alumnosActivos(
    data: { [index: string]: any }[], 
  ): Observable<{ [index: string]: any }[]>{
    /**
     * Consulta avanzada de relaciones con agrupamiento
     * Define "ids" filtra el campo "id" del parametro "data"
     * Define "display.fields", asigna el parametro fields
     * Define "display.group", asigna el parametro fieldName
     * Define "display.condition", utiliza el parametro "fieldName" y el array ids
     * Consulta entidad indicada en parametro "entityName" para obtener "response"
     * Realiza asociacion entre "data" y "response"
     * Si data[i]["id"] == response[j][fieldName] almacena en data los campos indicados en parametro "fieldsResponse"
     * "fieldsResponse" es un objeto de la forma {nombre_identificacion:nombre_field}
     * si "nombre_field" es un array realiza un join utilizando el parametro "join"
     * A diferencia de las consultas no avanzadas, se especifican los fields directamente en la consulta y se retornan dichos fields que seran asignados
     * Tiene la ventaja de que se reducen los parametros, pero como desventaja no utilizan el storage para las entities.
     */

    var ids = arrayColumn(data, "id")
    for(var i = 0; i < data.length; i++) data["alumnos"] = 0;
    if(!ids.length) return of(data);
    var display = new Display();
    display.setSize(0);
    display.setFields({alumnos:"count"});
    display.setGroup(["comision"]);
    display.addCondition(["comision","=",ids]);
    display.addCondition(["activo","=",true]);
    return this.dd.post("advanced","alumno", display).pipe(
      map(
        response => {
          console.log(response);
          for(var i = 0; i < data.length; i++){
            for(var j = 0; j < response.length; j++){
              if(data[i]["id"] == response[j]["comision"]) {
                data[i]["alumnos"] = response[j]["alumnos"];
                break;
              }
            }
          }
          return data;
        }
      )
    );  
  }

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"nombre_sede",
      label:"Sede",
      aux: new RouterLinkOptions({path:"comision-admin",params:{id:"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type:new TypeLabelOptions({entityName:"domicilio"})
    }),
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
    }),
    new FieldViewOptions({
      field:"orientacion",
      label:"Orientacion",
    }),
    new FieldViewOptions({
      field:"tramo",
      label:"Tramo",
    }),
    new FieldViewOptions({
      field:"turno",
      label:"Turno",
    }),
    new FieldViewOptions({
      field:"alumnos",
      label:"Estudiantes",
      aux:new RouterLinkOptions({path:"alumno-show",params:{comision:"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"identificacion",
      label:"Id Comision",
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"comentario",
      label:"Comentario",
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
      field:"turno",
      label:"Turno",
      type: new FieldInputSelectParamOptions({options:['Mañana','Tarde','Noche']}),
    }),
    new FieldViewOptions({
      field:"autorizada",
      label:"Autorizada",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"apertura",
      label:"Apertura",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"publicada",
      label:"Publicada",
      type: new FieldInputCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type: new FieldInputAutocompleteOptions({entityName:'sede'}),
    }),
    new FieldViewOptions({
      field:"modalidad",
      label:"Modalidad",
      type: new FieldInputSelectOptions({entityName:'modalidad'}),
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type: new FieldInputSelectOptions({entityName:'planificacion'}),
    }),
    new FieldViewOptions({
      field:"comision_siguiente",
      label:"Comision Siguiente",
      type: new FieldInputAutocompleteOptions({entityName:'comision'}),
    }),
    new FieldViewOptions({
      field:"cal-anio",
      label:"Anio",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"cal-semestre",
      label:"Semestre",
      type: new FieldInputSelectParamOptions({options:["1","2","3"]}),
    }),
    new FieldViewOptions({
      field:"identificacion.exists",
      label:"Tiene identificacion?",
      type: new FieldInputSelectCheckboxOptions(),
    }),
  ];  
}

