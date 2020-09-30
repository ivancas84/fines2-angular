import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';

@Component({
  selector: 'app-toma-posesion-fieldset',
  templateUrl: './toma-posesion-fieldset.component.html',
})
export class TomaPosesionFieldsetComponent extends FieldsetComponent {

readonly entityName: string = 'toma_posesion';

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
      id: [null, {
        validators: [Validators.required],
      }],
      email_abc: [null, {
        validators: [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?abc\.gob\.ar$")],
      
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get emailAbc() { return this.fieldset.get('email_abc')}

}
