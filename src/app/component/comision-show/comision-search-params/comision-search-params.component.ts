import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Display } from '@class/display';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { SearchParamsComponent } from '@component/search-params/search-params.component';

@Component({
  selector: 'app-comision-search-params',
  templateUrl: './comision-search-params.component.html',
})
export class ComisionSearchParamsComponent extends SearchParamsComponent {

  constructor (
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService
  ) { super(fb); }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      turno: null,
      division: null,
      autorizada: null,
      apertura: null,
      publicada: null,
      alta: null,
      sede: null,
      modalidad: null,
      planificacion: null,
      comision_siguiente: null,
      calendario: null,
      "cal-anio": null, 
      "cal-semestre": null,
      "sed-centro_educativo": null,
      "sed-numero_trim": null,
      "pla-anio": null,
      "pla-semestre": null,
      "pla-plan": null,
    });
    return fg;
  }

  get turno() { return this.fieldset.get('turno')}
  get division() { return this.fieldset.get('division')}
  get comentario() { return this.fieldset.get('comentario')}
  get autorizada() { return this.fieldset.get('autorizada')}
  get apertura() { return this.fieldset.get('apertura')}
  get publicada() { return this.fieldset.get('publicada')}
  get observaciones() { return this.fieldset.get('observaciones')}
  get alta() { return this.fieldset.get('alta')}
  get sede() { return this.fieldset.get('sede')}
  get modalidad() { return this.fieldset.get('modalidad')}
  get planificacion() { return this.fieldset.get('planificacion')}
  get comisionSiguiente() { return this.fieldset.get('comision_siguiente')}
  get calendario() { return this.fieldset.get('calendario')}
  get calAnio() { return this.fieldset.get('cal-anio')}
  get calSemestre() { return this.fieldset.get('cal-semestre')}
  get sedCentroEducativo() { return this.fieldset.get('sed-centro_educativo')}
  get sedNumeroTrim() { return this.fieldset.get('sed-numero_trim')}
  get plaAnio() { return this.fieldset.get('pla-anio')}
  get plaSemestre() { return this.fieldset.get('pla-semestre')}
  get plaPlan() { return this.fieldset.get('pla-plan')}

}
