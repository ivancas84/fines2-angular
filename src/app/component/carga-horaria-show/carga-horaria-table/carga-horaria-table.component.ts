import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';

@Component({
  selector: 'app-carga-horaria-table',
  templateUrl: './carga-horaria-table.component.html',
})
export class CargaHorariaTableComponent extends ShowElementComponent {

  readonly entity = 'carga_horaria';

}

