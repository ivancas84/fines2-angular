import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldYesNoOptions, TypeLabelOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputAutocompleteOptions, FieldInputSelectOptions, FieldInputTextOptions, FieldDateOptions, FieldInputDateOptions, FieldInputSelectCheckboxOptions } from '@class/field-type-options';
import { InputPersistOptions, RouterLinkOptions } from '@class/field-view-aux-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowRelDynamicComponent } from '@component/show/show-rel-dynamic.component';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
      field:"activo",
      label:"Activo",
      type: new FieldInputCheckboxOptions(),
      aux:new InputPersistOptions({
         entityName:"alumno_comision",
         fieldName:"activo",
      })
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type:new TypeLabelOptions({entityName: "comision"}),
    }),
    new FieldViewOptions({
      field:"per-email",
      label:"Email",
    }),
    new FieldViewOptions({
      field:"per-telefono",
      label:"Teléfono",
      type: new FieldInputTextOptions(),
      aux:new InputPersistOptions({
         entityName:"persona",
         fieldName:"telefono",
         params: {id:"{{persona}}"}//utilizar {{key}} para identificar valor del conjunto de datos
      })
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

