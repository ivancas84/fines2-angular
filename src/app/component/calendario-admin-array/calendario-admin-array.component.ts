import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldInputSelectParamOptions, FieldInputTextOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions } from '@class/field-type-options';
import { FieldViewOptions } from '@class/field-view-options';
import { AdminArrayDynamicComponent } from '@component/admin-array/admin-array-dynamic.component';
import { ValidatorOpt } from '@class/validator-opt';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: '../../core/component/admin-array/admin-array-dynamic.component.html',
})
export class CalendarioAdminArrayComponent extends AdminArrayDynamicComponent {

  readonly entityName: string = "calendario"
  title: string = "Calendario"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"inicio",
      label:"Inicio",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"fin",
      label:"Fin",
      type: new FieldInputDateOptions(),
    }),
    new FieldViewOptions({
      field:"anio",
      label:"Anio",
      type: new FieldInputYearOptions(),
      control: new FieldControlOptions({validatorOpts: [new ValidatorOpt({id:"year", message:"Formato incorrecto", fn:this.validators.year()}), new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})],})
    }),
    new FieldViewOptions({
      field:"semestre",
      label:"Semestre",
      type: new FieldInputSelectParamOptions({options:[1,2]}),
      control: new FieldControlOptions({
        validatorOpts: [
          new ValidatorOpt({id:"required", message:"Debe completar valor", fn:Validators.required})
        ],
      })
    }),
    new FieldViewOptions({
      field:"descripcion",
      label:"Descripcion",
      type: new FieldInputTextOptions(),
    }),
  ];  
}  