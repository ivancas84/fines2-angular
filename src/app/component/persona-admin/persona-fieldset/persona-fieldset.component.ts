import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable } from 'rxjs';
import { Display } from '@class/display';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-persona-fieldset',
  templateUrl: './persona-fieldset.component.html',
})
export class PersonaFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'persona';

  readonly defaultValues: {[key:string]: any} = {alta: new Date()}

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
      nombres: [null, {
        validators: [Validators.required],
      }],
      apellidos: [null, {
      }],
      fecha_nacimiento: [null, {
      }],
      numero_documento: [null, {
        validators: [Validators.required],
        asyncValidators: [this.validators.unique('numero_documento', 'persona')],
      }],
      cuil: [null, {
        asyncValidators: [this.validators.unique('cuil', 'persona')],
      }],
      genero: [null, {
      }],
      apodo: [null, {
      }],
      telefono: [null, {
      }],
      email: [null, {
      }],
      domicilio: [null, {
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get nombres() { return this.fieldset.get('nombres')}
  get apellidos() { return this.fieldset.get('apellidos')}
  get fechaNacimiento() { return this.fieldset.get('fecha_nacimiento')}
  get numeroDocumento() { return this.fieldset.get('numero_documento')}
  get cuil() { return this.fieldset.get('cuil')}
  get genero() { return this.fieldset.get('genero')}
  get apodo() { return this.fieldset.get('apodo')}
  get telefono() { return this.fieldset.get('telefono')}
  get email() { return this.fieldset.get('email')}
  get alta() { return this.fieldset.get('alta')}
  get domicilio() { return this.fieldset.get('domicilio')}

}
