import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';

@Component({
  selector: 'app-plan-fieldset',
  templateUrl: './plan-fieldset.component.html',
})
export class PlanFieldsetComponent extends FieldsetComponent {

  entityName: string = 'plan';
  fieldsetName: string = 'plan';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      orientacion: [null, {
        validators: Validators.required,
        asyncValidators: this.validators.unique('orientacion', 'plan'),
      }],
      resolucion: [null, {
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get orientacion() { return this.fieldset.get('orientacion')}
  get resolucion() { return this.fieldset.get('resolucion')}

}
