import { Component } from '@angular/core';
import { AdminArrayIdComponent } from '@component/admin-array/admin-array-id.component';

@Component({
  selector: 'app-toma-admin',
  templateUrl: './toma-admin.component.html',
})
export class TomaAdminComponent extends AdminArrayIdComponent {

  readonly entityName: string = "toma";
  readonly idName: string = 'curso';

}

