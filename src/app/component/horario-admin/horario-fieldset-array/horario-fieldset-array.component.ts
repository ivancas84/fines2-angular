import { Component } from '@angular/core';
import { FieldsetArrayComponent } from '@component/fieldset-array/fieldset-array.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { Display } from '@class/display';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FieldsetArrayIdComponent } from '@component/fieldset-array-id/fieldset-array-id.component';

@Component({
  selector: 'app-horario-fieldset-array',
  templateUrl: './horario-fieldset-array.component.html',
})
export class HorarioFieldsetArrayComponent extends FieldsetArrayIdComponent {

  readonly entityName: string = 'horario';

  readonly fkName: string = 'cur_comision';

  idComision: string;
  /** 
   * Se utiliza el idComision desde el template
   */

  constructor(
    protected router: Router, 
    protected storage: SessionStorageService,
    protected dd: DataDefinitionService, 
    protected dialog: MatDialog,

    protected fb: FormBuilder, 
    protected validators: ValidatorsService,
  ) {
    super(router, storage, dd, dialog)
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

  data(): Observable<any> {
    return this.data$.pipe(
      mergeMap(
        response => {
          this.idComision = response;
          var display = new Display();
          display.addParam("cur_comision",response);
          display.setOrder({dia_numero:"asc",hora_inicio:"asc"});
          return this.dd.all(this.entityName, display);
        }
      )
    )
  }

}
