import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';

@Component({
  selector: 'app-alumno-comision-show',
  templateUrl: '../../core/component/show/show-dynamic.component.html',
})
export class AlumnoComisionShowComponent extends ShowRelDynamicComponent {

  readonly entityName: string = "alumno_comision";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"per-nombres",
      label:"Nombres",
      aux:new RouterLinkOptions({path: "alumno-admin-rel", params:{persona:"{{persona}})"}}), 
    }),
    new FieldViewOptions({
      field:"per-apellidos",
      label:"Apellidos",
    }),
    new FieldViewOptions({
      field:"per-numero_documento",
      label:"Número Documento",
    }),
    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"anio_ingreso",
      label:"Anio Ingreso",
    }),
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type:new FieldYesNoOptions(),
    }),
    new FieldViewOptions({
      field:"programa",
      label:"Programa",
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:new TypeLabelOptions({entityName: "comision"}),
    }),
  ];  
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"per-search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type: new FieldInputSelectCheckboxOptions(),
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:'persona'}),
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: new FieldInputAutocompleteOptions({entityName:'comision'}),
    }),
  ];  
}

