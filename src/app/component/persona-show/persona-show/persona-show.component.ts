import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-persona-show',
  templateUrl: './persona-show.component.html',
})
export class PersonaShowComponent extends ShowComponent {

  readonly entityName: string = "persona";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

}

