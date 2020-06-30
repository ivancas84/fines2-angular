import { AdminComponent } from '@component/admin/admin.component';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-persona-admin',
  templateUrl: './detalle-persona-admin.component.html',
})
export class DetallePersonaAdminComponent extends AdminComponent {

  readonly entityName: string = "detalle_persona";

  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected toast: ToastService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
    protected modalService: NgbModal
  ) {
    super(fb, route, router, location, dd, toast, storage, modalService);
  }

  reload(response){
    this.removeStorage();
    this.toast.showSuccess("Registro realizado");
    this.back();
  }

}

