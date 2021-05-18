import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminComponent } from '@component/admin/admin.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputSelectOptions } from '@class/field-type-options';

@Component({
  selector: 'app-calificacion-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class CalificacionAdminComponent extends AdminComponent {

  readonly entityName: string = "calificacion"
  title: string = "Calificacion"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"nota1",
      label:"Nota1",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(10.00), Validators.min(-10.00)],})
    }),
    new FieldViewOptions({
      field:"nota2",
      label:"Nota2",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(99.99), Validators.min(-99.99)],})
    }),
    new FieldViewOptions({
      field:"nota3",
      label:"Nota3",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(99.99), Validators.min(-99.99)],})
    }),
    new FieldViewOptions({
      field:"nota_final",
      label:"Nota Final",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(99.99), Validators.min(-99.99)],})
    }),
    new FieldViewOptions({
      field:"crec",
      label:"Crec",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validators: [Validators.pattern('^-?[0-9]+(\\.[0-9]{1,2})?$'), Validators.max(99.99), Validators.min(-99.99)],})
    }),
    new FieldViewOptions({
      field:"porcentaje_asistencia",
      label:"Porcentaje Asistencia",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"curso",
      label:"Curso",
      type: new FieldInputAutocompleteOptions({entityName:"curso"}),
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:"persona"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type: new FieldInputAutocompleteOptions({entityName:"asignatura"}),
    }),
    new FieldViewOptions({
      field:"planificacion",
      label:"Planificacion",
      type: new FieldInputAutocompleteOptions({entityName:"planificacion"}),
    }),
  ];  
}

