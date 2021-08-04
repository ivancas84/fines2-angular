import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions } from '@class/field-type-options';
import { ValidatorOpt } from '@class/validator-opt';

@Component({
  selector: 'app-curso-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class CursoAdminComponent extends AdminComponent {

  readonly entityName: string = "curso"
  title: string = "Curso"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"horas_catedra",
      label:"Horas Catedra",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validatorOpts: [new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})],})
    }),
    new FieldViewOptions({
      field:"ige",
      label:"Ige",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: new FieldInputAutocompleteOptions({entityName:"comision"}),
      control: new FieldControlOptions({validatorOpts: [new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})],})
    }),
    new FieldViewOptions({
      field:"asignatura",
      label:"Asignatura",
      type: new FieldInputAutocompleteOptions({entityName:"asignatura"}),
      control: new FieldControlOptions({validatorOpts: [new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})],})
    }),
  ];  
}

