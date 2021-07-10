import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputSelectParamOptions, FieldInputTextOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputUploadOptions } from '@class/field-type-options';
import { AdminRelStructure } from '@class/admin-rel-structure';
import { AdminRelDynamicComponent } from '@component/admin-rel/admin-rel-dynamic.component';

@Component({
  selector: 'app-persona-admin',
  templateUrl: '../../core/component/admin-rel/admin-rel-dynamic.component.html',
})
export class PersonaAdminRelComponent extends AdminRelDynamicComponent {

  readonly entityName: string = "persona"
  queryApi:string = "unique_rel_um"

  structure:AdminRelStructure[] = [

    new AdminRelStructure({
      id:"persona",
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
            {uniqueRoute: "persona-admin-rel", uniqueParam:"persona"},
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
            {uniqueRoute: "persona-admin-rel", uniqueParam:"persona"},
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
        new FieldViewOptions({
          field:"email_abc",
          label:"Email ABC",
          type: new FieldInputTextOptions(),
        }),

      ]
    }),

    new AdminRelStructure({
      id:"detalle_persona/persona",
      title: "Detalle Persona",


      fieldsViewOptions: 
    
      [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"fecha",
          label:"Fecha",
          type: new FieldInputDateOptions(),
          control: new FieldControlOptions({default:new Date()})
        }),
        new FieldViewOptions({
          field:"descripcion",
          label:"Descripcion",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"archivo",
          label:"Archivo",
          type: new FieldInputUploadOptions(),
        }),
      ]  
    
    
    }),
  ]


}

