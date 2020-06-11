import { Component } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';
import { DataDefinitionService } from '@service/data-definition/data-definition.service';

@Component({
  selector: 'app-asignatura-table',
  templateUrl: './asignatura-table.component.html',
})
export class AsignaturaTableComponent extends ShowElementComponent { }

