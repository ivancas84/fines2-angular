import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldViewOptions } from '@class/field-view-options';
import { FieldsetArrayDynamicComponent } from '@component/fieldset-array/fieldset-array-dynamic.component';
import { FieldsetArrayComponent } from '@component/fieldset-array/fieldset-array.component';
import { LocalValidators } from '@service/local-validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector:   'app-ia-detalle-persona-fieldset-array',
  templateUrl: './ia-detalle-persona-fieldset-array.component.html',
  styles:[`
    .item { padding:0px 10px;  }
    .highlightText { background: yellow; }

  `]
})
export class IaDetallePersonaFieldsetArrayComponent extends FieldsetArrayDynamicComponent {
  

  
  formGroup() {
    let fg: FormGroup = this.fb.groupFvo(this.fieldsViewOptions);
    fg.addControl("_delete",new FormControl(null))
    fg.addControl("_controller",new FormControl(this.controller)) 
    return fg
  }

}
