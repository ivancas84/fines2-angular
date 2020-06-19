import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-asignatura-fieldset',
  templateUrl: './asignatura-fieldset.component.html',
})
export class AsignaturaFieldsetComponent extends FieldsetComponent {

  entityName: string = 'asignatura';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService 
    ) {
    super(router, storage);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      nombre: [null, {
        validators: Validators.required,
        asyncValidators: this.validators.unique('nombre', 'asignatura'),
      }],
      formacion: [null, {
      }],
      clasificacion: [null, {
      }],
      codigo: [null, {
      }],
      perfil: [null, {
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get nombre() { return this.fieldset.get('nombre')}
  get formacion() { return this.fieldset.get('formacion')}
  get clasificacion() { return this.fieldset.get('clasificacion')}
  get codigo() { return this.fieldset.get('codigo')}
  get perfil() { return this.fieldset.get('perfil')}

}
