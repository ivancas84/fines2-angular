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
  selector: 'app-sede-fieldset',
  templateUrl: './sede-fieldset.component.html',
})
export class SedeFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'sede';

  optCentroEducativo$: Observable<Array<any>>;
  optTipoSede$: Observable<Array<any>>;

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService, 
  ) {
    super(router, storage);
  }

  initOptions(): void {
    this.optTipoSede$ = this.dd.all('tipo_sede', new Display);
    this.optCentroEducativo$ = this.dd.all('centro_educativo', new Display);
  }


  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:'',
      numero: ['', {
        validators: Validators.required,
      }],
      nombre: ['', {
        validators: Validators.required,
      }],
      observaciones: ['', {
      }],
      tipo_sede: ['', {
        //validators: Validators.required,
      }],
      centro_educativo: ['', {
        validators: [Validators.required],
      }],
    }, {
      asyncValidators: [this.validators.uniqueMultiple('sede', ['numero', 'centro_educativo'])],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get numero() { return this.fieldset.get('numero')}
  get nombre() { return this.fieldset.get('nombre')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get baja() { return this.fieldset.get('baja')}
  get domicilio() { return this.fieldset.get('domicilio')}
  get tipoSede() { return this.fieldset.get('tipo_sede')}
  get centroEducativo() { return this.fieldset.get('centro_educativo')}

}
