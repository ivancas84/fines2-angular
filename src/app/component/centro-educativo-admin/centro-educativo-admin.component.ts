import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions } from '@class/field-type-options';

@Component({
  selector: 'app-centro-educativo-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class CentroEducativoAdminComponent extends AdminComponent {

  readonly entityName: string = "centro_educativo"
  title: string = "Centro Educativo"

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
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"cue",
      label:"Cue",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({asyncValidators: [this.validators.unique('cue', 'centro_educativo')],})
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type: new FieldInputAutocompleteOptions({entityName:"domicilio"}),
    }),
  ];  
}

