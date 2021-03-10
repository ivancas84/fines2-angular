import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputSelectOptions } from '@class/field-type-options';
import { AdminRelComponent } from '@component/admin-rel/admin-rel.component';
import { AdminRelStructure } from '@class/admin-rel-structure';

@Component({
  selector: 'app-sede-admin',
  templateUrl: '../../core/component/admin-rel/admin-rel.component.html',
})
export class SedeAdmin2Component extends AdminRelComponent {

  readonly entityName: string = "sede"

  structure:AdminRelStructure[] = [

    new AdminRelStructure({
      id:"sede",
      title: "Sede",
      fieldsViewOptions: [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"numero",
          label:"Numero",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"nombre",
          label:"Nombre",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"observaciones",
          label:"Observaciones",
          type: new FieldInputTextOptions(),
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
        new FieldViewOptions({
          field:"fecha_traspaso",
          label:"Fecha Traspaso",
          type: new FieldInputDateOptions(),
        }),
      ]
    }),

    new AdminRelStructure({
      id:"dom.domicilio",
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

