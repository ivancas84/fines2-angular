import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { ShowComponent } from '@component/show/show.component';

@Component({
  selector: 'app-tipo-sede-show',
  templateUrl: './tipo-sede-show.component.html',
})
export class TipoSedeShowComponent extends ShowComponent {

  readonly entityName: string = "tipo_sede";

  constructor(
    protected dd: DataDefinitionService, 
    protected route: ActivatedRoute, 
    protected router: Router
  ) {
    super(dd, route, router);
  }

}

