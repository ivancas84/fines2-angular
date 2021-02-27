import { Component } from '@angular/core';
import { ShowComponent } from '@component/show/show.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-centro-educativo-show',
  templateUrl: '../../core/component/show/show.component.html',
})
export class CentroEducativoShowComponent extends ShowComponent {

  readonly entityName: string = "centro_educativo";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"nombre",
      label:"Nombre",
      aux: new RouterLinkOptions({path:"centro-educativo-admin",params:{id:"{{id}}"}})

    }),
    new FieldViewOptions({
      field:"cue",
      label:"Cue",
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type:new TypeLabelOptions({entityName: "domicilio"}),
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
      field:"domicilio",
      label:"Domicilio",
      type: new FieldInputAutocompleteOptions({entityName:'domicilio'}),
    }),
  ];  
}

