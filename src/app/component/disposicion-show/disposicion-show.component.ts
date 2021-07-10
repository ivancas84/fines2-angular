import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputAutocompleteOptions, FieldInputTextOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';

@Component({
  selector: 'app-disposicion-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class DisposicionShowComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "disposicion";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type:new TypeLabelOptions({entityName: "asignatura"}),
      aux:new RouterLinkOptions({path: "asignatura-detail", params:{id:"{{asignatura}})"}}), 
    }),
    new FieldViewOptions({
      field:"asi-codigo",
      label:"Codigo",
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
      field:"asignatura",
      label:"Asignatura",
      type: new FieldInputAutocompleteOptions({entityName:'asignatura'}),
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type: new FieldInputAutocompleteOptions({entityName:'planificacion'}),
    }),
    new FieldViewOptions({
      field:"pla-plan",
      label:"Plan",
      type: new FieldInputAutocompleteOptions({entityName:'plan'}),
    }),
  ];  
}

