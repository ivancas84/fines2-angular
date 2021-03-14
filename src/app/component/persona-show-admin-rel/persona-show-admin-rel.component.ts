import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FieldHiddenOptions, FieldInputTextOptions, FieldControlOptions, FieldInputDateOptions } from '@class/field-type-options';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldWidthOptions } from '@class/field-width-options';
import { ShowAdminRelDynamicComponent } from '@component/show-admin-dynamic/show-admin-rel-dynamic.component';
import { DataDefinitionRelArrayService } from '@service/data-definition-rel-array/data-definition-rel-array.service';
import { DataDefinitionToolService } from '@service/data-definition/data-definition-tool.service';
import { ValidatorsService } from '@service/validators/validators.service';

@Component({
  selector: 'app-persona-show-admin-rel',
  templateUrl: '../../core/component/show-admin-dynamic/show-admin-dynamic.component.html',
})
export class PersonaShowAdminRelComponent extends ShowAdminRelDynamicComponent {

  readonly entityName: string = "persona";
  reloadApi: string = "unique_rel_array"; //reloadApi de TableAdmin
  /**
   * Puede utilizarse unique_rel_array
   * si se desea administrar una entidad y sus relaciones
   */

  title: string = "Persona"

  
 

  
  fieldsViewOptions: FieldViewOptions[] = [
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
    /*
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
      field:"domicilio",
      label:"Domicilio",
      type: new FieldInputAutocompleteOptions({entityName:"domicilio"}),
    }),*/
  ];   
 
  fieldsViewOptionsSp: FieldViewOptions[] = [
    new FieldViewOptions({
      field:"search",
      label:"Buscar",
      type: new FieldInputTextOptions(),
      width: new FieldWidthOptions({sm:'100%',gtSm:'100%'}),
    }),
  ];  
}

