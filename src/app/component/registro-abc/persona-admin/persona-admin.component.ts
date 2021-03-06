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
  selector: 'app-rabc-persona-admin',
  templateUrl: './persona-admin.component.html',
})  
export class RabcPersonaAdminComponent extends AdminComponent {

  readonly entityName: string = "registro_abc";

  initData(): Observable<any> {
    return of(fastClone(this.display$.value))
  }

  reload(response){
    console.log(response);
    this.router.navigateByUrl('/toma-posesion-realizada');
  }
}

