import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputUploadOptions, FieldTextareaOptions, FieldInputSelectOptions } from '@class/field-type-options';
import { AdminRelDynamicComponent } from '@component/admin-rel/admin-rel-dynamic.component';
import { AdminRelStructure } from '@class/admin-rel-structure';
import { FieldWidthOptions } from '@class/field-width-options';
import { ValidatorOpt } from '@class/validator-opt';
import { FieldsetDynamicOptions } from '@class/fieldset-dynamic-options';
import { LocalValidators } from '@service/local-validators.service';
import { ValidatorsService } from '@service/validators/validators.service';

@Component({
  selector: 'app-inscripcion-alumno',
  templateUrl: './inscripcion-alumno.component.html',
})
export class InscripcionAlumnoAdminRelComponent extends AdminRelDynamicComponent {

  readonly entityName: string = "alumno"
  queryApi:string = "unique_rel_um"
  persistApi: string = "persist_inscripcion_alumno";


  structure:AdminRelStructure[] = [

    new AdminRelStructure({
      id:"per",
      title: "Inscripción Alumno",
      options:new FieldsetDynamicOptions({
        inputSearchGo:false,
        validators:[
          new ValidatorOpt({id:"cuilDni", message:"El CUIL y DNI no coinciden", fn:LocalValidators.cuilDni()})
        ],
        intro: `
          <p>Complete el siguiente formulario prestando atención a los datos ingresados, serán posteriormente utilizados en los analíticos.</p>
          <p>Sus <strong>nombres y apellidos</strong> deben estar completos, como se encuentra en su DNI.</p>
          <p>Para obtener su <strong>número de CUIL</strong> ingrese a <a href="https://www.anses.gob.ar/consulta/constancia-de-cuil" target="_blank">Constancia de CUIL</a><p>
          <p>El <strong>lugar de nacimiento</strong> debe coincidir con el de su partida de nacimiento</p>
        `
      }),
      fieldsViewOptions: [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"nombres",
          label:"Nombres COMPLETOS (debe coincidir con su DNI)",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({
            validators: [Validators.required, Validators.pattern("^([^0-9]*)$")],
          }),
          width: new FieldWidthOptions({ gtSm: "50%" })
        }),
        new FieldViewOptions({
          field:"apellidos",
          label:"Apellidos COMPLETOS (debe coincidir con su DNI)",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({
            validators: [Validators.required, Validators.pattern("^([^0-9]*)$")],
          }),
          width: new FieldWidthOptions({ gtSm: "50%" })
        }),
        new FieldViewOptions({
          field:"numero_documento",
          label:"Numero Documento (sin puntos)",
          type: new FieldInputTextOptions(
            {uniqueRoute: "alumno-admin-rel", uniqueParam:"persona"},
          ),
          control: new FieldControlOptions({
            validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(8)],
          }),
          width: new FieldWidthOptions({ gtSm: "33%" })


        }),
        new FieldViewOptions({
          field:"cuil",
          label:"Cuil (sin guiones)",
          type: new FieldInputTextOptions(
            {uniqueRoute: "alumno-admin-rel", uniqueParam:"persona"},
          ),
          control: new FieldControlOptions({
            validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)],
          }),
          width: new FieldWidthOptions({ gtSm: "34%" })
        }),
        new FieldViewOptions({
          field:"genero",
          label:"Genero",
          type: new FieldInputSelectParamOptions({options:['Femenino','Masculino','Otro']}),
          control: new FieldControlOptions({
            validators: [Validators.required],
          }),
          width: new FieldWidthOptions({ gtSm: "33%" })
        }),
        new FieldViewOptions({
          field:"fecha_nacimiento",
          label:"Fecha Nacimiento",
          type: new FieldInputDateOptions(),
          control: new FieldControlOptions({
            validators: [Validators.required],
          }),
        }),
        new FieldViewOptions({
          field:"lugar_nacimiento",
          label:"Lugar de Nacimiento",
          type: new FieldInputTextOptions(),
          width: new FieldWidthOptions({ gtSm: "75%" }),
          control: new FieldControlOptions({
            validators: [Validators.required],
          }),
        }),

        new FieldViewOptions({
          field:"telefono",
          label:"Telefono",
          type: new FieldInputTextOptions(),
          width: new FieldWidthOptions({ gtSm: "50%" }),
          control: new FieldControlOptions({
            validators: [Validators.required],
          }),
        }),
        new FieldViewOptions({
          field:"email",
          label:"Email",
          type: new FieldInputTextOptions(),
          width: new FieldWidthOptions({ gtSm: "50%" }),
          control: new FieldControlOptions({
            validators: [Validators.required, ValidatorsService.email()],
          }),
        }),

      ]
    }),



    new AdminRelStructure({
      id:"per_dom",
      title: "Domicilio",
      options:new FieldsetDynamicOptions({
        inputSearchGo:false,
        intro: `
          <p>Ingrese su lugar de residencia para que podamos buscar una sede cerca de su domicilio.</p>
        `
      }),
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
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"localidad",
          label:"Localidad",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
      ]
    }),

    

    new AdminRelStructure({
      id:"per-detalle_persona/persona",
      title: "Legajo",

      fieldsViewOptions: 
    
      [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        
        new FieldViewOptions({
          field:"archivo",
          label:"Archivo",
          type: new FieldInputUploadOptions(),
        }),
      ]  
    }),

  ];

   

  reload(response){ //@override
    this.router.navigateByUrl('/inscripcion-realizada');
  }

  
}

