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
  selector: 'app-curso-admin',
  templateUrl: './curso-admin.component.html',
})
export class CursoAdminComponent extends AdminArrayIdComponent {

  readonly entityName: string = "curso";
  readonly idName: string = 'comision';

}

