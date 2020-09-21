import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Display } from '@class/display';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { arrayColumn } from '@function/array-column';
import { Observable, of } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-comision-fieldset',
  templateUrl: './comision-fieldset.component.html',
})
export class ComisionFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'comision';

  readonly defaultValues: {[key:string]: any} = {autorizada: true, apertura: false, publicada: true, modalidad: "1", turno:"Noche"}

  divisiones: Array<any>;

  loadDivisiones$: Observable<any>;

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService 
  ) {
    super(router, storage);
  }

  initForm(): void {
    this.fieldset = this.formGroup();
    this.form.addControl(this.entityName, this.fieldset);
  
    var s = this.sede.valueChanges.pipe(
      /**
       * se realiza una suscripcion directamente ya que el valueChanges no me toma los valores iniciales del formulario
       * ver notas adicionales en el initData de la superclase
       */
      mergeMap(
        sede => {
          if(!sede) return of([]);
          var display = new Display
          display.addParam("sede",sede)
          display.addField("division");
          display.setOrder({division:"ASC"});
          return this.dd.advanced("comision", display);
        }
      ),
      map(
        comisiones => {
          return arrayColumn(comisiones, "division");
        }
      ),
    ).subscribe(
      response => this.divisiones = response 
    );
    this.subscriptions.add(s)
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
        validators: [Validators.required],
      }],
      modalidad: [null, {
        validators: [Validators.required],
      }],
      planificacion: [null, {
      }],
      comision_siguiente: [null, {
      }],
      calendario: [null, {
        validators: [Validators.required],
      }],
    }, {
      asyncValidators: [this.validators.furtherError('comision')],
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
