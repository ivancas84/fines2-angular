import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { TypeLabelOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-designacion-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class DesignacionShowComponent extends ShowDynamicComponent {

  readonly entityName: string = "designacion";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"desde",
      label:"Desde",
      type:new FieldDateOptions({format:"dd/MM/yyyy"}),
      aux: new RouterLinkOptions({path:"designacion-admin"})
    }),
    new FieldViewOptions({
      field:"hasta",
      label:"Hasta",
      type:new FieldDateOptions({format:"dd/MM/yyyy"})
    }),
    new FieldViewOptions({
      field:"cargo",
      label:"Cargo",
      type:new TypeLabelOptions({entityName: "cargo"}),
      aux:new RouterLinkOptions({path: "cargo-detail", params:{id:"{{cargo}})"}}), 
    }),
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type:new TypeLabelOptions({entityName: "sede"}),
      aux:new RouterLinkOptions({path: "sede-detail", params:{id:"{{sede}})"}}), 
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type:new TypeLabelOptions({entityName: "persona"}),
      aux:new RouterLinkOptions({path: "persona-admin", params:{id:"{{persona}})"}}), 
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
      field:"desde",
      label:"Desde",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"hasta",
      label:"Hasta",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"cargo",
      label:"Cargo",
      type: new FieldInputSelectOptions({entityName:'cargo'}),
    }),
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type: new FieldInputAutocompleteOptions({entityName:'sede'}),
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
  ];  
}

