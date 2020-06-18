import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-comision-fieldset',
  templateUrl: './comision-fieldset.component.html',
})
export class ComisionFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'comision';

  optModalidad$: Observable<Array<any>>;
  designaciones$: Observable<any>;

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  initForm(): void {
    console.log("estoy");
    this.fieldset = this.formGroup();
    this.form.addControl(this.entityName, this.fieldset);
    this.designaciones$ = this.sede.valueChanges.pipe(map(
      value => {
        console.log(value);
        return value;
      }
    ))
    
  }

  initOptions(): void {
    this.optModalidad$ = this.dd.all('modalidad', new Display);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      turno: [null, {
      }],
      division: [null, {
        validators: [Validators.required],
      }],
      comentario: [null, {
      }],
      autorizada: false,
      apertura: false,
      publicada: false,
      observaciones: [null, {
      }],
      sede: [null, {
        validators: [this.validators.typeaheadSelection('sede'), Validators.required],
      }],
      modalidad: [null, {
        validators: [Validators.required],
      }],
      planificacion: [null, {
        validators: [this.validators.typeaheadSelection('planificacion')],
      }],
      comision_siguiente: [null, {
        validators: [this.validators.typeaheadSelection('comision')],
      }],
      calendario: [null, {
        validators: [this.validators.typeaheadSelection('calendario')],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get turno() { return this.fieldset.get('turno')}
  get division() { return this.fieldset.get('division')}
  get comentario() { return this.fieldset.get('comentario')}
  get autorizada() { return this.fieldset.get('autorizada')}
  get apertura() { return this.fieldset.get('apertura')}
  get publicada() { return this.fieldset.get('publicada')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get sede() { return this.fieldset.get('sede')}
  get modalidad() { return this.fieldset.get('modalidad')}
  get planificacion() { return this.fieldset.get('planificacion')}
  get comisionSiguiente() { return this.fieldset.get('comision_siguiente')}
  get calendario() { return this.fieldset.get('calendario')}

}
