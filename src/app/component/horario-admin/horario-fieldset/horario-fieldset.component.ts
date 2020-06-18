import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable } from 'rxjs';
import { Display } from '@class/display';

@Component({
  selector: 'app-horario-fieldset',
  templateUrl: './horario-fieldset.component.html',
})
export class HorarioFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'horario';

  optDia$: Observable<any>;
  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  initOptions(): void {
    this.optDia$ = this.dd.all('dia', new Display);
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
        validators: [this.validators.typeaheadSelection('curso'), Validators.required],
      }],
      dia: [null, {
        validators: [this.validators.typeaheadSelection('dia'), Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get horaInicio() { return this.fieldset.get('hora_inicio')}
  get horaFin() { return this.fieldset.get('hora_fin')}
  get curso() { return this.fieldset.get('curso')}
  get dia() { return this.fieldset.get('dia')}

}
