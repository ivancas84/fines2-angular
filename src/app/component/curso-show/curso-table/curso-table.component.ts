import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { isEmptyObject } from '@function/is-empty-object.function';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-curso-table',
  templateUrl: './curso-table.component.html',
})
export class CursoTableComponent extends ShowElementComponent {

  readonly entityName = 'curso';

  constructor(protected dd: DataDefinitionService) {
    super();
  }

}
