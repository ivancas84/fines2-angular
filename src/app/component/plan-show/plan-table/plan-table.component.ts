import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
})
export class PlanTableComponent extends ShowElementComponent {

  readonly entity = 'plan';

}

