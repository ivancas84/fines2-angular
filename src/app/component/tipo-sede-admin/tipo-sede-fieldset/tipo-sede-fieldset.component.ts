import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-tipo-sede-fieldset',
  templateUrl: './tipo-sede-fieldset.component.html',
})
export class TipoSedeFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'tipo_sede';
  readonly fieldsetName: string = 'tipo_sede';

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
      id:'',
      descripcion: ['', {
        validators: Validators.required,
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get descripcion() { return this.fieldset.get('descripcion')}

}
