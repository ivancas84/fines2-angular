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
  selector: 'app-crear-horarios-comision',
  templateUrl: './crear-horarios-comision.component.html',
})
export class CrearHorariosComisionComponent extends FieldsetComponent {

  entityName: string = 'comision';

  optDia$: Observable<Array<any>>;
 
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
    this.optDia$ = this.dd.all('dia', new Display);
  }
  
  formGroup() {    
    let fg: FormGroup = this.fb.group({
      id: [null, {
        validators: [Validators.required],
      }],
      dias: [null, {
        validators: [Validators.required],
      }],
      hora_inicio: [null, {
        validators: [Validators.required],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get dias() { return this.fieldset.get('dias')}
  get horaInicio() { return this.fieldset.get('hora_inicio')}

}
