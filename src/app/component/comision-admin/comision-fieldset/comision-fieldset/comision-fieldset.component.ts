import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Observable } from 'rxjs';
import { Display } from '@class/display';
import { arrayColumn } from '@function/array-column';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { LocalValidatorsService } from '@service/local-validators.service';

@Component({
  selector: 'app-comision-fieldset',
  templateUrl: './comision-fieldset.component.html',
})
export class ComisionFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'comision';

  optModalidad$: Observable<Array<any>>;
  divisiones: Array<any>;

  constructor (
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService,
    protected localValidators: LocalValidatorsService,
  ) {
    super(router, storage);
  }

  initForm(): void {
    this.fieldset = this.formGroup();
    this.form.addControl(this.entityName, this.fieldset);
    
    /**
     * Si se desea suscribirse a los cambios de sede en el template 
     * debe agregarse un nuevo div y hacerlo previamente a "load$"
     * ya que no se cargaran los cambios iniciales 
     */
    this.sede.valueChanges.subscribe(
      value => {
        if(!value) {
          this.divisiones = [];
          /*Object.keys(this.fieldset.controls).forEach(key => {
            console.log("estoy");
            if(key != "sede") this.fieldset.controls[key].disable();
          });*/
          return;
        }
        
        /*Object.keys(this.fieldset.controls).forEach(key => {
          if(key != "sede") this.fieldset.controls[key].enable();
        });*/

        var display = new Display
        display.addParam("sede",value)
        this.dd.data("division", display).subscribe(
          divisiones => {
            this.divisiones = arrayColumn(divisiones, "division");
          }
        );
      }
    );
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
        validators: [Validators.required],
      }],
      modalidad: [null, {
        validators: [Validators.required],
      }],
      planificacion: [null, {
        validators: [],
      }],
      comision_siguiente: [null, {
        validators: [],
      }],
      calendario: [null, {
        validators: [Validators.required],
      }],
    }, {
      asyncValidators: [this.localValidators.uniqueComision()],
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
