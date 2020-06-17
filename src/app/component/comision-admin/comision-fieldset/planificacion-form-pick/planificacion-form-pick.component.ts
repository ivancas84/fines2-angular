import { Component } from '@angular/core';
import { FormPickComponent } from '@component/form-pick/form-pick.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable } from 'rxjs';
import { Display } from '@class/display';

@Component({
  selector: 'app-planificacion-form-pick',
  templateUrl: './planificacion-form-pick.component.html',
})
export class PlanificacionFormPickComponent extends FormPickComponent {

  readonly entityName: string = 'planificacion';

  optPlan$: Observable<Array<any>>;

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService
  ) {
    super(fb, dd);
  }

  initOptions(): void {
    this.optPlan$ = this.dd.all('plan', new Display);
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
