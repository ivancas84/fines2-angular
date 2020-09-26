import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { AdminComponent } from '@component/admin/admin.component';
import { DialogAlertComponent } from '@component/dialog-alert/dialog-alert.component';
import { isEmptyObject } from '@function/is-empty-object.function';
import { first } from 'rxjs/operators';
import { Display } from '@class/display';

@Component({
  selector: 'app-horario-admin',
  templateUrl: './horario-admin.component.html',
})
export class HorarioAdminComponent extends AdminComponent {

  readonly entityName: string = "horario";

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

  adminForm: FormGroup = this.fb.group({
    id: ['', Validators.required ],
  });


  serverData() {  
    return this.adminForm.value;
    //return this.adminForm.value
  }

  setParams(params: any){
    if(params.hasOwnProperty("id") && params["id"]) {
      this.params = params;
      this.adminForm.get("id").setValue(params["id"]);
    } else {
      this.snackBar.open("Error de parametros", "X"); 
    }
  }


  setData(): void {
    this.data$.next(this.params["id"]);
  }
}

