import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ValidatorsService } from '@service/validators/validators.service';
import { SessionStorageService } from '@service/storage/session-storage.service';
import { AdminArrayIdComponent } from '@component/admin-array-id/admin-array-id.component';

@Component({
  selector: 'app-toma-admin',
  templateUrl: './toma-admin.component.html',
})
export class TomaAdminComponent extends AdminArrayIdComponent {

  readonly entityName: string = "toma";

  constructor(
    protected fb: FormBuilder, 
    protected route: ActivatedRoute, 
    protected router: Router, 
    protected location: Location, 
    protected dd: DataDefinitionService, 
    protected storage: SessionStorageService, 
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,

    protected validators: ValidatorsService,
  ) {
    super(fb, route, router, location, dd, storage, dialog, snackBar, validators);
  }
}

