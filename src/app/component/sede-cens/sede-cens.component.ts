import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldControlOptions, FieldHiddenOptions } from '@class/field-type-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-sede-cens',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class SedeCensComponent extends ShowComponent {

  readonly entityName: string = "sede";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
      //aux: new RouterLinkOptions({path:"sede-admin-2",params:{id:"{{id}}"}})
    }),
    new FieldViewOptions({
      field:"nombre",
      label:"Nombre",
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type:new TypeLabelOptions({entityName: "domicilio"}),
    }),
    /*new FieldViewOptions({
      field:"centro_educativo",
      label:"Centro Educativo",
      //type:new TypeLabelOptions({entityName: "centro_educativo"}),
      type:new FieldInputSelectOptions({entityName:"centro_educativo"}),
      aux: new InputPersistOptions({fieldName:"centro_educativo", entityName: "sede", api:"persist",params:{id:"{{id}}"}})  
      //aux:new RouterLinkOptions({path: "centro-educativo-detail", params:{id:"{{centro_educativo}})"}}), 
    }),*/
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"centro_educativo",
      label:"Centro Educativo",
      type: new FieldHiddenOptions(),
    }),
  ];  
}

