import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-toma-fieldset',
  templateUrl: './toma-fieldset.component.html',
})
export class TomaFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'toma';

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
      fecha_toma: [null, {
      }],
      estado: [null, {
      }],
      observaciones: [null, {
      }],
      comentario: [null, {
      }],
      tipo_movimiento: [null, {
        validators: [Validators.required],
      }],
      estado_contralor: [null, {
      }],
      curso: [null, {
        validators: [this.validators.typeaheadSelection('curso'), Validators.required],
      }],
      docente: [null, {
        validators: [this.validators.typeaheadSelection('persona')],
      }],
      reemplazo: [null, {
        validators: [this.validators.typeaheadSelection('persona')],
      }],
      planilla_docente: [null, {
        validators: [this.validators.typeaheadSelection('planilla_docente')],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get fechaToma() { return this.fieldset.get('fecha_toma')}
  get estado() { return this.fieldset.get('estado')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get comentario() { return this.fieldset.get('comentario')}
  get tipoMovimiento() { return this.fieldset.get('tipo_movimiento')}
  get estadoContralor() { return this.fieldset.get('estado_contralor')}
  get alta() { return this.fieldset.get('alta')}
  get curso() { return this.fieldset.get('curso')}
  get docente() { return this.fieldset.get('docente')}
  get reemplazo() { return this.fieldset.get('reemplazo')}
  get planillaDocente() { return this.fieldset.get('planilla_docente')}

}
