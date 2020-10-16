import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FieldsetArrayIdComponent } from '@component/fieldset-array-id/fieldset-array-id.component';

@Component({
  selector: 'app-toma-fieldset-array',
  templateUrl: './toma-fieldset-array.component.html',
})
export class TomaFieldsetArrayComponent extends FieldsetArrayIdComponent {

  readonly entityName: string = 'toma';
  readonly idName: string = 'curso';


  readonly defaultValues: {[key:string]: any} = {fecha_toma: new Date(), estado: "Aprobada", estado_contralor: "Pasar", tipo_movimiento: "AI", alta: new Date()}

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
  ) {
    super(router, storage, dd, dialog);
  }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      fecha_toma: [null, {
      }],
      estado: [null, {
      }],
      observaciones: [null, {
      }],
      comentario: [null, {
      }],
      tipo_movimiento: [null, {
        validators: [Validators.required],
      }],
      estado_contralor: [null, {
      }],
      curso: [null, {
        validators: [Validators.required],
      }],
      docente: [null, {
      }],
      reemplazo: [null, {
      }],
      planilla_docente: [null, {
      }],
      _delete: [null, {}]
    });
    return fg;
  }

  id(index: number) { return this.fieldset.at(index).get('id')}
  fechaToma(index: number) { return this.fieldset.at(index).get('fecha_toma')}
  estado(index: number) { return this.fieldset.at(index).get('estado')}
  observaciones(index: number) { return this.fieldset.at(index).get('observaciones')}
  comentario(index: number) { return this.fieldset.at(index).get('comentario')}
  tipoMovimiento(index: number) { return this.fieldset.at(index).get('tipo_movimiento')}
  estadoContralor(index: number) { return this.fieldset.at(index).get('estado_contralor')}
  alta(index: number) { return this.fieldset.at(index).get('alta')}
  curso(index: number) { return this.fieldset.at(index).get('curso')}
  docente(index: number) { return this.fieldset.at(index).get('docente')}
  reemplazo(index: number) { return this.fieldset.at(index).get('reemplazo')}
  planillaDocente(index: number) { return this.fieldset.at(index).get('planilla_docente')}
  _delete(index: number) { return this.fieldset.at(index).get('_delete')}

  enviarEmail(index){
    if(!this.id(index).value) return;
    this.dd.post("info", "email_confirmacion", {id:this.id(index).value}).subscribe(
      response => {
        if(response){
          this.snackBar.open("Email de confirmación enviado", "X"); 
        }
        
      }
    )
  }

}
