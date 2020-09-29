import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminComponent } from '@component/admin/admin.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { AdminArrayComponent } from '@component/admin-array/admin-array.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curso-admin',
  templateUrl: './curso-admin.component.html',
})
export class CursoAdminComponent extends AdminComponent {

  readonly entityName: string = "curso";

  adminForm: FormGroup = this.fb.group({
    id: ['', Validators.required ],
  });
  
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

  persist(): Observable<any> {
    return this.dd.post("persist_array", this.entityName, this.serverData())
  }

  reload(response){
    /**
     * Recargar una vez persistido
     */
    this.setData();
    this.snackBar.open("Registro realizado", "X");
    this.isSubmitted = false;
  }
}

