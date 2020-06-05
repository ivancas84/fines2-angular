import { AdminComponent } from '@component/admin/admin.component';
import { OnInit, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ToastService } from '@service/ng-bootstrap/toast.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';

@Component({
  selector: 'app-telefono-admin',
  templateUrl: './telefono-admin.component.html',
})
export class TelefonoAdminComponent extends AdminComponent {

  readonly entityName: string = "telefono";

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

  ngOnInit() {
    /**
     * Se desactiva el registro de valores del formulario en el storage
     * Utilizar el storage dificulta el hecho de agregar mas de un telefono a la misma persona
     */
    this.subscribeQueryParams();
    this.initData();   
  }
}

