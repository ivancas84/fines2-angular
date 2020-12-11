import { Component } from '@angular/core';
import { CardComponent } from '@component/card/card.component';

@Component({
  selector: 'app-docente-card',
  templateUrl: './docente-card.component.html',
  styles:[`
    .item { padding:10px; border: 1px solid #E6E6FA; }
  `]
})
export class DocenteCardComponent extends CardComponent {

readonly entityName: string = 'docente';

}
