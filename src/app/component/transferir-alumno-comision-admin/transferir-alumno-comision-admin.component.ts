import { Component } from '@angular/core';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldHiddenOptions, FieldInputTextOptions, FieldControlOptions, FieldInputAutocompleteOptions } from '@class/field-type-options';
import { AdminDynamicComponent } from '@component/admin/admin-dynamic.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-transferir-comision-alumno-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class TransferirAlumnoComisionAdminComponent extends AdminDynamicComponent {

  readonly entityName: string = "alumno"
  persistApi: string = "transferir_alumno_comision";

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"Comisión a transferir",
      type: new FieldInputAutocompleteOptions({entityName:"comision"}),
      control: new FieldControlOptions({validators:Validators.required})

    }),
  ]
}