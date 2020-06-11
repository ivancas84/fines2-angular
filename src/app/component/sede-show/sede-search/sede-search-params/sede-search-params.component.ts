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
  selector: 'app-sede-search-params',
  templateUrl: './sede-search-params.component.html',
})
export class SedeSearchParamsComponent extends SearchParamsComponent {
  readonly entityName = 'sede';

  optTipoSede$: Observable<Array<any>>;
  optCentroEducativo$: Observable<Array<any>>;

  constructor (
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService
  ) { super(fb); }

  initOptions(): void {
    this.optTipoSede$ = this.dd.all('tipo_sede', new Display);
    this.optCentroEducativo$ = this.dd.all('centro_educativo', new Display);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      numero: null,
      nombre: null,
      domicilio: null,
      tipo_sede: null,
      centro_educativo: null,
    });
    return fg;
  }

}
