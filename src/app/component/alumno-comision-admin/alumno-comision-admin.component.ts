import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions } from '@class/field-type-options';

@Component({
  selector: 'app-alumno-comision-admin',
  templateUrl: '../../core/component/admin/admin-dynamic.component.html',
})
export class AlumnoComisionAdminComponent extends AdminComponent {

  readonly entityName: string = "alumno_comision"
  title: string = "Alumno Comision"

  fieldsViewOptions: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"id",
      label:"id",
      type: new FieldHiddenOptions,
    }),
    new FieldViewOptions({
      field:"fotocopia_documento",
      label:"Fotocopia Documento",
      type: new FieldInputCheckboxOptions(),
      default:false,
    }),
    new FieldViewOptions({
      field:"partida_nacimiento",
      label:"Partida Nacimiento",
      type: new FieldInputCheckboxOptions(),
      default:false,
    }),
    new FieldViewOptions({
      field:"constancia_cuil",
      label:"Constancia Cuil",
      type: new FieldInputCheckboxOptions(),
      default:false,
    }),
    new FieldViewOptions({
      field:"certificado_estudios",
      label:"Certificado Estudios",
      type: new FieldInputCheckboxOptions(),
      default:false,
    }),
    new FieldViewOptions({
      field:"anio_ingreso",
      label:"Anio Ingreso",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"activo",
      label:"Activo",
      type: new FieldInputCheckboxOptions(),
      default:false,
    }),
    new FieldViewOptions({
      field:"programa",
      label:"Programa",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"observaciones",
      label:"Observaciones",
      type: new FieldInputTextOptions(),
    }),
    new FieldViewOptions({
      field:"persona",
      label:"Persona",
      type: new FieldInputAutocompleteOptions({entityName:"persona"}),
      control: new FieldControlOptions({validators: [Validators.required],})
    }),
    new FieldViewOptions({
      field:"comision",
      label:"Comision",
      type: new FieldInputAutocompleteOptions({entityName:"comision"}),
    }),
  ];  
}

