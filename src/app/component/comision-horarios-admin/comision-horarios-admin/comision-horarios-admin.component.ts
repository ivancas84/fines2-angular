import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminComponent } from '@component/admin/admin.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { fastClone } from '@function/fast-clone';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-comision-horarios-admin',
  templateUrl: './comision-horarios-admin.component.html',
})
export class ComisionHorariosAdminComponent extends AdminComponent {

  readonly entityName: string = "comision_horarios";

  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected validators: ValidatorsService,
    protected storage: SessionStorageService, 
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super(fb, route, router, location, dd, storage, dialog, snackBar);
  }

  initData(): Observable<any> { //@override
    /**
     * No se consultan datos, se asignan directamente los parametros
     */
    return of(fastClone(this.display$.value));
  }

  reload(response){
    /**
     * Recargar una vez persistido
     */
    this.back();
  }

}

