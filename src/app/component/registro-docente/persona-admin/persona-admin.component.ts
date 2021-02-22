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
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-rd-persona-admin',
  templateUrl: './persona-admin.component.html',
})
export class RdPersonaAdminComponent extends AdminComponent {

  readonly entityName: string = "registro_docente";


  initData(): Observable<any> { //@override
    return of(null);
  }

  reload(response){ //@override
    this.router.navigateByUrl('/registro-realizado');
  }

  
}

