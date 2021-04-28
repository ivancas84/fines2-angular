import { Component } from '@angular/core';
import { ShowDynamicComponent } from '@component/show/show-dynamic.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-persona-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class PersonaShowComponent extends ShowDynamicComponent {

  readonly entityName: string = "persona";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"nombres",
      label:"Nombres",
    }),
    new FieldViewOptions({
      field:"apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"fecha_nacimiento",
      label:"Fecha Nacimiento",
      type:new FieldDateOptions({format:"dd/MM/yyyy"})
    }),
    new FieldViewOptions({
      field:"numero_documento",
      label:"Numero Documento",
    }),
    new FieldViewOptions({
      field:"cuil",
      label:"Cuil",
    }),
    new FieldViewOptions({
      field:"genero",
      label:"Genero",
    }),
    new FieldViewOptions({
      field:"apodo",
      label:"Apodo",
    }),
    new FieldViewOptions({
      field:"telefono",
      label:"Telefono",
    }),
    new FieldViewOptions({
      field:"email",
      label:"Email",
    }),
    new FieldViewOptions({
      field:"email_abc",
      label:"Email Abc",
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type:new TypeLabelOptions({entityName: "domicilio"}),
      aux:new RouterLinkOptions({path: "domicilio-detail", params:{id:"{{domicilio}})"}}), 
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
      field:"fecha_nacimiento",
      label:"Fecha Nacimiento",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type: new FieldInputAutocompleteOptions({entityName:'domicilio'}),
    }),
  ];  
}

