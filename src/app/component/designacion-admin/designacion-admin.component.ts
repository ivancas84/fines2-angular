import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputSelectOptions } from '@class/field-type-options';

@Component({
  selector: 'app-designacion-admin',
  templateUrl: '../../core/component/admin/admin.component.html',
})
export class DesignacionAdminComponent extends AdminComponent {

  readonly entityName: string = "designacion"
  title: string = "Designacion"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
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
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"sede",
      label:"Sede",
      type: new FieldInputAutocompleteOptions({entityName:"sede"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:"persona"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
  ];  
}

