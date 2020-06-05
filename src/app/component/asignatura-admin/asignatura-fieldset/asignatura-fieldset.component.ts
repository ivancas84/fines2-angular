import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-asignatura-fieldset',
  templateUrl: './asignatura-fieldset.component.html',
})
export class AsignaturaFieldsetComponent extends FieldsetComponent {

  entityName: string = 'asignatura';
  fieldsetName: string = 'asignatura';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
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
