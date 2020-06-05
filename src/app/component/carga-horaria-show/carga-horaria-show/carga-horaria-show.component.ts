import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-carga-horaria-show',
  templateUrl: './carga-horaria-show.component.html',
})
export class CargaHorariaShowComponent extends ShowComponent {

  readonly entityName: string = "carga_horaria";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

}

