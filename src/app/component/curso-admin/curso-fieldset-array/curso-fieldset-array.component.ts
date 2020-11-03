import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { Display } from '@class/display';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FieldsetArrayIdComponent } from '@component/fieldset-array-id/fieldset-array-id.component';

@Component({
  selector: 'app-curso-fieldset-array',
  templateUrl: './curso-fieldset-array.component.html',
})
export class CursoFieldsetArrayComponent extends FieldsetArrayIdComponent {

  readonly entityName: string = 'curso';
  readonly idName: string = 'comision';

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

  getData(): Observable<any>{
    var display = new Display();
    display.addParam(this.idName,this.idValue);
    display.setOrder({"asi-nombre":"asc"});
    return this.dd.all(this.entityName, display);
  }
  
}
