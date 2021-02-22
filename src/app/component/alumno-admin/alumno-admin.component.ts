import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions } from '@class/field-type-options';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { AdminRelComponent } from '@component/admin-rel/admin-rel.component';
import { AdminRelStructure } from '@class/admin-rel-structure';

@Component({
  selector: 'app-alumno-admin',
  templateUrl: '../../core/component/admin-rel/admin-rel.component.html',
  //templateUrl: './alumno-admin.component.html',
  //template: '',
})
export class AlumnoAdminComponent extends AdminRelComponent {

  readonly entityName: string = "alumno"

  structure:AdminRelStructure[] = [

    new AdminRelStructure({
      id:"per-persona",
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
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],asyncValidators: [this.validators.unique('numero_documento', 'persona')],})
        }),
        new FieldViewOptions({
          field:"cuil",
          label:"Cuil",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({asyncValidators: [this.validators.unique('cuil', 'persona')],})
        }),
        new FieldViewOptions({
          field:"genero",
          label:"Genero",
          type: new FieldInputSelectParamOptions({options:['Femenino','Masculino','Otro']}),
        }),
        new FieldViewOptions({
          field:"apodo",
          label:"Apodo",
          type: new FieldInputTextOptions(),
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
        new FieldViewOptions({
          field:"email_abc",
          label:"Email Abc",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({asyncValidators: [this.validators.unique('email_abc', 'persona')],})
        }),
        new FieldViewOptions({
          field:"primer_nombre_apellido",
          label:"Primer Nombre Apellido",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"primer_apellido_nombre",
          label:"Primer Apellido Nombre",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"domicilio",
          label:"Domicilio",
          type: new FieldInputAutocompleteOptions({entityName:"domicilio"}),
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
          type: new FieldInputSelectParamOptions({options:['1','2','3']}),
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
          field:"comision",
          label:"Comision",
          type: new FieldInputAutocompleteOptions({entityName:"comision"}),
        }),
      ]
    }),


  ];

  
   
}

