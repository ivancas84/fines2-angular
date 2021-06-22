import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputAutocompleteOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions, FieldInputSelectParamOptions } from '@class/field-type-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-detalle-persona-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class DetallePersonaShowComponent extends ShowDynamicComponent {

  readonly entityName: string = "detalle_persona";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"descripcion",
      label:"Descripcion",
    }),
    new FieldViewOptions({
      field:"fecha",
      label:"Fecha",
      type:new FieldDateOptions({format:"dd/MM/yyyy"})
    }),
    new FieldViewOptions({
      field:"tipo",
      label:"Tipo",
    }),
    new FieldViewOptions({
      field:"archivo",
      label:"Archivo",
      type:new TypeLabelOptions({entityName: "file"}),
      aux:new RouterLinkOptions({path: "file-detail", params:{id:"{{archivo}})"}}), 
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-detail", params:{id:"{{persona}})"}}), 
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
      field:"fecha",
      label:"Fecha",
      type: new FieldInputDateOptions(),
      aux:new InputPersistOptions({
         entityName:"detalle_persona",
         fieldName:"fecha",
         params: {id:"{{id}}"}
      })
    }),
    new FieldViewOptions({
      field:"tipo",
      label:"Tipo",
      type: new FieldInputSelectParamOptions({options:["Solicitud",'Legajo', "Información"]}),
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
  ];  
}

