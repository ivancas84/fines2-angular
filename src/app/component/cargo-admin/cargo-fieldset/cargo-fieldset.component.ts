import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';

@Component({
  selector: 'app-cargo-fieldset',
  templateUrl: './cargo-fieldset.component.html',
})
export class CargoFieldsetComponent extends FieldsetComponent {

  entityName: string = 'cargo';
  fieldsetName: string = 'cargo';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:'',
      descripcion: ['', {
        validators: Validators.required,
        asyncValidators: this.validators.unique('descripcion', 'cargo'),
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get descripcion() { return this.fieldset.get('descripcion')}

}
