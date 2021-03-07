import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldHiddenOptions, FieldInputTextOptions, FieldControlOptions, FieldInputAutocompleteOptions, FieldInputCheckboxOptions, FieldInputSelectParamOptions } from '@class/field-type-options';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowAdminDynamicComponent } from '@component/show-admin-dynamic/show-admin-dynamic.component';

@Component({
  selector: 'app-asignatura-show-admin',
  templateUrl: '../../core/component/show-admin-dynamic/show-admin-dynamic.component.html',
})
export class AsignaturaShowAdminComponent extends ShowAdminDynamicComponent {
  /**
   * Compatible con ShowAdminDynamicComponent 1.x
   */
  
  readonly entityName: string = "asignatura";

  title: string = "Asignatura"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"nombre",
      label:"Nombre",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({
        validators: [Validators.required],
        asyncValidators: [this.validators.unique('nombre', 'asignatura')],
      })
    }),
    
    new FieldViewOptions({
      field:"formacion",
      label:"Formacion",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"clasificacion",
      label:"Clasificacion",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"codigo",
      label:"Codigo",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"perfil",
      label:"Perfil",
      type: new FieldInputTextOptions(),
    }),
  ];   
 
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
  ];  
}

