import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-comision-horarios-fieldset',
  templateUrl: './comision-horarios-fieldset.component.html',
})
export class ComisionHorariosFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'comision_horarios';

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
      id:[null, {
        validators: [Validators.required],
      }],
      dias: [null, {
        validators: [Validators.required],
      }],
      hora_inicio: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  get dias() { return this.fieldset.get('dias')}
  get horaInicio() { return this.fieldset.get('hora_inicio')}

}
