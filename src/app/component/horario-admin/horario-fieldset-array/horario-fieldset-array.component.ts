import { Component } from '@angular/core';
import { FieldsetArrayComponent } from '@component/fieldset-array/fieldset-array.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { Display } from '@class/display';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-horario-fieldset-array',
  templateUrl: './horario-fieldset-array.component.html',
})
export class HorarioFieldsetArrayComponent extends FieldsetArrayComponent {

  readonly entityName: string = 'horario';

  idComision: string;
  
  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService 
  ) {
    super(router, storage);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      hora_inicio: [null, {
        validators: [Validators.required],
      }],
      hora_fin: [null, {
        validators: [Validators.required],
      }],
      curso: [null, {
        validators: [Validators.required],
      }],
      dia: [null, {
        validators: [Validators.required],
      }],
      _delete: [null, {}],
    });
    return fg;
  }

  id(index: number) { return this.fieldset.at(index).get('id'); }
  horaInicio(index: number) { return this.fieldset.at(index).get('hora_inicio'); }
  horaFin(index: number) { return this.fieldset.at(index).get('hora_fin'); }
  curso(index: number) { return this.fieldset.at(index).get('curso'); }
  dia(index: number) { return this.fieldset.at(index).get('dia'); }
  _delete(index: number) { return this.fieldset.at(index).get('_delete'); }


  initData(): void {
    var s = this.data$.pipe(
      mergeMap(
        response => {
          this.idComision = response;
          var display = new Display();
          display.addParam("cur_comision",this.idComision);
          display.setOrder({dia_numero:"asc",hora_inicio:"asc"});
          return this.dd.all(this.entityName, display);
        }
      )
    ).subscribe(
      response => {
        this.initValues(response);
      },
      error => { 
        console.log(error);
      }
    )
    this.subscriptions.add(s);
  }
    

}
