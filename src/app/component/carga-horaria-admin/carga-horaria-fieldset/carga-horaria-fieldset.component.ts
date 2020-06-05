import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-carga-horaria-fieldset',
  templateUrl: './carga-horaria-fieldset.component.html',
})
export class CargaHorariaFieldsetComponent extends FieldsetComponent {

  entityName: string = 'carga_horaria';
  fieldsetName: string = 'carga_horaria';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  initOptions(): void {
    let obs = [];      

    var ob = this.dd.all('plan', new Display);
    obs.push(ob);

    var ob = this.dd.all('asignatura', new Display);
    obs.push(ob);

    this.options = forkJoin(obs).pipe(
      map(
        options => {
          var o = {};
          o['plan'] = options[0];
          o['asignatura'] = options[1];
          return o;
        }
      )
    );
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      anio: [null, {
        validators: Validators.required,
      }],
      semestre: [null, {
        validators: Validators.required,
      }],
      horas_catedra: [null, {
        validators: Validators.required,
      }],
      plan: [null, {
        validators: Validators.required,
      }],
      asignatura: [null, {
        validators: Validators.required,
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get anio() { return this.fieldset.get('anio')}
  get semestre() { return this.fieldset.get('semestre')}
  get horasCatedra() { return this.fieldset.get('horas_catedra')}
  get plan() { return this.fieldset.get('plan')}
  get asignatura() { return this.fieldset.get('asignatura')}

}
