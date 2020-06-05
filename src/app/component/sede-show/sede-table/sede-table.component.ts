import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';
import { isEmptyObject } from '@function/is-empty-object.function';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sede-table',
  templateUrl: './sede-table.component.html',
})
export class SedeTableComponent extends ShowElementComponent {

  readonly entityName = 'sede';

  constructor(protected dd: DataDefinitionService) {
    super();
  }

}
