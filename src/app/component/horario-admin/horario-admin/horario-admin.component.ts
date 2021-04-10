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
import { Observable } from 'rxjs';
import { AdminArrayIdComponent } from '@component/admin-array/admin-array-id.component';

@Component({
  selector: 'app-horario-admin',
  templateUrl: './horario-admin.component.html',
})
export class HorarioAdminComponent extends AdminArrayIdComponent {

  readonly entityName: string = "horario";
  readonly idName: string = 'cur-comision';

}

