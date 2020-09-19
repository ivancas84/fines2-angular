import { Component } from '@angular/core';
import { InputPickerComponent } from '@component/input-picker/input-picker.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable } from 'rxjs';
import { Display } from '@class/display';

@Component({
  selector: 'app-planificacion-input-picker',
  templateUrl: './planificacion-input-picker.component.html',
})
export class PlanificacionInputPickerComponent extends InputPickerComponent {

  readonly entityName: string = 'planificacion';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService
  ) {
    super(fb, dd);
  }

  formGroup(): void {
    this.form = this.fb.group({
      anio: [null, {
        validators: [Validators.required],
      }],
      semestre: [null, {
        validators: [Validators.required],
      }],
      plan: [null, {
        validators: [Validators.required],
      }],
    });
  }

  get anio() { return this.form.get('anio')}
  get semestre() { return this.form.get('semestre')}
  get plan() { return this.form.get('plan')}

}
