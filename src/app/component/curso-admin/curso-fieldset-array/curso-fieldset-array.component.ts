import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { mergeMap } from 'rxjs/operators';
import { Display } from '@class/display';
import { FieldsetArrayFkComponent } from '@component/fieldset-array-fk/fieldset-array-fk.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curso-fieldset-array',
  templateUrl: './curso-fieldset-array.component.html',
})
export class CursoFieldsetArrayComponent extends FieldsetArrayFkComponent {

  readonly entityName: string = 'curso';
  readonly fkName: string = 'comision';

  readonly defaultValues: {[key:string]: any} = {alta: new Date()}

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService,
    protected dialog: MatDialog,
  ) {
    super(router, storage, dd, dialog);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      horas_catedra: [null, {
        validators: [Validators.required],
      }],
      ige: [null, {
      }],
      numero_documento_designado: [null, {
      }],
      comision: [null, {
        validators: [Validators.required],
      }],
      asignatura: [null, {
        validators: [Validators.required],
      }],
      _delete: [null, {}]
    });
    return fg;
  }

  id(index: number) { return this.fieldset.at(index).get('id')}
  horasCatedra(index: number) { return this.fieldset.at(index).get('horas_catedra')}
  ige(index: number) { return this.fieldset.at(index).get('ige')}
  numeroDocumentoDesignado(index: number) { return this.fieldset.at(index).get('numero_documento_designado')}
  alta(index: number) { return this.fieldset.at(index).get('alta')}
  comision(index: number) { return this.fieldset.at(index).get('comision')}
  asignatura(index: number) { return this.fieldset.at(index).get('asignatura')}
  _delete(index: number) { return this.fieldset.at(index).get('_delete')}

  data(): Observable<any>{
    return this.data$.pipe(
      mergeMap(
        response => {
          var display = new Display();
          display.addParam(this.fkName,response);
          display.setOrder({asi_nombre:"asc"});
          return this.dd.all(this.entityName, display);
        }
      )
    )
  }
  
}
