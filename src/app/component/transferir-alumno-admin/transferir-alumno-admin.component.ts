import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldHiddenOptions, FieldInputTextOptions, FieldControlOptions, FieldInputAutocompleteOptions } from '@class/field-type-options';
import { AdminDynamicComponent } from '@component/admin/admin-dynamic.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-transferir-alumno-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class TransferirAlumnoAdminComponent extends AdminDynamicComponent {

  readonly entityName: string = "alumno"
  persistApi: string = "transferir_alumno";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"Alumno a transferir",
      type: new FieldInputAutocompleteOptions({entityName:"persona"}),
      control: new FieldControlOptions({validators:Validators.required})

    }),
    new FieldViewOptions({
      field:"persona",
      label:"Alumno",
      type: new FieldInputAutocompleteOptions({entityName:"persona"}),
      control: new FieldControlOptions({validators:Validators.required})
    }),
  ]
}