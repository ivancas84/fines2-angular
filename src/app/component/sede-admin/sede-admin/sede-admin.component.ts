import { Component } from '@angular/core';
import { AdminComponent } from '@component/admin/admin.component';

@Component({
  selector: 'app-sede-admin',
  templateUrl: './sede-admin.component.html',
})
export class SedeAdminComponent extends AdminComponent {

  readonly entityName: string = "sede";
  
}

