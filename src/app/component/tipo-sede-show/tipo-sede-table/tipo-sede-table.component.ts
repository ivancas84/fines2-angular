import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';

@Component({
  selector: 'app-tipo-sede-table',
  templateUrl: './tipo-sede-table.component.html',
})
export class TipoSedeTableComponent extends ShowElementComponent {

  readonly entity = 'tipo_sede';

}

