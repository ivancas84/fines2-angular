import { AdminComponent } from '@component/admin/admin.component';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { ReplaySubject } from 'rxjs';
import { Display } from '@class/display';
import { isEmptyObject } from '@function/is-empty-object.function';

@Component({
  selector: 'app-persona-admin',
  templateUrl: './persona-admin.component.html',
})
export class PersonaAdminComponent extends AdminComponent {

  readonly entityName: string = "persona";
  
  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected toast: ToastService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
  ) {
    super(fb, route, router, location, dd, toast, validators, storage);
  }
  
}

