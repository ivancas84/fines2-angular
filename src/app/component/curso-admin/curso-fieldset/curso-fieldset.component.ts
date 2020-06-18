import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';

@Component({
  selector: 'app-curso-fieldset',
  templateUrl: './curso-fieldset.component.html',
})
export class CursoFieldsetComponent extends FieldsetComponent {

  entityName: string = 'curso';
  fieldsetName: string = 'curso';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }



  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      observaciones: [null, {
      }],
      comision: [null, {
        validators: [Validators.required, this.validators.typeaheadSelection('comision')],
      }],
      carga_horaria: [null, {
        validators: [Validators.required, this.validators.typeaheadSelection('carga_horaria')],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get alta() { return this.fieldset.get('alta')}
  get comision() { return this.fieldset.get('comision')}
  get cargaHoraria() { return this.fieldset.get('carga_horaria')}

}
