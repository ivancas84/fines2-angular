import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { arrayColumn } from '@function/array-column';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';

@Component({
  selector: 'app-alumnos-aprobados-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class AlumnosAprobadosShowComponent extends ShowComponent {
  readonly entityName: string = "comision";

  queryData(): Observable<any>{
    return this.dd.all(this.entityName, this.display).pipe(
      switchMap(data => {
        if(!data.length) return of([]);
        var ids = arrayColumn(data, "id").filter(function (el) { return el != null; });
        return this.dd._post("alumnos_aprobados_comision", "calificacion", ids)
      }),
      switchMap(data => {
        return this.dd.getAllColumnData(data, "persona", "persona", {id:"id",nombres:"nombres",apellidos:"apellidos",numero_documento:"numero_documento"})
      }),
    );
  }


  fieldsViewOptions: FieldViewOptions[] = [
    // new FieldViewOptions({
    //   field:"cens",
    //   label:"CENS",
    // }),
    // new FieldViewOptions({
    //   field:"sed-nombre",
    //   label:"Sede",
    //   aux: new RouterLinkOptions({path:"comision-admin",params:{id:"{{id}}"}})
    // }),
    
    // new FieldViewOptions({
    //   field:"domicilio",
    //   label:"Domicilio",
    //   type:new TypeLabelOptions({entityName:"domicilio"})
    // }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:new TypeLabelOptions({entityName:"comision"}),
      aux:new RouterLinkOptions({path:"toma-show",params:{"cur-comision":"{{comision}}"}})
    }),
    new FieldViewOptions({
      field:"nombres",
      label:"Nombres",
      type:new FieldInputTextOptions(),
      aux:new InputPersistOptions({
        entityName:"persona",
        fieldName:"nombres",
      }), 
      
    }),
    new FieldViewOptions({
      field:"apellidos",
      label:"Apellidos",
      type:new FieldInputTextOptions(),
      aux:new InputPersistOptions({
        entityName:"persona",
        fieldName:"apellidos",
      }), 
    }),
    new FieldViewOptions({
      field:"numero_documento",
      label:"Numero Documento",
      type:new FieldInputTextOptions(),
      aux:new InputPersistOptions({
        entityName:"persona",
        fieldName:"numero_documento",

      }), 
    }),
    new FieldViewOptions({
      field:"cantidad",
      label:"Cantidad",
      aux: new RouterLinkOptions({path:"calificacion-show-admin-rel",params:{"persona":"{{id}}"}})
    }),
  ];  

  fieldsViewOptionsSp: FieldViewOptions[] = [
    // new FieldViewOptions({
    //   field:"search",
    //   label:"Buscar",
    //   type: new FieldInputTextOptions(),
    //   width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    // }),
    new FieldViewOptions({
      field:"turno",
      label:"Turno",
      type: new FieldInputSelectParamOptions({options:['Mañana','Tarde','Vespertino']}),
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
    new FieldViewOptions({
      field:"sed-centro_educativo",
      label:"Centro Educativo",
      type: new FieldInputSelectOptions({entityName:"centro_educativo"}),
    }),
  ];  
}

