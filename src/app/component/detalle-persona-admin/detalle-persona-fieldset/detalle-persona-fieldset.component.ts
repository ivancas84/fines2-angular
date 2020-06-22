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
  selector: 'app-detalle-persona-fieldset',
  templateUrl: './detalle-persona-fieldset.component.html',
})
export class DetallePersonaFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'detalle_persona';

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
      descripcion: [null, {
        validators: [Validators.required],
      }],
      file: [null, {
      }],
      persona: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get descripcion() { return this.fieldset.get('descripcion')}
  get creado() { return this.fieldset.get('creado')}
  get file() { return this.fieldset.get('file')}
  get persona() { return this.fieldset.get('persona')}

}
