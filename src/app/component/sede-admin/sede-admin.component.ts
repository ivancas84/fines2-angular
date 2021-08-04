import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputSelectOptions } from '@class/field-type-options';
import { ValidatorOpt } from '@class/validator-opt';

@Component({
  selector: 'app-sede-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class SedeAdminComponent extends AdminComponent {

  readonly entityName: string = "sede"
  title: string = "Sede"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"numero",
      label:"Numero",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validatorOpts: [new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})],})
    }),
    new FieldViewOptions({
      field:"nombre",
      label:"Nombre",
      type: new FieldInputTextOptions(),
      control: new FieldControlOptions({validatorOpts: [new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})],})
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"fecha_traspaso",
      label:"Fecha Traspaso",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"domicilio",
      label:"Domicilio",
      type: new FieldInputAutocompleteOptions({entityName:"domicilio"}),
    }),
    new FieldViewOptions({
      field:"tipo_sede",
      label:"Tipo Sede",
      type: new FieldInputSelectOptions({entityName:'tipo_sede'}),
    }),
    new FieldViewOptions({
      field:"centro_educativo",
      label:"Centro Educativo",
      type: new FieldInputSelectOptions({entityName:'centro_educativo'}),
    }),
  ];  
}

