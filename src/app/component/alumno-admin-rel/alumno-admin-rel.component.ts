import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputUploadOptions } from '@class/field-type-options';
import { AdminRelComponent } from '@component/admin-rel/admin-rel.component';
import { AdminRelStructure } from '@class/admin-rel-structure';

@Component({
  selector: 'app-alumno-admin-rel',
  templateUrl: '../../core/component/admin-rel/admin-rel.component.html',
})
export class AlumnoAdminRelComponent extends AdminRelComponent {

  readonly entityName: string = "alumno"

  structure:AdminRelStructure[] = [

    new AdminRelStructure({
      id:"per",
      title: "Persona",
      fieldsViewOptions: [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"nombres",
          label:"Nombres",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"apellidos",
          label:"Apellidos",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"fecha_nacimiento",
          label:"Fecha Nacimiento",
          type: new FieldInputDateOptions(),
        }),
        new FieldViewOptions({
          field:"numero_documento",
          label:"Numero Documento",
          type: new FieldInputTextOptions(
            {uniqueRoute: "alumno-admin-rel", uniqueParam:"persona"},
          ),
          control: new FieldControlOptions({
            validators: [Validators.required],
            asyncValidators: [this.validators.unique('numero_documento', 'persona')],
          })
        }),
        new FieldViewOptions({
          field:"cuil",
          label:"Cuil",
          type: new FieldInputTextOptions(
            {uniqueRoute: "alumno-admin-rel", uniqueParam:"persona"},
          ),
          control: new FieldControlOptions({asyncValidators: [this.validators.unique('cuil', 'persona')],})
        }),
        new FieldViewOptions({
          field:"genero",
          label:"Genero",
          type: new FieldInputSelectParamOptions({options:['Femenino','Masculino','Otro']}),
        }),
        new FieldViewOptions({
          field:"telefono",
          label:"Telefono",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"email",
          label:"Email",
          type: new FieldInputTextOptions(),
        }),

      ]
    }),

    new AdminRelStructure({
      id:"alumno",
      title: "Alumno",
      fieldsViewOptions: [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"tiene_documento",
          label:"Tiene Documento",
          type: new FieldInputCheckboxOptions(),
          default:false,
        }),
        new FieldViewOptions({
          field:"tiene_partida_nacimiento",
          label:"Tiene Partida Nacimiento",
          type: new FieldInputCheckboxOptions(),
          default:false,
        }),
        new FieldViewOptions({
          field:"tiene_cuil",
          label:"Tiene Cuil",
          type: new FieldInputCheckboxOptions(),
          default:false,
        }),
        new FieldViewOptions({
          field:"tiene_certificado_estudios",
          label:"Tiene Certificado Estudios",
          type: new FieldInputCheckboxOptions(),
          default:false,
        }),
        new FieldViewOptions({
          field:"anio_ingreso",
          label:"Anio Ingreso",
          type: new FieldInputSelectParamOptions({options:['1','2','3']}),
        }),
        new FieldViewOptions({
          field:"documento",
          label:"Documento",
          type: new FieldInputUploadOptions(),
        }),
        new FieldViewOptions({
          field:"partida_nacimiento",
          label:"Partida Nacimiento",
          type: new FieldInputUploadOptions(),
        }),
        new FieldViewOptions({
          field:"certificado_estudios",
          label:"Certificado Estudios",
          type: new FieldInputUploadOptions(),
        }),
        new FieldViewOptions({
          field:"cuil",
          label:"Cuil",
          type: new FieldInputUploadOptions(),
        }),
        new FieldViewOptions({
          field:"observaciones",
          label:"Observaciones",
          type: new FieldInputTextOptions(),
        }),
        
      ]
    }),


  ];

  
   
}

