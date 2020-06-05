import { Component, OnInit } from '@angular/core';
import { ShowElementComponent } from '@component/show-element/show-element.component';

@Component({
  selector: 'app-division-grid',
  templateUrl: './division-grid.component.html',
})
export class DivisionGridComponent extends ShowElementComponent {
  readonly entityName = 'division';
    horario_$ = {};

}
