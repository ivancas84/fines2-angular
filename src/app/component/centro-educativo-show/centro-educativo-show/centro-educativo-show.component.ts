import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-centro-educativo-show',
  templateUrl: './centro-educativo-show.component.html',
})
export class CentroEducativoShowComponent extends ShowComponent {

  readonly entityName: string = "centro_educativo";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

}

