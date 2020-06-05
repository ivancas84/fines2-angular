import { OnInit, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ComisionAdminComponent } from '../comision-admin/comision-admin.component';

@Component({
  selector: 'app-comision-curso-admin',
  templateUrl: '../comision-admin/comision-admin.component.html',
})
export class ComisionCursoAdminComponent extends ComisionAdminComponent {

  readonly entityName: string = "comision";

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

    
  persist(): Observable<any> {
    return this.dd.persist("comision_cursos", this.serverData())
  }



}

