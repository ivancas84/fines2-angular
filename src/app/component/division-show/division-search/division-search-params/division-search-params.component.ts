import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { isEmptyObject } from '@function/is-empty-object.function';
import { ValidatorsService } from '@service/validators/validators.service';
import { SearchParamsComponent } from '@component/search-params/search-params.component';
import { forkJoin, Observable } from 'rxjs';
import { Display } from '@class/display';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-division-search-params',
  templateUrl: './division-search-params.component.html',
})
export class DivisionSearchParamsComponent extends SearchParamsComponent {

  optPlan$: Observable<any>;
  optModalidad$: Observable<any>;
  constructor (
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService
  ) { super(fb); }


  initOptions(): void {
    this.optPlan$ = this.dd.all('plan', new Display);
    this.optModalidad$ = this.dd.all('modalidad', new Display);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      turno: null,
      division: null,
      fecha_anio: null,
      fecha_semestre: null,
      sede: null,
      sed_numero: null,
      plan: null,
      modalidad: null,
    });
    return fg;
  }

  get sede() { return this.form.get('sede')}

}
