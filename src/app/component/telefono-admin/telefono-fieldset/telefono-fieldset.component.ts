import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-telefono-fieldset',
  templateUrl: './telefono-fieldset.component.html',
})
export class TelefonoFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'telefono';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      tipo: [null, {
      }],
      prefijo: [null, {
      }],
      numero: [null, {
        validators: [Validators.required],
      }],
      persona: [null, {
        validators: [this.validators.typeaheadSelection('persona'), Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get tipo() { return this.fieldset.get('tipo')}
  get prefijo() { return this.fieldset.get('prefijo')}
  get numero() { return this.fieldset.get('numero')}
  get insertado() { return this.fieldset.get('insertado')}
  get eliminado() { return this.fieldset.get('eliminado')}
  get persona() { return this.fieldset.get('persona')}

}
