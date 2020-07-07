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
  selector: 'app-calendario-fieldset',
  templateUrl: './calendario-fieldset.component.html',
})
export class CalendarioFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'calendario';

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
      inicio: [null, {
      }],
      fin: [null, {
      }],
      anio: [null, {
        validators: [Validators.required, this.validators.minYear('2000'), this.validators.year()],
      }],
      semestre: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get inicio() { return this.fieldset.get('inicio')}
  get fin() { return this.fieldset.get('fin')}
  get anio() { return this.fieldset.get('anio')}
  get semestre() { return this.fieldset.get('semestre')}
  get insertado() { return this.fieldset.get('insertado')}

}
