import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { FieldsetOptionalComponent } from '@component/fieldset-optional/fieldset-optional.component';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-domicilio-sede-fieldset',
  templateUrl: './domicilio-sede-fieldset.component.html',
})
export class DomicilioSedeFieldsetComponent extends FieldsetOptionalComponent {

  entityName: string = 'domicilio';
    
  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService, 
  ) {
    super(router, storage);
  }

  initData(): void {
    /**
     * No suscribirse desde el template!
     * Puede disparar errores ExpressionChanged... no deseados (por ejemplo en la validacion inicial)
     * Al suscribirse desde el template se cambia el Lifehook cycle 
     */  
      var s = this.data$.subscribe(
        response => {
          if(this.formValues) {
            this.initValuesStorage();
          } else {
            if(response && response.hasOwnProperty("domicilio") && response["domicilio"]) {
              this.dd.get("domicilio", response["domicilio"]).pipe(first()).subscribe(
                domicilio => {
                  this.initValues(response);
                  this.fieldset.enable()
                }
              )
            } else {
              this.fieldset.disable();
            }
          }
        }
      );
      this.subscriptions.add(s);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:'',
      calle: ['', {
        validators: Validators.required,
      }],
      entre: ['', {
      }],
      numero: ['', {
        validators: Validators.required,
      }],
      piso: ['', {
      }],
      departamento: ['', {
      }],
      barrio: ['', {
      }],
      localidad: ['', {
        validators: Validators.required,
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get calle() { return this.fieldset.get('calle')}
  get entre() { return this.fieldset.get('entre')}
  get numero() { return this.fieldset.get('numero')}
  get piso() { return this.fieldset.get('piso')}
  get departamento() { return this.fieldset.get('departamento')}
  get barrio() { return this.fieldset.get('barrio')}
  get localidad() { return this.fieldset.get('localidad')}
}
