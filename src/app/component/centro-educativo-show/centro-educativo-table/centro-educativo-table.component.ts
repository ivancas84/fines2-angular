import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';

@Component({
  selector: 'app-centro-educativo-table',
  templateUrl: './centro-educativo-table.component.html',
})
export class CentroEducativoTableComponent extends ShowElementComponent {

  readonly entity = 'centro_educativo';

}

