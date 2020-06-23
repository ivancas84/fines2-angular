import { Component } from '@angular/core';
import { FieldsetComponent } from '@component/fieldset/fieldset.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-centro-educativo-fieldset',
  templateUrl: './centro-educativo-fieldset.component.html',
})
export class CentroEducativoFieldsetComponent extends FieldsetComponent {

  entityName: string = 'centro_educativo';
  fieldsetName: string = 'centro_educativo';

  constructor(
    protected fb: FormBuilder, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected router: Router, 
    protected storage: SessionStorageService, 
  ) {
    super(router, storage);
  }

  // initData(): void {
  //   this.data$.subscribe(
  //     response => {
  //       if(!isEmptyObject(response)) {
  //         var obs = [];

  //         if(response.domicilio) {
  //           var ob = this.dd.getOrNull("domicilio",response.domicilio);
  //           obs.push(ob);
  //         }

  //         if(obs.length){ forkJoin(obs).subscribe( () => this.fieldset.reset(response) ); } 
  //         else { this.fieldset.reset(response); }
  //       }
  //     }
  //   );
  // }

  formGroup(): FormGroup {
    let fg: FormGroup = this.fb.group({
      id:'',
      nombre: ['', {
        validators: Validators.required,
      }],
      cue: ['', {
      }],
      // domicilio: ['', {
      //   validators: [Validators.required],
      // }],
    });
    return fg;
  }

  get id() { return this.fieldset.get('id')}
  get nombre() { return this.fieldset.get('nombre')}
  get cue() { return this.fieldset.get('cue')}
  //get domicilio() { return this.fieldset.get('domicilio')}

}
