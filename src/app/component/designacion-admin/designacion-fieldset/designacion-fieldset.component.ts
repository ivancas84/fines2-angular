import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-designacion-fieldset',
  templateUrl: './designacion-fieldset.component.html',
})
export class DesignacionFieldsetComponent extends FieldsetComponent {

  entityName: string = 'designacion';
  fieldsetName: string = 'designacion';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService) {
    super(fb, dd, validators);
  }

  initOptions(): void {
    let obs = [];      

    var ob = this.dd.all('cargo', new Display);
    obs.push(ob);

    this.options = forkJoin(obs).pipe(
      map(
        options => {
          var o = {};
          o['cargo'] = options[0];
          return o;
        }
      )
    );
  }


  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:null,
      desde: [null, {
      }],
      hasta: [null, {
      }],
      cargo: [null, {
        validators: Validators.required,
      }],
      sede: [null, {
        validators: [Validators.required, this.validators.typeaheadSelection('sede')],
      }],
      persona: [null, {
        validators: [Validators.required, this.validators.typeaheadSelection('persona')],
      }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get desde() { return this.fieldset.get('desde')}
  get hasta() { return this.fieldset.get('hasta')}
  get alta() { return this.fieldset.get('alta')}
  get cargo() { return this.fieldset.get('cargo')}
  get sede() { return this.fieldset.get('sede')}
  get persona() { return this.fieldset.get('persona')}

}
