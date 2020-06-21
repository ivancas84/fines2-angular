import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-fieldset',
  templateUrl: './curso-fieldset.component.html',
})
export class CursoFieldsetComponent extends FieldsetComponent {

  entityName: string = 'curso';
  fieldsetName: string = 'curso';

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
      observaciones: [null, {
      }],
      comision: [null, {
        validators: [Validators.required],
      }],
      carga_horaria: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get alta() { return this.fieldset.get('alta')}
  get comision() { return this.fieldset.get('comision')}
  get cargaHoraria() { return this.fieldset.get('carga_horaria')}

}
