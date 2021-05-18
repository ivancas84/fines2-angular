import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputSelectCheckboxOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { OptEventIcon, OptRouteIcon } from '@class/opt';

@Component({
  selector: 'app-calificacion-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class CalificacionShowComponent extends ShowDynamicComponent {

  readonly entityName: string = "calificacion";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"nota1",
      label:"Nota1",
    }),
    new FieldViewOptions({
      field:"nota2",
      label:"Nota2",
    }),
    new FieldViewOptions({
      field:"nota3",
      label:"Nota3",
    }),
    new FieldViewOptions({
      field:"nota_final",
      label:"Nota Final",
    }),
    new FieldViewOptions({
      field:"crec",
      label:"Crec",
    }),
    new FieldViewOptions({
      field:"porcentaje_asistencia",
      label:"Porcentaje Asistencia",
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"curso",
      label:"Curso",
      type:new TypeLabelOptions({entityName: "curso"}),
      aux:new RouterLinkOptions({path: "curso-detail", params:{id:"{{curso}})"}}), 
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-detail", params:{id:"{{persona}})"}}), 
    }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type:new TypeLabelOptions({entityName: "asignatura"}),
      aux:new RouterLinkOptions({path: "asignatura-detail", params:{id:"{{asignatura}})"}}), 
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type:new TypeLabelOptions({entityName: "planificacion"}),
      aux:new RouterLinkOptions({path: "planificacion-detail", params:{id:"{{planificacion}})"}}), 
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
      field:"curso",
      label:"Curso",
      type: new FieldInputAutocompleteOptions({entityName:'curso'}),
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type: new FieldInputAutocompleteOptions({entityName:'asignatura'}),
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type: new FieldInputAutocompleteOptions({entityName:'planificacion'}),
    }),
  ];
  
  optColumn = [
    new OptRouteIcon({template:"edit", action:"calificacion-admin"}),
  ]
}

