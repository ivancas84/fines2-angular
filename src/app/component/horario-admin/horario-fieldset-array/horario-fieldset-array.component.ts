import { Component } from '@angular/core';
import { FieldsetArrayComponent } from '@component/fieldset-array/fieldset-array.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-horario-fieldset-array',
  templateUrl: './horario-fieldset-array.component.html',
})
export class HorarioFieldsetArrayComponent extends FieldsetArrayComponent {

  readonly entityName: string = 'horario';

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
      hora_inicio: [null, {
        validators: [Validators.required],
      }],
      hora_fin: [null, {
        validators: [Validators.required],
      }],
      curso: [null, {
        validators: [Validators.required],
      }],
      dia: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  id(index: number) { return this.fieldset.at(index).get('id')}
  horaInicio(index: number) { return this.fieldset.at(index).get('hora_inicio')}
  horaFin(index: number) { return this.fieldset.at(index).get('hora_fin')}
  curso(index: number) { return this.fieldset.at(index).get('curso')}
  dia(index: number) { return this.fieldset.at(index).get('dia')}

}
