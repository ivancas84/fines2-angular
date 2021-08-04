import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputUploadOptions, FieldTextareaOptions, FieldInputSelectOptions } from '@class/field-type-options';
import { AdminRelDynamicComponent } from '@component/admin-rel/admin-rel-dynamic.component';
import { AdminRelStructure } from '@class/admin-rel-structure';
import { FieldWidthOptions } from '@class/field-width-options';
import { OptEventIcon, OptLinkIcon } from '@class/opt';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { PDF_URL } from '@config/app.config';
import { UniqueValidatorOpt, ValidatorOpt } from '@class/validator-opt';

@Component({
  selector: 'app-alumno-admin-rel',
  templateUrl: '../../core/component/admin-rel/admin-rel-dynamic.component.html',
})
export class AlumnoAdminRelComponent extends AdminRelDynamicComponent {

  readonly entityName: string = "alumno"
  queryApi:string = "unique_rel_um"

  optColumn = [
    new OptLinkIcon({
      action:PDF_URL+"certificado_alumno_regular.php", 
      template:"description",
      key:"alumno", 
      target:"_blank",
      title:"Constancia de Alumno Regular"
    }),
    new OptLinkIcon({
      action:PDF_URL+"constancia_general_finalizo.php", 
      template:"description",
      key:"alumno", 
      target:"_blank",
      title:"Constancia de Finalización de Estudios"
    }),
    new OptEventIcon({action:"email-inscripcion", template:"mail",key:"per"}),
    new OptEventIcon({
      action:"email-inscripcion", 
      template:"mail",
      key:"alumno"
    }),

  ]

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
            validatorOpts: [
              new ValidatorOpt({
                id:"required",
                message:"Debe completar valor",
                fn:Validators.required,
              })
            ],
            asyncValidatorOpts: [
              new UniqueValidatorOpt({
                message:"Valor utilizado",
                fn:this.validators.unique('numero_documento', 'persona'),
                route:"alumno-admin-rel",
                uniqueParam:"persona"
              })
            ]
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
        new FieldViewOptions({
          field:"telefono_verificado",
          label:"Teléfono Verificado",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})
        }),
        new FieldViewOptions({
          field:"email_verificado",
          label:"Email Verificado",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})
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
        // new FieldViewOptions({
        //   field:"estado_legajo",
        //   label:"Estado Legajo",
        //   type: new FieldInputSelectParamOptions({options:['Completo','Incompleto']}),
        // }),
        
        new FieldViewOptions({
          field:"anio_ingreso",
          label:"Anio Ingreso",
          type: new FieldInputSelectParamOptions({options:['1','2','3']}),
        }),
        new FieldViewOptions({
          field:"semestre_ingreso",
          label:"Semestre Ingreso",
          type: new FieldInputSelectParamOptions({options:[1,2]}),
          control: new FieldControlOptions({default:1})
        }),
        new FieldViewOptions({
          field:"estado_inscripcion",
          label:"Estado inscripcion",
          type: new FieldInputSelectParamOptions({options:['Correcto','Indeterminado','Caso particular']}),
        }),

        new FieldViewOptions({
          field:"adeuda_legajo",
          label:"Adeuda Legajo",
          type: new FieldTextareaOptions(),
        }),
        new FieldViewOptions({
          field:"adeuda_deudores",
          label:"Adeuda Deudores",
          type: new FieldTextareaOptions(),
        }),   
        

        new FieldViewOptions({
          field:"resolucion_inscripcion",
          label:"Resolucion Inscripcion",
          type: new FieldInputSelectOptions({entityName:"resolucion"}),
        }),
        new FieldViewOptions({
          field:"anio_inscripcion",
          label:"Año Inscripcion",
          type: new FieldInputSelectParamOptions({options:[1,2,3,4,5,6,7,8,9]}),
        }),
        new FieldViewOptions({
          field:"semestre_inscripcion",
          label:"Semestre Inscripcion",
          type: new FieldInputSelectParamOptions({options:[1,2]}),
          control:new FieldControlOptions({default:1})
        }),

        new FieldViewOptions({
          field:"tiene_dni",
          label:"Tiene DNI",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),

        new FieldViewOptions({
          field:"tiene_cuil",
          label:"Tiene CUIL",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),

        new FieldViewOptions({
          field:"tiene_constancia_primaria",
          label:"Tiene Constancia Primaria",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),

        new FieldViewOptions({
          field:"tiene_certificado_primaria",
          label:"Tiene Certificado Primaria",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),
        

        new FieldViewOptions({
          field:"tiene_constancia_secundaria",
          label:"Tiene Constancia Secundaria",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),

        new FieldViewOptions({
          field:"tiene_analitico_secundaria",
          label:"Tiene Analitico Secundaria",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),

        new FieldViewOptions({
          field:"tiene_declaracion_jurada",
          label:"Tiene Declaracion Jurada",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})

        }),
        
        
        
        
        new FieldViewOptions({
          field:"plan",
          label:"Plan",
          type: new FieldInputAutocompleteOptions({entityName:"plan"}),
        }),
        new FieldViewOptions({
          field:"observaciones",
          label:"Observaciones",
          type: new FieldTextareaOptions(),
        }),
        new FieldViewOptions({
          field:"fecha_titulacion",
          label:"Fecha Titulacion",
          type: new FieldInputDateOptions(),
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
          control:new FieldControlOptions({default:new Date()})
          
        }),
        new FieldViewOptions({
          field:"descripcion",
          label:"Descripcion",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({default:"Legajo", validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"tipo",
          type: new FieldInputSelectParamOptions({options:['Legajo', 'Información', 'Solicitud', "Solicitud Resuelta", "Certificado", "Inscripción"]}),
          control: new FieldControlOptions({default:"Legajo", validators: [Validators.required],}),
        }),
        new FieldViewOptions({
          field:"archivo",
          label:"Archivo",
          type: new FieldInputUploadOptions(),
        }),
      ]  
    }),

    new AdminRelStructure({
      id:"calificacion/alumno",
      title: "Calificaciones",
      order: {"dis_pla-anio":"asc","dis_pla-semestre":"asc","dis_asi-nombre":"asc"},

      fieldsViewOptions: 
    
      [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"disposicion",
          label:"Disposicion",
          type: new FieldInputAutocompleteOptions({entityName:"disposicion"}),
          width:new FieldWidthOptions({"gtSm":"50%"})
        }),

        new FieldViewOptions({
          field:"nota_final",
          label:"Nota Final",
          type: new FieldInputTextOptions(),
          width:new FieldWidthOptions({"gtSm":"13%"})

        }),
        new FieldViewOptions({
          field:"crec",
          label:"CREC",
          type: new FieldInputTextOptions(),
          width:new FieldWidthOptions({"gtSm":"13%"})
        }),
        
        new FieldViewOptions({
          field:"observaciones",
          label:"Observaciones",
          type: new FieldTextareaOptions(),
          width:new FieldWidthOptions({"gtSm":"24%"})
        }),


        


      ]  
    
    
    }),





    new AdminRelStructure({
      id:"disposicion_pendiente/alumno",
      title: "Disposiciones Pendientes",


      fieldsViewOptions: 
    
      [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"disposicion",
          label:"Disposicion",
          type: new FieldInputAutocompleteOptions({entityName:"disposicion"}),
          width:new FieldWidthOptions({"gtSm":"75%"})

        }),

        new FieldViewOptions({
          field:"modo",
          label:"Modo",
          type: new FieldInputTextOptions,
          width:new FieldWidthOptions({"gtSm":"25%"})

        }),
       
      ]  
    }),




    new AdminRelStructure({
      id:"alumno_comision/alumno",
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
          control: new FieldControlOptions({default:false})
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


  switchAction($event:any){ 
    switch($event.action){
      case "email-inscripcion": 
        this.dd._post("email_inscripcion","toma",$event.data).subscribe(
          () => {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Email enviado", message: "Se ha enviado el email de inscripción"}
            })
          }
        )
      break;
      case "email-calificaciones": 
        this.dd._post("email_calificaciones","alumno",$event.data).subscribe(
          () => {
            this.dialog.open(DialogAlertComponent, {
              data: {title: "Email enviado", message: "Se ha enviado el email de inscripción"}
            })
          }
        )
      break;
      default:
        super.switchAction($event)
    } 
  }

   

  
}

