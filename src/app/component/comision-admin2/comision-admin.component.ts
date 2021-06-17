import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AdminComponent } from '@component/admin/admin.component';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldInputCheckboxOptions, FieldInputSelectParamOptions, FieldInputTextOptions, FieldInputAutocompleteOptions, FieldControlOptions, FieldHiddenOptions, FieldInputDateOptions, FieldInputYearOptions, FieldInputSelectOptions } from '@class/field-type-options';
import { AdminRelDynamicComponent } from '@component/admin-rel/admin-rel-dynamic.component';
import { AdminRelStructure } from '@class/admin-rel-structure';
import { FieldWidthOptions } from '@class/field-width-options';

@Component({
  selector: 'app-comision-admin2',
  templateUrl: '../../core/component/admin-rel/admin-rel-dynamic.component.html',
})
export class ComisionAdmin2Component extends AdminRelDynamicComponent {

  readonly entityName: string = "comision"
  title: string = "Comision"

  queryApi:string = "unique_rel_um"

  structure:AdminRelStructure[] = [





    new AdminRelStructure({
      id:"comision",
      title: "comision",
      fieldsViewOptions: [
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"turno",
          label:"Turno",
          type: new FieldInputSelectParamOptions({options:['Mañana','Tarde','Vespertino']}),
        }),
        new FieldViewOptions({
          field:"division",
          label:"Division",
          type: new FieldInputTextOptions(),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"comentario",
          label:"Comentario",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"autorizada",
          label:"Autorizada",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})
        }),
        new FieldViewOptions({
          field:"apertura",
          label:"Apertura",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})
        }),
        new FieldViewOptions({
          field:"publicada",
          label:"Publicada",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:false})
        }),
        new FieldViewOptions({
          field:"observaciones",
          label:"Observaciones",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"identificacion",
          label:"Identificacion",
          type: new FieldInputTextOptions(),
        }),
        new FieldViewOptions({
          field:"estado",
          label:"Estado",
          type: new FieldInputSelectParamOptions({options:['Confirma','Rectifica','Desdobla','Reagrupa']}),
          control: new FieldControlOptions({default:"Confirma"})
        }),
        new FieldViewOptions({
          field:"configuracion",
          label:"Configuracion",
          type: new FieldInputSelectParamOptions({options:['Histórica','Nueva']}),
          control: new FieldControlOptions({default:"Histórica"})
        }),
        new FieldViewOptions({
          field:"sede",
          label:"Sede",
          type: new FieldInputAutocompleteOptions({entityName:"sede"}),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"modalidad",
          label:"Modalidad",
          type: new FieldInputSelectOptions({entityName:'modalidad'}),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
        new FieldViewOptions({
          field:"planificacion",
          label:"Planificacion",
          type: new FieldInputSelectOptions({entityName:'planificacion'}),
        }),
        new FieldViewOptions({
          field:"comision_siguiente",
          label:"Comision Siguiente",
          type: new FieldInputAutocompleteOptions({entityName:"comision"}),
        }),
        new FieldViewOptions({
          field:"calendario",
          label:"Calendario",
          type: new FieldInputAutocompleteOptions({entityName:"calendario"}),
          control: new FieldControlOptions({validators: [Validators.required],})
        }),
      ],    

    }),





    new AdminRelStructure({
      id:"alumno_comision/comision",
      title: "Alumnos de la Comisión",
      fieldsViewOptions: [ 
        new FieldViewOptions({
          field:"id",
          label:"id",
          type: new FieldHiddenOptions,
        }),
        new FieldViewOptions({
          field:"alumno",
          label:"Alumno",
          type: new FieldInputAutocompleteOptions({entityName:"alumno"}),
          control: new FieldControlOptions({validators: [Validators.required],}),
          width: new FieldWidthOptions({sm:"75%",gtSm:"75%"})
        }),  
        new FieldViewOptions({
          field:"activo",
          label:"Activo",
          type: new FieldInputCheckboxOptions(),
          control: new FieldControlOptions({default:true})
        }),  
      ]
    }),
  ]





}

