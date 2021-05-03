import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputUploadOptions, FieldTextareaOptions } from '@class/field-type-options';
import { AdminRelComponent } from '@component/admin-rel/admin-rel.component';
import { AdminRelStructure } from '@class/admin-rel-structure';

@Component({
  selector: 'app-alumno-admin-rel',
  templateUrl: '../../core/component/admin-rel/admin-rel.component.html',
})
export class AlumnoAdminRelComponent extends AdminRelComponent {

  readonly entityName: string = "alumno"
  queryApi:string = "unique_rel_um"


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



    new AdminRelStructure({
      id:"per-detalle_persona/persona",
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
          default:new Date(),
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



    new AdminRelStructure({
      id:"per-calificacion/persona",
      title: "Calificaciones",


      fieldsViewOptions: 
    
      [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"curso",
          label:"Curso",
          type: new FieldInputAutocompleteOptions({entityName:"curso"}),
        }),
        new FieldViewOptions({
          field:"nota_final",
          label:"Nota Final",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"crec",
          label:"CREC",
          type: new FieldInputTextOptions(),
        }),
        
        new FieldViewOptions({
          field:"observaciones",
          label:"Observaciones",
          type: new FieldTextareaOptions(),
        }),

      ]  
    
    
    }),

    new AdminRelStructure({
      id:"per-alumno_comision/persona",
      title: "Comisiones",


      fieldsViewOptions: 
    
      [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"comision",
          label:"Comision",
          type: new FieldInputAutocompleteOptions({entityName:"comision"}),
        }),
        new FieldViewOptions({
          field:"activo",
          label:"Activo",
          type: new FieldInputCheckboxOptions(),
          default:false,
        }),
        new FieldViewOptions({
          field:"com_cal-anio",
          label:"Año",
          type: new FieldInputYearOptions(),
          control:new FieldControlOptions({disabled:true})
        }),
        new FieldViewOptions({
          field:"com_cal-semestre",
          label:"Semestre",
          type: new FieldInputTextOptions(),
          control:new FieldControlOptions({disabled:true})
        }),
      ]  
    
    
    }),




  ];

  
   
}

