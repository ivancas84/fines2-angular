import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';

@Component({
  selector: 'app-persona-table',
  templateUrl: './persona-table.component.html',
})
export class PersonaTableComponent extends ShowElementComponent {

  readonly entity = 'persona';

}

