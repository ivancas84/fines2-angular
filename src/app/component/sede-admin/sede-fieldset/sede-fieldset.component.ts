import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';

@Component({
  selector: 'app-sede-fieldset',
  templateUrl: './sede-fieldset.component.html',
})
export class SedeFieldsetComponent extends FieldsetComponent {

readonly entityName: string = 'sede';

  readonly defaultValues: {[key:string]: any} = {}

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
      numero: [null, {
        validators: [Validators.required],
      }],
      nombre: [null, {
        validators: [Validators.required],
      }],
      observaciones: [null, {
      }],
      domicilio: [null, {
      }],
      tipo_sede: [null, {
      }],
      centro_educativo: [null, {
      }],
    }, {
      asyncValidators: [this.validators.uniqueMultiple('sede', ['numero', 'centro_educativo'])],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get numero() { return this.fieldset.get('numero')}
  get nombre() { return this.fieldset.get('nombre')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get baja() { return this.fieldset.get('baja')}
  get domicilio() { return this.fieldset.get('domicilio')}
  get tipoSede() { return this.fieldset.get('tipo_sede')}
  get centroEducativo() { return this.fieldset.get('centro_educativo')}

}
