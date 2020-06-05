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
  selector: 'app-consolidado-admin-search-params',
  templateUrl: './consolidado-admin-search-params.component.html',
})
export class ConsolidadoAdminSearchParamsComponent extends SearchParamsComponent {
  readonly entityName = 'comision';
  optPlan$: Observable<any>;
  optModalidad$: Observable<any>;
  optCentroEducativo$: Observable<any>;

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) 
  {
    super(fb, dd, validators); 
  
  }

  initOptions(): void {
    this.optPlan$ = this.dd.all('plan', new Display);
    this.optModalidad$ = this.dd.all('modalidad', new Display);
    this.optCentroEducativo$ = this.dd.all('centro_educativo', new Display);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      sed_numero_trim: null,
      turno: null,
      division: null,
      pla_anio: null,
      pla_semestre: null,
      autorizada: null,
      apertura: null,
      publicada: null,
      cal_anio: null,
      cal_semestre: null,
      sede: null,
      pla_plan: null,
      modalidad: null,
      sed_centro_educativo: null,
    });
    return fg;
  }

}
