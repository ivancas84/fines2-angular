import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputSelectOptions } from '@class/field-type-options';
import { AdminRelComponent } from '@component/admin-rel/admin-rel.component';
import { AdminRelStructure } from '@class/admin-rel-structure';

@Component({
  selector: 'app-centro-educativo-admin',
  templateUrl: '../../core/component/admin-rel/admin-rel.component.html',
})
export class CentroEducativoAdminComponent extends AdminRelComponent {

  readonly entityName: string = "centro_educativo"

  structure:AdminRelStructure[] = [

    new AdminRelStructure({
      id:"centro_educativo",
      title: "Centro Educativo",
      fieldsViewOptions: [
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
      ]
    }),

    new AdminRelStructure({
      id:"dom-domicilio",
      title: "Domicilio",
      fieldsViewOptions: [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"calle",
          label:"Calle",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"entre",
          label:"Entre",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"numero",
          label:"Numero",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"piso",
          label:"Piso",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"departamento",
          label:"Departamento",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"barrio",
          label:"Barrio",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"localidad",
          label:"Localidad",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
      ]
    })
  ]
}

