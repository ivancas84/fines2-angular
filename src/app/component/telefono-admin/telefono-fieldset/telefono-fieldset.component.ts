import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-telefono-fieldset',
  templateUrl: './telefono-fieldset.component.html',
})
export class TelefonoFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'telefono';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService, 
  ) {
    super(router, storage);
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
        validators: [Validators.required],
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
