import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Display } from '@class/display';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { arrayColumn } from '@function/array-column';

@Component({
  selector: 'app-comision-fieldset',
  templateUrl: './comision-fieldset.component.html',
})
export class ComisionFieldsetComponent extends FieldsetComponent {

  readonly entityName: string = 'comision';
  
  readonly defaultValues: {[key:string]: any} = {autorizada: false, apertura: false, publicada: false}

  divisiones: Array<any>;

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
  
    this.sede.valueChanges.subscribe(
      value => {
        if(!value) {
          this.divisiones = [];
          return;
        }
        
        var display = new Display
        display.addParam("sede",value)
        display.addField("division");
        this.dd.advanced("comision", display).subscribe(
          comisiones => {
            this.divisiones = arrayColumn(comisiones, "division");
          }
        );
      }
    );
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
