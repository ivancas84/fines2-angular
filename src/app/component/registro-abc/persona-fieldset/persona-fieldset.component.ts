import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { LocalValidators } from '@service/local-validators.service';

@Component({
  selector: 'app-rabc-persona-fieldset',
  templateUrl: './persona-fieldset.component.html',
})
export class RabcPersonaFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'persona';

  readonly defaultValues: {[key:string]: any} = {alta: new Date()}

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService ,
  ) {
    super(router, storage);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      nombres: [null, {
        validators: [Validators.required, Validators.maxLength(255)],
      }],
      apellidos: [null, {
        validators: [Validators.required, Validators.maxLength(255)],
      }],
      fecha_nacimiento: [null, {
        validators: [Validators.required],
      }],
      numero_documento: [null, {
        validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(8)],
      }],
      cuil: [null, {
        validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)],
      }],
      genero: [null, {
        validators: [Validators.required],
      }],
      telefono: [null, {
        validators: [Validators.required, Validators.maxLength(255),],
      }],
      email: [null, {
        validators: [Validators.required, Validators.maxLength(255)],
      }],
      email_abc: [null, {
        validators: [Validators.required, Validators.maxLength(255)],
      }],
      curso: [null, {
        validators: [Validators.required, Validators.maxLength(255)],
      }],
    },{
      updateOn: "submit",
      validators: [LocalValidators.cuilDni()],
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
  get emailAbc() { return this.fieldset.get('email_abc')}
  get curso() { return this.fieldset.get('curso')}
  get alta() { return this.fieldset.get('alta')}

}
