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
  selector: 'app-email-fieldset',
  templateUrl: './email-fieldset.component.html',
})
export class EmailFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'email';

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
      email: [null, {
        validators: [Validators.required],
      }],
      verificado: false,
      persona: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get email() { return this.fieldset.get('email')}
  get verificado() { return this.fieldset.get('verificado')}
  get insertado() { return this.fieldset.get('insertado')}
  get eliminado() { return this.fieldset.get('eliminado')}
  get persona() { return this.fieldset.get('persona')}

}
